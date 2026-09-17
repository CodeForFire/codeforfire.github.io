---
title: Probefahrt in 5 Minuten
description: Lagebuch mit fertigen Beispieldaten ausprobieren — Stammdaten importieren, Übungseinsatz öffnen, PDF-Bericht erzeugen.
---

Lagebuch startet ohne Stammdaten mit leeren Dropdowns – das sagt wenig über
den Einsatz aus. Mit den beiden Beispieldateien unten seht ihr die App so, wie
sie sich auf einem eingerichteten ELW-Laptop anfühlt.

:::note
Alle Beispieldaten sind frei erfunden: erfundene Wachen, erfundene Fahrzeuge,
erfundene Namen.
:::

## 1. Installieren

Das Paket für euer System aus den
[Releases](https://github.com/CodeForFire/lagebuch/releases) laden – die
Schritte pro Plattform stehen unter [Herunterladen und
installieren](/download/).

## 2. Stammdaten importieren

[`demo-stammdaten.json` herunterladen](https://github.com/CodeForFire/lagebuch/raw/main/docs/samples/demo-stammdaten.json)

In Lagebuch **STAMMDATEN → IMPORTIEREN** wählen, die Datei öffnen,
**SPEICHERN**. Jetzt kennen die Dropdowns zwei Wachen, sieben Fahrzeuge, ein
paar Namen, Checklisten und Links.

## 3. Übungseinsatz öffnen

[`uebung.fwincident` herunterladen](https://github.com/CodeForFire/lagebuch/raw/main/docs/samples/uebung.fwincident)

In Lagebuch **ÖFFNEN** wählen. Der Einsatz „B 3 – Zimmerbrand“ hat schon
ETB-Einträge, vier Fahrzeuge, zwei Atemschutztrupps, Aufgaben und ein
CO-Messprotokoll. Über **WEITER BEARBEITEN** könnt ihr selbst eingreifen.

## 4. Ausprobieren

- Einen ETB-Eintrag schreiben.
- Im Tab **ATEMSCHUTZ** einen Trupp bereitstellen und starten – und warten,
  bis die Druckabfrage sich meldet.
- Eine Aufgabe mit Timer anlegen.
- In der **CO-MESSUNG** eine Wohnung markieren.

## 5. PDF exportieren

**PDF EXPORTIEREN** – der fertige Einsatzbericht liegt nach ein paar Sekunden
auf der Platte, mit den Abschnitten, die ihr ausgewählt habt.

## Danach mit eigenen Daten weiterarbeiten

Stammdaten exportieren, `masterdata.db` löschen (Pfad siehe
[Stammdaten-Dokumentation](https://github.com/CodeForFire/lagebuch/blob/main/docs/master-data.md)),
eigene Datei importieren.
