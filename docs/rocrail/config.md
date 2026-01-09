# Konfiguration

Beim Start muss man Rocview auf dem PC mit Rocrail auf dem Raspi verbinden (192.168.10.11)

## Zentrale einbinden
Zentrale hinzufügen: Datei -> RocRail Eigenschaften -> Tab Zentrale:

  * Unten links z21 auswählen und hinzufügen
  * 192.168.10.10
  * Lokomotiven auswählen

Die Virtuelle Zentrale kann gelöscht werden.

## Weichen Servo

## Anschluss Hallsensor
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