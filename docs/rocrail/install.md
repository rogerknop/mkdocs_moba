# Installation

## Raspberry Pi
* Standard Raspberry Pi Image aufspielen
* Feste IP vergeben
* Rocrail installieren

### Alle Interface Adapter deaktivieren, damit UDP geht
```
sudo nano /boot/config.txt
dtoverlay=pi3-disable-bt
sudo nano /etc/modprobe.d/raspi-blacklist.conf
# WLAN abschalten
blacklist brcmfmac
blacklist brcmutil
#blacklist cfg80211
#blacklist rfkill
# Bluetooth abschalten
blacklist btbcm
blacklist hci_uart
Speichern, schließen und neustarten.
```


