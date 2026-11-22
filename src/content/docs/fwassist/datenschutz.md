---
title: 'Datenschutzerklärung'
description: 'Welche Daten FwAssist verarbeitet und speichert: kein Konto, kein Server, keine Telemetrie; Internet nur für Kartenpakete, der Standort wird weder gespeichert noch gesendet — die Seite für den Play Store und für Datenschutzbeauftragte.'
---
Diese Seite beschreibt, welche Daten die Android-App FwAssist verarbeitet. Sie
gilt für die App aus dem Google Play Store und für die APK von GitHub
gleichermaßen; beide sind derselbe Build.

Stand: Version 0.2.1, November 2026. Die Darstellung ist technisch und
ausdrücklich **keine Rechtsberatung**.

## Kurzfassung

- **Kein Konto, keine Anmeldung, kein Server.** CodeForFire betreibt keinen
  Dienst, an den etwas fließen könnte, und erhält keinerlei Daten.
- **Keine Namen, Telefonnummern oder Kontakte.** Was im Buchstabieralphabet
  eingetippt wird — das kann auch ein Name sein —, verarbeitet die App nur im
  Arbeitsspeicher, um es zu buchstabieren; gespeichert wird es nicht.
- **Drei Berechtigungen:** Internet, Standort und Vibration. Wofür, steht
  [unten](#berechtigungen). Ins Internet geht die App nur, wenn du Kartenpakete
  für die Hydrantenkarte lädst; den Standort speichert und sendet sie nie.
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
| Hydrantenkarte | die Einsatzstelle, die du auf der Karte gesetzt hast, als Koordinate, bis du sie löschst; dazu die geladenen Kartenpakete |
| Kennzeichnungen | welche Gruppe gewählt ist (Warntafel, Gefahrzettel, …) |
| Strahlenschutz | die eingegebenen Zahlen und welche Rechnung gewählt ist |
| Sandsack (ab Version 0.3.0) | die eingegebenen Zahlen |
| Einstellungen | welche Helfer ein eigenes Symbol haben und in welcher Reihenfolge die Helfer stehen |

Nichts davon bezieht sich auf eine Person. Die Einsatzstelle ist der Punkt,
den du selbst auf die Karte tippst, nicht der Standort des Handys; sie verlässt
das Handy nicht. Das Wort, das im
Buchstabieralphabet eingegeben wird, und die Zeit der Stoppuhr werden nicht
gespeichert: Sie liegen nur im Arbeitsspeicher und sind fort, sobald Android
die App beendet.

Andere Apps können diesen Speicher nicht lesen. Beim Deinstallieren löscht
Android ihn vollständig; dasselbe bewirkt *Einstellungen → Apps → FwAssist →
Speicher → Daten löschen*.

## Berechtigungen

- **Internet.** Nur unter *Einstellungen → Kartenpakete*, und nur wenn du die
  Liste oder ein Paket lädst. Die Liste und die Pakete kommen von GitHub
  (`raw.githubusercontent.com` und `github.com`), ohne Anmeldung. Die Anfrage
  enthält nichts über dich oder einen Einsatz. Wie bei jedem Download sieht
  GitHub dabei die IP-Adresse des Handys; das regelt die
  [Datenschutzerklärung von GitHub](https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement).
  Danach funktioniert die Karte offline.
- **Standort.** Die App fragt erst, wenn du in der Hydrantenkarte den
  Richtungspfeil oder *Mein Standort* zum ersten Mal benutzt. Sie liest ihn nur,
  solange der Pfeil offen ist oder die Karte dich sucht, und **speichert oder
  sendet ihn nie**.
- **Vibration.** Damit meldet die App, zusammen mit einem kurzen Ton, dass du
  am Hydranten angekommen bist; beides folgt der Lautlos-Einstellung des Handys.

## Android-Sicherung

Hat jemand auf dem Handy die Android-Sicherung in sein Google-Konto
eingeschaltet, kann Android die oben genannten Einstellungen dorthin mitsichern
und auf einem neuen Handy wiederherstellen. Das ist eine Funktion des
Betriebssystems unter der Kontrolle der Person, der das Konto gehört.
CodeForFire hat darauf keinen Zugriff.

Ab Version 0.3.0 sichert Android die Einsatzstelle und die Kartenpakete dabei
nicht mit; sie bleiben auf dem Handy. Bei einer direkten Übertragung auf ein
neues eigenes Handy kommen sie mit.

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
