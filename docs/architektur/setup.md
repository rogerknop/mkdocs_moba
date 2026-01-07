# Hauptrouter
Der Moba Router wird über WAN an das Heimnetzwerk gehängt.  
Er bekommt über die Konfiguration (siehe unten) eine feste IP zugewiesen (192.168.1.10).  
Weiterhin wird eine statische Route definiert, so dass alle Moba Geräte im Subnetz .10 hängen und man trotzdem vom Hauptrouter drauf zugreifen kann:

* Netzwerk: 192.168.10.0
* Subnetzmaske: 255.255.255.0
* Gateway: 192.168.1.10

# GL.iNet GL-SFT1200 OpenWRT Router
Setup als Subnetz für die Moba Installationen.
Router einrichten für Subnetz 192.168.10.* mit statischer IP 192.168.1.10 und DHCP nur für Subnetz mit Range 150-254.

# Roco Z21 (schwarz)
Feste IP 192.168.10.10 / 255.255.255.0 / 192.168.10.1  
Maintenance Tool  
5 Sek. Stop Taste um Netzwerk an Z21 zurückzusetzen  
Laptop WLAN deaktivieren und feste IP vergeben über Netzwerkeinstellungen 192.168.0.100  
Im Tool mit 192.168.0.111 verbinden und neue IP vergeben  
Evtl. in Firewall Windows Defender prüfen, ob Z21 freigegeben werden muss

# Rocrail
Rocrail Server und Client sind die gleiche Installation. Auf dem Raspi mit der statischen IP 192.168.110.11 wird die Installation entpackt. Siehe hierzu [Rocrail Installation](rocrail/install.md)

# PC
Installation Rocview siehe [Rocview Installation](rocrail/rocview.md)

# Verkabelungsmaterial

* Netzteil für Raspi und Picos: 
* Wago Hebelklemme 221-420
* Geloo KFZ Sicherungshalter, 6 Fach Sicherungskasten 12 V - geht auch mit 5V
* Absicherung Raspi: 3A
* Absicherung Pico 0,5A


# Raspi als Router - ALT und zu viel Aufwand

ACHTUNG! Unten kommt die Korrektur mit br0 als Bridge für eth0 und wlan0 mit gleicher IP

nmcli connection show
alle ausser lo löschen

sudo nmcli connection delete <name>

sudo nmcli connection add type ethernet ifname eth1 con-name wan-eth1 \
  ipv4.method manual \
  ipv4.addresses 192.168.1.10/24 \
  ipv4.gateway 192.168.1.1 \
  ipv4.dns 192.168.1.1 \
  autoconnect yes

sudo nmcli connection up wan-eth1


sudo nmcli connection add type ethernet ifname eth0 con-name lan-eth0 \
  ipv4.method manual \
  ipv4.addresses 192.168.10.1/24 \
  autoconnect yes

sudo nmcli connection up lan-eth0


sudo nmcli device set wlan0 managed no




sudo nano /etc/default/isc-dhcp-server

INTERFACESv4="eth0"



sudo nano /etc/dhcp/dhcpd.conf

authoritative;

subnet 192.168.10.0 netmask 255.255.255.0 {
  range 192.168.10.150 192.168.10.254;
  option routers 192.168.10.1;
  option domain-name-servers 192.168.1.1;
}



sudo systemctl restart isc-dhcp-server
sudo systemctl status isc-dhcp-server --no-pager

sudo journalctl -u isc-dhcp-server -n 20 --no-pager



IP‑Forwarding aktivieren
sudo sysctl -w net.ipv4.ip_forward=1
echo "net.ipv4.ip_forward=1" | sudo tee /etc/sysctl.d/99-ipforward.conf



sudo systemctl unmask hostapd
sudo systemctl enable hostapd
sudo systemctl start hostapd


sudo nano /etc/hostapd/hostapd.conf

interface=wlan0
driver=nl80211
ssid=Moba-WLAN
hw_mode=g
channel=6
ieee80211n=1
wmm_enabled=1
auth_algs=1
wpa=2
wpa_passphrase=<wlan pw - siehe password safe>
wpa_key_mgmt=WPA-PSK
rsn_pairwise=CCMP


sudo nano /etc/default/hostapd

DAEMON_CONF="/etc/hostapd/hostapd.conf"


sudo nano /etc/NetworkManager/NetworkManager.conf

[keyfile]
unmanaged-devices=interface-name:wlan0

sudo systemctl restart NetworkManager

sudo systemctl stop hostapd

sudo rfkill unblock wifi
sudo ip link set wlan0 down
sudo ip link set wlan0 up

ip link show wlan0
=> MUSS UP sein

NAT‑Masquerading (damit 10er Netz über eth1 ins Internet kommt)
sudo iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE


Forwarding zwischen allen Netzen

sudo iptables -A FORWARD -i eth0 -o eth1 -j ACCEPT
sudo iptables -A FORWARD -i wlan0 -o eth1 -j ACCEPT
sudo iptables -A FORWARD -i eth1 -o eth0 -m state --state RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A FORWARD -i eth1 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT

sudo sh -c "iptables-save > /etc/iptables/rules.v4"



sudo ip addr add 192.168.10.1/24 dev wlan0
sudo ip link set wlan0 up



sudo apt install bridge-utils

sudo nano /etc/NetworkManager/system-connections/br0.nmconnection

[connection]
id=br0
type=bridge
interface-name=br0
autoconnect=true

[ipv4]
method=manual
address1=192.168.10.1/24
dns=192.168.1.1;

[bridge]
stp=false



sudo nmcli connection add type bridge-slave ifname eth0 master br0

sudo nmcli device set wlan0 managed no


Ergänzen
sudo nano /etc/hostapd/hostapd.conf
bridge=br0



sudo nano /etc/default/isc-dhcp-server
INTERFACESv4="br0"



sudo rfkill unblock wifi
sudo rfkill unblock all


sudo systemctl restart NetworkManager


sudo systemctl stop hostapd


sudo systemctl restart hostapd
sudo systemctl restart isc-dhcp-server

sudo ip link set wlan0 down
sudo ip link set wlan0 up

sudo nmcli connection add type bridge-slave ifname eth0 master br0
sudo nmcli connection up br0

ip route - output in chatgpt
sudo ip addr flush dev wlan0

ip -4 a show wlan0
=> kein output

ip route - output:
default via 192.168.1.1 dev eth1 proto static metric 100
192.168.1.0/24 dev eth1 proto kernel scope link src 192.168.1.10 metric 100
192.168.10.0/24 dev br0 proto kernel scope link src 192.168.10.1 metric 425


sudo iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE

sudo iptables -A FORWARD -i br0 -o eth1 -j ACCEPT
sudo iptables -A FORWARD -i eth1 -o br0 -m state --state RELATED,ESTABLISHED -j ACCEPT

sudo sh -c "iptables-save > /etc/iptables/rules.v4"


nach boot immer wieder blocked

sudo nano /etc/systemd/system/rfkill-unblock.service

[Unit]
Description=Unblock WiFi at boot
After=multi-user.target network-pre.target systemd-modules-load.service

[Service]
Type=oneshot
ExecStart=/usr/sbin/rfkill unblock wifi

[Install]
WantedBy=multi-user.target


sudo systemctl enable rfkill-unblock.service

sudo systemctl daemon-reload
Evtl. Fehler egal: sudo systemctl restart rfkill-unblock.service
