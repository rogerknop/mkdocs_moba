# ToDo

## Next Steps
* Router einrichten für Subnetz 192.168.10.* mit statischer IP 192.168.1.10 und DHCP nur für Subnetz
* Z21 verbinden mit neuem Router mit neuer statischer IP 192.168.10.10
* Moba Raspi
* Backup alte Konfig
    * Update neues Betriebssystem
    * Neue rocrail Server Software
    * Backup einspielen
* Laptop - Rocrail View installieren und mit Server verbinden
* Tests mit Pico2W Einbindung in Rocrail mit Servo und Hall Sensor

## NEW Version Ideen
* Test siehe WIO weiter unten
* Z21 Zentrale verwenden
* Verkauf N Größen
* Kauf H0 Größen
* OFFEN: Evtl. doch ohne Bettung
* Steuerung (Weichen, Rückmelder, Licht) ausschließlich über ESPs - Kommunikation ohne Z21 direkt mit Rocrai über WIO (ohne GCA)
  * Servos https://wiki.rocrail.net/doku.php?id=wio:firststeps-de#servos_einrichten
* Weiche mit Server und nur ein senkrechter Draht und 3D Halter: https://www.youtube.com/watch?v=5oHPHPeYi9c
* Platine für 16 Servos am ESP32: PCA9685
* Car System: DC-Car

![](../drawio/architektur.drawio)

## OFFEN
* wann WIO I/O16 und wann Servo usw.

## WIO
Über den Pico2W oder ESP32 D1 Mini Servos steuern und Rückmelder einlesen!

* <a href="https://wiki.rocrail.net/doku.php?id=arduino:wio-overview-en" target="_blank">WIO Overview</a>
* <a href="https://wiki.rocrail.net/doku.php?id=wio:wio03-io16-en" target="_blank">IO-03 16 I/O für Servos und Hallsensoren</a>

## Installation auf ESP oder besser PicoW

<a href="https://www.google.com/search?q=rocrail+%22picow%22+wio&sca_esv=8dd378c14dfe8752&as_qdr=all&udm=7&sxsrf=AE3TifM8uUIopWT8sWkYPyCfLIhYuy8hyQ%3A1767198616020&ei=mE9VafZ8u7WL6A-t7YSYDg&ved=0ahUKEwj2qIXun-iRAxW72gIHHa02AeMQ4dUDCBM&uact=5&oq=rocrail+%22picow%22+wio&gs_lp=EhZnd3Mtd2l6LW1vZGVsZXNzLXZpZGVvIhNyb2NyYWlsICJwaWNvdyIgd2lvMgcQIxiwAhgnMgUQABjvBTIIEAAYgAQYogQyBRAAGO8FMggQABiABBiiBEiMM1DOEli_JnABeACQAQCYATegAbYBqgEBNLgBA8gBAPgBAZgCBKACiAHCAgQQIxgnmAMAiAYBkgcBNKAHmA6yBwEzuAeEAcIHAzAuNMgHBoAIAQ&sclient=gws-wiz-modeless-video&tbas=0&biw=1707&bih=898&dpr=1.5#fpstate=ive&vld=cid:420520f4,vid:rMU9TOtV-wI,st:0" target="_blank">Tutorial WIO</a>

* https://wiki.rocrail.net/doku.php?id=wio:firststeps-de#servos_einrichten
* https://wiki.rocrail.net/doku.php?id=arduino:wio-setup-de#ota_von_grund_auf_neu 
* OTA Sketch in PlatformIO kopieren und installieren
* Pin Belegung PicoW i/o16 https://wiki.rocrail.net/doku.php?id=wio:wiopico-io16-de#i_o

## Car System

Nach einigen Analysen würde ich mit DC Car starten  

Interessante Links:

* <a href="http://www.modellbau-wiki.de/wiki/Portal:Carsystem" target="_blank">http://www.modellbau-wiki.de/wiki/Portal:Carsystem</a>
* <a href="https://www.stummiforum.de/viewtopic.php?t=158709#p1862888" target="_blank">https://www.stummiforum.de/viewtopic.php?t=158709</a> (suche nach "Kosten")
* <a href="http://www.modelleisenbahn-claus.de/" target="_blank">http://www.modelleisenbahn-claus.de/</a>
* <a href="http://wiki.dc-car.de/index.php?title=Hauptseite" target="_blank">http://wiki.dc-car.de/index.php?title=Hauptseite</a>

## Planungssoftware
Nach ausgiebigen Recherchen ohne jegliche Tests, habe ich mich für die Planungssoftware <a href="https://www.3d-modellbahn.de/" target="_blank">3d-Modellbahn Studio</a> entschieden.  
Mit der Freeware Version starten und bei Bedarf die Professional Version (50€) kaufen.

