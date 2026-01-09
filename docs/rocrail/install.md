# Installation

### Raspberry Pi
* Standard Raspberry Pi Image aufspielen
* Feste IP vergeben 192.168.10.11 (sudo nmtui & sudo reboot)
* Rocrail installieren per UNZIP aktuelles Package
    * Download Package ermitteln mit 64Bit (Rocrail-PiOS11-ARM64.zip) unter: https://wiki.rocrail.net/rocrail-snapshot/
    * wget https://wiki.rocrail.net/rocrail-snapshot/Rocrail-PiOS11-ARM64.zip
    * unzip -u Rocrail-PiOS11-ARM64.zip -d ~/Rocrail
    * rm Rocrail-PiOS11-ARM64.zip
* sudo systemctl enable --now cron
* crontab -e: @reboot /home/pi/Rocrail/startrocrail.sh
* Samba installieren:
    * sudo apt-get install samba cifs-utils
    * sudo nano /etc/samba/smb.conf (siehe Smarthome Doku)
  <pre>
        [moba]
        path = /home/pi/Rocrail
        public = yes  
        browseable = yes
        writeable = yes
        read only = no
  </pre>
    * sudo smbpasswd -a pi

* Backup über Docker Sources: Komplettes Verzeichnis ~/Rocrail auf NAS kopieren (enhält auch Workspace /default mit Plan usw.).

### Update Server
* Download Package ermitteln mit 64Bit (Rocrail-PiOS11-ARM64.zip) unter: https://wiki.rocrail.net/rocrail-snapshot/
* mkdir ~/Downloads/Rocrail
* cd ~/Downloads/Rocrail
* wget https://wiki.rocrail.net/rocrail-snapshot/Rocrail-PiOS11-ARM64.zip
* unzip -u Rocrail-PiOS11-ARM64.zip
* cp -v ./bin/*  ~/Rocrail/bin
* rm -rv ~/Downloads/Rocrail

### Windows
* Download Package 64Bit (Rocrail-Windows-WIN64.zip) unter: https://wiki.rocrail.net/rocrail-snapshot/
* Rocrail installieren per UNZIP aktuelles Package nach C:\Rocrail (kein Backup notwendig)
* Desktop Link erstellen C:\Rocrail\desktoplink.cmd


