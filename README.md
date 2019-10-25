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