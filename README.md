# Prerequisites 
NodeJs und npm und Powerpoint oder Libreoffice müssen installiert sein.

# MkDocs: Setup
Die Dokumentation wurde mit MkDocs erstellt: https://www.mkdocs.org/

Dieses Framework erstellt Internetseite auf Basis von Konfiguration und Markdown Files.

Daher der Anleitung für die Installation inkl. Python folgen: https://www.mkdocs.org/#installation

```
git clone https://github.com/rogerknop/mkdocs_moba.git
npm install
```

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
## PPTX convert

Es werden all Slides aus den in oriDocs gefundenen PPTX mit einem PowerShell Script exportiert.

## LibreOffice convert

LibreOffice installieren und Pfad im Script convert.js prüfen.

Mit LibreOffice kann immer nur ein Slide kopiert werden und in deploy.js muss entsprechend der Funktionsaufruf angepasst werden.