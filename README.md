# raidinfo from Dawi DC-7210 RAID SATA2

Diese Scripte dienen dem Anzapfen des "SteelVine Manager for Windows".
Das Dawi DC-7210 ist ein Hardware Raid-System für SATA, ich habe das System mit drei Platten als RAID 1 (Mirroring – Spiegelung) im Wechselplattengehäuse laufen. 
Dabei sind immer zwei Platten im System. Die drei Platten werden durch getauscht. Dadurch ist auf der entfernten Platte immer das Backup zum Zeitpunkt des Entfernens drauf.
Jede Platte kann man auch alleine an einem anderen Rechner anschließen und auslesen. 
Mein Sytem läuft seit 2009.

Das nach dem Austauschen die "neue" Platte einen rebuild- und verrify-Prozess durchläuft und es eine Weile dauert habe ich diese Scripte geschrieben.

# getDawi.php
Dies Script hold aus dem Stream einen Block und gibt ihn weiter. Das Format ist xml/html.
Bei neueren Treibern lautet der Port 51116 statt 51115. Das kann man im Monitor der Software rausfinden. Die 

# dc.js
Auswertungsscript, nimmt Daten von getDawi.php entgegen.

# beispiel_rebuild.xml
So sehen die Daten aus, wenn eine ausgewechselte Platte die Daten der anderen übernimmt.

# beispiel_vergleichen.xml
So sehen die Daten aus, wenn eine ausgewechselte Platte nach dem rebuild die Daten der anderen abgleicht.

