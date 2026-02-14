# Konfiguration

Beim Start muss man Rocview auf dem PC mit Rocrail auf dem Raspi verbinden (192.168.10.11)

!!! question "Fragen Sammlung fürs Forum"
    * Netzteil für viele Pico
    * 4 Servos und 12 Hall-Sensoren an einem Pico?

## Zentrale einbinden
Zentrale hinzufügen: Datei -> RocRail Eigenschaften -> Tab Zentrale:

  * Unten links z21 auswählen und hinzufügen
  * 192.168.10.10
  * Lokomotiven auswählen

Die Virtuelle Zentrale kann gelöscht werden.

## Lok Programmieren und einbinden

* Programmieren über Programmiergleis
* Programmieren nur über Z21, da für Rocrail Registrierung nötig
* Nur hier Programmiergleis nötig! Z21 App: CV Einlesen und ggf. Adresse neu setzen 
* In Rocview Tabellen -> Lok: Hinzufügen mit CV1 Adresse
* Funktionen Reiter: Funktionen manuell hinzufügen

## Weichen Servo

* SG90 Servos
    * Halter: https://www.harald-sattler.de/html/servohalter.htm
    * Halter: https://cults3d.com/de/modell-3d/verschiedene/servo-weichenantrieb-inkl-herzstueckpolarisierung?srsltid=AfmBOoqnKFD1U5zEwpkTDsWHbI6j3rsTN3fUZccwYz8m66a5Coe18_sr
    * Halter: https://www.thingiverse.com/thing:4596482
* 4 Servos an einem Pico (GP6=Addr1, 7=Addr2, 8=Addr3, 9=Addr4)
* rok-todo Verkabelung richtig? 270 Ohm (220 geht auch) Schutzwiderstand an GP
* WIO Port 1-4 = Input & Set Button
* Weichen Eigenschaften Schnittstelle:
    * Knoten ID = WIO ID
    * Adresse 1 = 1 => GP6
    * Flag Zubehör aus
    * Servo auswählen
    * Servo einstellen über Parameter 1 und Wert 1 über die 3 Punkte hintendran.
        * Änderungen werden direkt ausgeführt
        * Links muss kleiner als rechts sein
        * Zum Start etwa gleich einstellen und dann rumspielen
  
### Roco Weichen Polarisierung

Die Artikelnummern der neuen Weichen:
42534/42535
42560
42561

Bei RocoLine Weichen mit Bettung gibt es ja mittlerweile auch verschiedene Versionen:

15° Weichen 42532/42533 mit polarisiertem Herzstück, alte Version
15° Weichen 42534/42535 mit polarisiertem überarbeitetem Herzsstück, neue Version, kommt gerade nach und nach auf dem Markt
15° Weichen 42538/42539 ohne Polarisierung, aus den alten Gleis- und Startsets, die Sets werden gerade auch von Roco neu aufgelegt mit den neuen Weichen 42532/42533. Die meisten Gleissets bei den Händlern sind aber noch mit den alten vereinfachten Weichen. Hier sollte man auf die unterschiedlichen Artikelnummern achten (z.B. Gleisset B alt 42010, neu 42020; Gleisset D alt 42012, neu 42022), Gleisset B und E wurden von Roco noch nicht mit den neuen Weichen aufgelegt.

Lange Rede kurzer Sinn: So wie ich es gelesen habe, entspricht der Oberbau der vereinfachten Weichen mit Bettung 42538/42539 ohne Polarisierung den Weichen ohne Bettung, außer dass die Stellschwelle kürzer ist. Die Stellschwellen gibt es aber von Roco als Ersatzteil. Diese Weichen gibt es oft sehr günstig gebraucht oder eben in Gleissets. Da lohnt sich also ggf. ein Umbau der Weichen mit Bettung und der Installation eines Servoantriebs, allerdings muss man dann eben zusätzlich das Problem mit der Polarisierung lösen.


https://www.besserepreise.com/index.php?page=productDetails&productNo=42534-roc&portal=geizhals&open_woher=geizhals.net&emid=696e815f3fe981a07c040f47

## Anschluss Hallsensor

* 10k Pulldown zwischen 3,3V und GP Pin - bzg. zwischen die beiden äusseren Pins des Hall Sensors
* Pin und Adresse im Mapping nachschauen. Oder Monitor starten und leeren und dann 3,3V mit GP Pin verbinden
* Zum Beispiel GP18 = Adresse 9

Die Verbindungen zwischen Hallsensor und Pico dürfen bis zu ?m lang sein.  
Aber bitte beachten, dass diese Verbindungen nicht parallel mit Schienen und deren Versorgungs-Leitungen installiert werden.
Geht es nicht anders, sollte wenigstens einen Abstand von 10 cm beachtet werden.
Wenn diese Verbindung etwas 'verdrillt' wird, werden jegliche Störungen vermieden.
Senkrechtes kreuzen ist kein Problem.  

## Handhabung in Rocrail

Rocrail vergleicht die gezählten Wagen des Von- mit dem Nach-Block:  

* Wenn ein oder beide Blocks "null" melden, erfolgt kein Vergleich.  
* Normale Verarbeitung erfolgt im Fall, dass der Nach-Block einen gleichen oder höheren Zählwert als der Von-Block meldet.  
* Im Fall, dass der Nach-Block einen kleineren Zählwert als der Von-Block meldet, wird die Lok vom Automodus abgemeldet und der Von-Block wird geschlossen "closed".  
* Nach dem die verlorenen Wagen wieder an den Zug angehängt wurden, kann der Von-Block wieder aktiviert und die Lok im Automodus re-aktiviert werden.  