# NEW Version Ideen

* Test siehe WIO weiter unten
* Z21 Zentrale verwenden
* Verkauf N Größen
* Kauf H0 Größen
* OFFEN: Evtl. doch ohne Bettung
* Steuerung (Weichen, Rückmelder, Licht) ausschließlich über ESPs - Kommunikation ohne Z21 direkt mit Rocrai über WIO (ohne GCA)
  * Servos https://wiki.rocrail.net/doku.php?id=wio:firststeps-de#servos_einrichten
* Weiche mit Server und nur ein senkrechter Draht und 3D Halter: https://www.youtube.com/watch?v=5oHPHPeYi9c
* Platine für 16 Servos am ESP32: PCA9685

# Voraussetzungen 
NodeJs und npm und Powerpoint oder Libreoffice müssen installiert sein.

# Setup / Installation
Die Dokumentation wurde mit MkDocs erstellt: https://www.mkdocs.org/  
Dieses Framework erstellt Internetseite auf Basis von Konfiguration und Markdown Files.

Python & pip Installieren: https://www.python.org/downloads/  
Prüfen, ob Phython im Path steht: python --version & pip --version

Hier die Schritte für die Installation. Der letzte git Befehl bewirkt, dass die lokalen Einstellungen nicht gepusht werden:
```
pip install --upgrade pip
pip install mkdocs
pip install mkdocs-material
git clone https://github.com/rogerknop/mkdocs_moba.git
npm install
git update-index assume-unchanged config/local.json
```

# WIO 

Hiermit schalte ich die Weichen Servos und Beleuchtung. Ausserdem sollen die Hall Sensoren per Rückmeldung empfangen werden

## Installation auf ESP oder besser PicoW

https://www.google.com/search?q=rocrail+%22picow%22+wio&sca_esv=8dd378c14dfe8752&as_qdr=all&udm=7&sxsrf=AE3TifM8uUIopWT8sWkYPyCfLIhYuy8hyQ%3A1767198616020&ei=mE9VafZ8u7WL6A-t7YSYDg&ved=0ahUKEwj2qIXun-iRAxW72gIHHa02AeMQ4dUDCBM&uact=5&oq=rocrail+%22picow%22+wio&gs_lp=EhZnd3Mtd2l6LW1vZGVsZXNzLXZpZGVvIhNyb2NyYWlsICJwaWNvdyIgd2lvMgcQIxiwAhgnMgUQABjvBTIIEAAYgAQYogQyBRAAGO8FMggQABiABBiiBEiMM1DOEli_JnABeACQAQCYATegAbYBqgEBNLgBA8gBAPgBAZgCBKACiAHCAgQQIxgnmAMAiAYBkgcBNKAHmA6yBwEzuAeEAcIHAzAuNMgHBoAIAQ&sclient=gws-wiz-modeless-video&tbas=0&biw=1707&bih=898&dpr=1.5#fpstate=ive&vld=cid:420520f4,vid:rMU9TOtV-wI,st:0

* https://wiki.rocrail.net/doku.php?id=wio:firststeps-de#servos_einrichten
* https://wiki.rocrail.net/doku.php?id=arduino:wio-setup-de#ota_von_grund_auf_neu 
* OTA Sketch in PlatformIO kopieren und installieren
* Pin Belegung PicoW i/o16 https://wiki.rocrail.net/doku.php?id=wio:wiopico-io16-de#i_o

# Konfiguration
Die Default Einstellungen sind in config/default.json definiert.  
Bei Bedarf können einzelne Attribute in der Datei config/local.json überschrieben werden.

# Python Probleme
* Falls Berechtigungsfehler: pip Befehle um --user erweitern
* Gegebenenfalls Verzeichnis site-packages in %appdata%\Python\Python37\ löschen

# Verfügbare npm scripts
```
npm start oder npm run serve => Localhost wird gestartet
npm run build => site Folder generieren
npm run deploy => Build und Deploy
npm run convert => Powerpoint Slides in JPG exportieren
npm run convertdeploy => Volles Programm: Convert, Build und Deploy
```

# SSH per Private und Public Key
Es müssen zuerst auf dem Rechner im Homeverzeichnis die Dateien ~/.ssh/id_rsa und ~/.ssh/id_rsa.pub angelegt werden (sshgen)  
Dann muss auf dem Server das .ssh Verzeichnis mit der Datei authorized_key angelegt werden:

```
(umask 077 && test -d ~/.ssh || mkdir ~/.ssh)
(umask 077 && touch ~/.ssh/authorized_keys)
```
In die Datei authorized_keys muss der Inhalt der Datei .ssh/id_rsa.pub kopiert werden.

# Slides in Bilder konvertieren
Es sollte pro PPTX nur ein Slide existieren, damit beide Konvertierungsvarianten verwendet werden können.

## PPTX convert
Es werden all Slides aus den in oriDocs gefundenen PPTX mit einem PowerShell Script exportiert.

## LibreOffice convert
LibreOffice installieren und Pfad im Script convert.js prüfen.  
Mit LibreOffice kann immer nur ein Slide kopiert werden und in deploy.js muss entsprechend der Funktionsaufruf angepasst werden.