---
title: Lagebuch im Vergleich
description: Lagebuch neben Papier, Fireboard, MissionBuddies und fireplan.elw — offline-Fähigkeit, Datenhoheit, Kosten und Funktionsumfang, mit Quellen.
---

Alle Angaben laut Herstellerseiten, Stand September 2026. Fehler oder
Änderungen? Bitte [ein Issue
öffnen](https://github.com/CodeForFire/lagebuch/issues/new/choose).

| | Lagebuch | Papier | [Fireboard](https://fireboard.net/) | [MissionBuddies](https://www.missionbuddies.de/) | [fireplan.elw](https://www.fireplan.de/elw) |
|---|---|---|---|---|---|
| Ohne Internet voll nutzbar | ja | ja | Desktop-Suite ja; Stammdaten und Ticker über das Cloud-Portal ([Quelle](https://fireboard.net/)) | ja, Abgleich sobald wieder online ([Quelle](https://www.missionbuddies.de/atemschutzueberwachung/)) | ja, als Browser-App ([Quelle](https://www.fireplan.de/elw)) |
| Daten bleiben im ELW, kein Cloud-Konto | ja, eine Datei pro Einsatz | ja | nein, „cloudbasierte Lösung“ mit Portal-Benutzerkonto ([Quelle](https://fireboard.net/)) | nein, Cloud mit Servern in Deutschland ([Quelle](https://www.missionbuddies.de/faq/)) | k. A. |
| Mehrere Geräte im Einsatz | ja, LAN/Tailscale, TLS-gepinnt, ohne Server | nein | ja, über Portal ([Quelle](https://fireboard.net/produkte/module/grundsystem/)) | ja; gratis auf 2 Geräten, Premium unbegrenzt ([Quelle](https://www.missionbuddies.de/atemschutzueberwachung/)) | ja, live nur mit Internet ([Quelle](https://www.fireplan.de/elw)) |
| Atemschutzüberwachung | ja, mit Sprachansage und Rückzugsalarm | Überwachungstafel | ja, laut Produktseite ([Quelle](https://fireboard.net/)) | ja, Gratis-Stufe ([Quelle](https://www.missionbuddies.de/atemschutzueberwachung/)) | k. A. |
| CO-Messprotokoll | ja | Zettel | k. A. | k. A. | k. A. |
| PDF-Einsatzbericht | ja, Abschnitte wählbar | nein | ja ([Quelle](https://fireboard.net/produkte/module/grundsystem/)) | ja, modulweise Export ([Quelle](https://www.missionbuddies.de/faq/)) | k. A. |
| Kosten | 0 €, MIT-Lizenz | Papier | Grundsystem kostenfrei; Module wie Einsatzführung einmalig 600 € zzgl. 90 €/Jahr Wartung ([Preisliste 02/2026](https://fireboard.net/wp-content/uploads/2026/02/Fireboard-Preisliste-gesamt-Feb2026.pdf)) | Gratis-Stufe, sonst Abo ([Quelle](https://www.missionbuddies.de/faq/)) | auf Anfrage |
| Quellcode einsehbar | ja | – | nein | nein | nein |
| Plattformen | Windows, Linux, macOS; Android als Begleit-App | – | Windows, Linux, macOS; Mobile App iOS/Android | Android, Windows, iOS | jeder Browser (PWA) |

## Was das praktisch heißt

Die Zeile, die im Einsatz zählt, ist die erste: was passiert, wenn das Netz
weg ist? Lagebuch kennt diesen Fall nicht als Sonderfall – es gibt keine
Verbindung, die ausfallen könnte, weil die Einsatzdatei lokal liegt und die
Mehrgeräte-Verbindung im eigenen LAN läuft.

Die zweite Zeile zählt für die Kreisbrandinspektion: Namen, Handynummern und
Adressen bleiben auf euren Geräten. Was das im Detail bedeutet – und was ihr
als Wehr selbst regeln müsst – steht unter [Datenschutz und
Sicherheit](/datenschutz/).

Der Rest ist Ausstattung. Lagebuch ist jünger als die kommerziellen Produkte
und deckt nicht alles ab, was ein Grundsystem mit Modulbaukasten kann. Was als
Nächstes kommt, steht in der
[Roadmap](https://github.com/CodeForFire/lagebuch/blob/main/ROADMAP.md).
