---
title: 'Datenschutzerklärung'
description: 'Welche Daten FwAssist verarbeitet: keine personenbezogenen. Kein Konto, kein Netzzugriff, keine Berechtigungen — die Seite für den Play Store und für Datenschutzbeauftragte.'
---
Diese Seite beschreibt, welche Daten die Android-App FwAssist verarbeitet. Sie
gilt für die App aus dem Google Play Store und für die APK von GitHub
gleichermaßen; beide sind derselbe Build.

Stand: Version 0.1.0, November 2026. Die Darstellung ist technisch und
ausdrücklich **keine Rechtsberatung**.

## Kurzfassung

- **Keine personenbezogenen Daten.** FwAssist fragt weder Namen noch
  Telefonnummern, Standort oder Kontakte ab und speichert nichts davon.
- **Kein Konto, keine Anmeldung, kein Server.** CodeForFire betreibt keinen
  Dienst, an den etwas fließen könnte, und erhält keinerlei Daten.
- **Kein Netzzugriff.** Die App fordert keine einzige Android-Berechtigung an,
  auch nicht die für das Internet.
- **Keine Telemetrie, keine Absturzberichte, keine Werbung**, keine Analyse- oder
  Werbebibliotheken.

## Was die App speichert

Damit ein Helfer beim nächsten Öffnen so aussieht wie zuletzt, merkt sich die
App ein paar Einstellungen im privaten Speicher der App auf dem Handy:

| Helfer | Gespeichert |
|---|---|
| Buchstabieralphabet | welche Tafel gewählt ist (alt, DIN 5009:2022, NATO) |
| Schaummittel | die eingegebenen Zahlen und ob der Raum-Rechner offen ist |
| RTH-Landeplatz | ob Tag oder Nacht gewählt ist |
| Dekon-Platz | welche Dekon-Stufe gewählt ist |
| Einstellungen | welche Helfer ein eigenes Symbol haben |

Nichts davon bezieht sich auf eine Person. Das Wort, das im
Buchstabieralphabet eingegeben wird, und die Zeit der Stoppuhr werden nicht
gespeichert.

Andere Apps können diesen Speicher nicht lesen. Beim Deinstallieren löscht
Android ihn vollständig; dasselbe bewirkt *Einstellungen → Apps → FwAssist →
Speicher → Daten löschen*.

## Android-Sicherung

Hat jemand auf dem Handy die Android-Sicherung in sein Google-Konto
eingeschaltet, kann Android die oben genannten Einstellungen dorthin mitsichern
und auf einem neuen Handy wiederherstellen. Das ist eine Funktion des
Betriebssystems unter der Kontrolle der Person, der das Konto gehört.
CodeForFire hat darauf keinen Zugriff.

## Google Play

Wer FwAssist aus dem Play Store installiert, nutzt dafür Google Play. Was Google
dabei verarbeitet, etwa Installations- und Absturzstatistiken des Play Stores,
regelt die
[Datenschutzerklärung von Google](https://policies.google.com/privacy). Die App
selbst schickt Google nichts.

## Verantwortlich

FwAssist ist ein ehrenamtliches Open-Source-Projekt von CodeForFire. Der
Quelltext steht unter der MIT-Lizenz auf
[GitHub](https://github.com/CodeForFire/FwAssist); jede Aussage auf dieser Seite
lässt sich dort nachprüfen. Ändert eine neue Version etwas daran, ändert sich
diese Seite im selben Zug.

## Fragen und Meldungen

- Fragen zum Datenschutz gerne im
  [Forum](https://github.com/CodeForFire/FwAssist/discussions) stellen.
- **Sicherheitslücken bitte nicht öffentlich melden**, sondern vertraulich über
  [SECURITY.md](https://github.com/CodeForFire/FwAssist/blob/main/SECURITY.md).
- Fehler in dieser Seite: bitte
  [ein Issue öffnen](https://github.com/CodeForFire/FwAssist/issues/new/choose).
