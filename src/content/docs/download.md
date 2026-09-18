---
title: Herunterladen und installieren
description: Pakete für Windows, Linux, macOS und Android — mit den Schritten für die Warnung beim ersten Start und der Prüfung der Downloads.
---

Ein Paket pro Plattform liegt bei jedem
[Release](https://github.com/CodeForFire/lagebuch/releases).

| Plattform | Datei |
|-----------|-------|
| Windows | `lagebuch-<version>-x64.msi` |
| Linux (Debian/Ubuntu) | `lagebuch_<version>_amd64.deb` |
| Android | `lagebuch-<version>.apk` |
| macOS (Apple Silicon) | `lagebuch-<version>-macos-arm64.dmg` |

Alle Pakete bringen die .NET-Laufzeit mit; es muss nichts weiter installiert
werden.

## Die Warnung beim ersten Start

:::caution[Die Pakete sind noch nicht signiert]
Deshalb warnt das Betriebssystem beim ersten Start einmal. Eine
Code-Signatur kostet Geld oder ein Förderprogramm – der Stand dazu steht in
der [Roadmap](https://github.com/CodeForFire/lagebuch/blob/main/ROADMAP.md).
Bis dahin könnt ihr stattdessen [den Download selbst
prüfen](#downloads-prüfen) – das ist nachweisbarer als jede Signatur-Warnung.
:::

- **Windows** – `.msi` ausführen; erscheint SmartScreen, *Weitere
  Informationen → Trotzdem ausführen*.
- **macOS** – `.dmg` öffnen, Lagebuch nach *Programme* ziehen, dann einmalig
  **Rechtsklick → Öffnen** (oder
  `xattr -dr com.apple.quarantine /Applications/Lagebuch.app`). Das `.dmg`
  wird auf Anfrage gebaut und an das Release angehängt.
- **Linux** – `sudo apt install ./lagebuch_*.deb`. Bitte `apt`, nicht
  `dpkg -i`: das Paket deklariert seine Systemabhängigkeiten (ICU, fontconfig,
  X11-Bibliotheken), die nur `apt` auflöst. Falls doch `dpkg -i`:
  `sudo apt-get -f install` räumt auf.
- **Android** – ab Android 6.0 (API 23); `.apk` öffnen und die Installation
  aus unbekannten Quellen für diese App einmal erlauben. Die Android-App ist
  ein Begleitgerät: sie verbindet sich mit einem Einsatz, der auf einem Laptop
  gehostet wird.

## Downloads prüfen

Jedem Release liegt `SHA256SUMS.txt` bei, und jede Installationsdatei trägt
einen Sigstore-Herkunftsnachweis aus dem Workflow-Lauf, der sie gebaut hat:

```bash
sha256sum -c SHA256SUMS.txt        # Linux, im Download-Ordner
shasum -a 256 -c SHA256SUMS.txt    # macOS
certutil -hashfile <Datei> SHA256  # Windows, mit SHA256SUMS.txt vergleichen
gh attestation verify <Datei> --repo CodeForFire/lagebuch
```

`SHA256SUMS.txt` deckt `.msi`, `.deb` und `.apk` ab. Das `.dmg` entsteht erst
nach dem Release und bringt deshalb seine eigene Prüfsumme mit:

```bash
shasum -a 256 -c lagebuch-<Version>-macos-arm64.dmg.sha256   # macOS
sha256sum -c lagebuch-<Version>-macos-arm64.dmg.sha256       # Linux
```

So lässt sich nachweisen, dass die Datei unverändert aus dem Repository
stammt – auch solange die Pakete noch nicht signiert sind. Für die
Kreisbrandinspektion oder den Datenschutzbeauftragten ist das die prüfbare
Antwort auf „woher kommt diese Datei?“.

## Systemvoraussetzungen

Lagebuch läuft auf dem, was auf einem ELW-Laptop üblicherweise schon steht:
64-Bit-Windows, eine aktuelle Debian- oder Ubuntu-Installation, macOS auf
Apple Silicon. Es braucht keine Serverkomponente, keine Datenbank und keinen
Internetzugang.

## Nächster Schritt

Mit den Beispieldaten aus der [Probefahrt in 5 Minuten](/probefahrt/) seht ihr
direkt einen gefüllten Einsatz statt leerer Dropdowns.
