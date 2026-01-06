# Installation

### Raspberry Pi
* Standard Raspberry Pi Image aufspielen
* Feste IP vergeben
* Rocrail installieren per UNZIP aktuelles Package
* sudo systemctl enable --now cron
* crontab -e: @reboot /home/pi/Rocrail/startrocrail.sh
* nas mounten
* Backup: Komplettes Verzeichnis ~/Rocrail auf NAS kopieren (enhält auch Workspace /default mit Plan usw.). Evtl. jede Stunde?

### Windows
* Rocrail installieren per UNZIP aktuelles Package nach C:\Rocrail (kein Backup notwendig)


