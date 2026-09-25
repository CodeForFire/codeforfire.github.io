// The guided tour on /rundgang/: one entry per screenshot, in the order an
// Einsatz actually runs. Hotspot coordinates are percentages of the 1920×1032
// frame `make screenshots` renders in CodeForFire/lagebuch — if that size ever
// changes, the positions below are wrong, so the build refuses to continue.

import type { ImageMetadata } from 'astro'

export const FRAME = { width: 1920, height: 1032 } as const

export type Phase = 'vor' | 'im' | 'nach'

export const PHASEN: Record<Phase, string> = {
  vor: 'Vor dem Einsatz',
  im: 'Im Einsatz',
  nach: 'Nach dem Einsatz',
}

export interface Hotspot {
  /** Horizontal position in percent of the frame width. */
  x: number
  /** Vertical position in percent of the frame height. */
  y: number
  titel: string
  text: string
}

export interface Ansicht {
  /** Anchor on the page, and the screenshot's file name without `.png`. */
  id: string
  titel: string
  /** Label under the thumbnail in the timeline. */
  kurz: string
  phase: Phase
  text: string
  alt: string
  hotspots: Hotspot[]
}

/** Pixel position in the 1920×1032 frame → percent, so the data reads like the screenshot. */
const at = (px: number, py: number) => ({
  x: +((px / FRAME.width) * 100).toFixed(2),
  y: +((py / FRAME.height) * 100).toFixed(2),
})

export const ANSICHTEN: Ansicht[] = [
  {
    id: 'stammdaten-editor',
    kurz: 'Stammdaten',
    titel: 'Stammdaten',
    phase: 'vor',
    alt: 'Stammdaten-Editor mit der Kategorie Fahrzeuge: sieben Fahrzeuge zweier Wachen mit Funkrufname, Sitzplätzen und ZF-Kennzeichen',
    text:
      'Alles, was im Einsatz in einer Auswahlliste steht, pflegt ihr einmal vorher: Fahrzeuge, Personal, ' +
      'Rollen, Trupp-Typen, Checklisten und Links. Im Programm selbst ist nichts davon fest eingebaut – ' +
      'eine frische Installation startet leer.',
    hotspots: [
      {
        ...at(205, 288),
        titel: 'Kategorien',
        text: 'Fahrzeuge, Personal, Rollen, Einheiten-Status und Trupp-Typen. Ein Trupp-Typ bringt seine eigene Stärke und Einsatzzeit mit.',
      },
      {
        ...at(1640, 137),
        titel: 'Sitzplätze und ZF',
        text: 'Für jedes Fahrzeug die Zahl der Sitzplätze und ob ein Zugführer mitfährt. Damit füllt die Kräfte-Ansicht die Stärke später vor.',
      },
      {
        ...at(205, 172),
        titel: 'Navigation',
        text: 'Legt fest, welche Bereiche die Seitenleiste im Einsatz zeigt und in welcher Reihenfolge. Nur das ETB lässt sich nicht abschalten.',
      },
      {
        ...at(205, 611),
        titel: 'Eigene Checklisten',
        text: 'Beliebig viele Listen, jede mit Namen und Pflichtpunkten. Über „+ Neue Checkliste“ kommt die nächste dazu.',
      },
      {
        ...at(1583, 76),
        titel: 'Importieren und Exportieren',
        text: 'Die Stammdaten sind eine JSON-Datei. Einmal pflegen, exportieren und auf jedem ELW-Laptop importieren.',
      },
    ],
  },
  {
    id: 'home',
    kurz: 'Startseite',
    titel: 'Startseite',
    phase: 'vor',
    alt: 'Startseite von Lagebuch mit drei zuletzt verwendeten Einsatzdateien und je einem Knopf zum Öffnen',
    text:
      'Lagebuch startet ohne Anmeldung und ohne Server. Jeder Einsatz ist eine eigene .fwincident-Datei ' +
      'auf dem Laptop. Ihr könnt sie kopieren, archivieren oder weitergeben wie jedes andere Dokument.',
    hotspots: [
      {
        ...at(722, 56),
        titel: 'Einsatzbereit',
        text: 'Kein Konto, keine Verbindung nötig. Was ihr hier seht, funktioniert auch im Funkloch.',
      },
      {
        ...at(645, 265),
        titel: 'Zuletzt verwendet',
        text: 'Die letzten Einsätze mit ihrem Speicherort. Eine Datei pro Einsatz, standardmäßig nach Datum und Uhrzeit benannt.',
      },
      {
        ...at(1246, 265),
        titel: 'Öffnen',
        text: 'Doppelklick oder Öffnen, und der Einsatz steht genau so da, wie er gespeichert wurde.',
      },
    ],
  },
  {
    id: 'einsatzdaten',
    kurz: 'Einsatzdaten',
    titel: 'Einsatzdaten',
    phase: 'im',
    alt: 'Dialog „Einsatzdaten“ mit Stichwort B 3 – Zimmerbrand, Einsatznummer, Straße und Ortsteil',
    text:
      'Stichwort, Einsatznummer und Adresse stehen in einem Dialog. Was die ILS erst später durchgibt, ' +
      'tragt ihr nach, sobald es da ist. Dokumentieren könnt ihr trotzdem sofort.',
    hotspots: [
      {
        ...at(925, 486),
        titel: 'Stichwort',
        text: 'Steht groß in der Kopfzeile jeder Ansicht und oben im PDF-Bericht.',
      },
      {
        ...at(1145, 486),
        titel: 'Einsatznummer',
        text: 'Im bayerischen Format: B 1.2 JJMMTT lfd. Nr.',
      },
      {
        ...at(965, 553),
        titel: 'Straße und Ortsteil',
        text: 'Ergeben die Adresszeile im Bericht und in der Kopfzeile.',
      },
      {
        ...at(679, 28),
        titel: 'Jederzeit nachtragbar',
        text: 'Der Stift in der Kopfzeile öffnet den Dialog wieder – aus jeder Ansicht heraus.',
      },
    ],
  },
  {
    id: 'checkliste',
    kurz: 'Checkliste',
    titel: 'Checkliste',
    phase: 'im',
    alt: 'Checkliste „Aufbau“ mit sechs Punkten, drei davon abgehakt, vier als Pflicht markiert',
    text:
      'Eure eigenen Checklisten aus den Stammdaten, zum Beispiel für Aufbau und Abbau des ELW. ' +
      'Pflichtpunkte sind markiert, und wann eine Liste abgeschlossen wurde, steht im ETB.',
    hotspots: [
      {
        ...at(245, 193),
        titel: 'Abhaken',
        text: 'Ein Klick, und der Haken ist gespeichert.',
      },
      {
        ...at(1850, 193),
        titel: 'Pflicht',
        text: 'Pflichtpunkte legt ihr in den Stammdaten fest.',
      },
      {
        ...at(160, 134),
        titel: 'Noch offen',
        text: 'Der rote Punkt in der Seitenleiste bleibt, solange Pflichtpunkte offen sind.',
      },
      {
        ...at(296, 77),
        titel: 'Rückmeldung an ILS',
        text: 'Der Countdown erinnert an die nächste Rückmeldung – erst nach einer einstellbaren Zeit, danach in festen Abständen. Er läuft auch nach einem Neustart oder Absturz weiter.',
      },
    ],
  },
  {
    id: 'etb',
    kurz: 'ETB',
    titel: 'Einsatztagebuch',
    phase: 'im',
    alt: 'Einsatztagebuch mit fünf Einträgen; Spalten Zeit, Richtung, Von, An, Eintrag und Bearbeiter',
    text:
      'Das ETB ist das Herz des Einsatzes: jede Meldung mit Zeitstempel, Richtung und Bearbeiter. ' +
      'Systemereignisse wie ein Rückzugsalarm oder eine CO-Messung landen hier automatisch.',
    hotspots: [
      {
        ...at(475, 240),
        titel: 'Richtung',
        text: 'Eingang, Ausgang oder intern – so bleibt nachvollziehbar, wer wem was gemeldet hat.',
      },
      {
        ...at(848, 913),
        titel: 'Schnell mitschreiben',
        text: 'Richtung, Von, An, Eintrag – Enter, und die Meldung steht. Ganz ohne Maus.',
      },
      {
        ...at(1202, 913),
        titel: 'Hinzufügen & Aufgabe',
        text: 'Macht aus der Meldung gleich eine Aufgabe, etwa aus „Nachforderung 1 LF“ den Auftrag, die Anfahrt zu verfolgen.',
      },
      {
        ...at(1832, 240),
        titel: 'Korrigieren mit Historie',
        text: 'Ein Eintrag lässt sich nachträglich ändern, das Original bleibt sichtbar. Nichts verschwindet unbemerkt.',
      },
      {
        ...at(1693, 150),
        titel: 'Systemmeldungen',
        text: 'Blendet die automatischen Einträge aus, wenn ihr nur die Funksprüche lesen wollt.',
      },
    ],
  },
  {
    id: 'kraefte',
    kurz: 'Kräfte',
    titel: 'Kräfte',
    phase: 'im',
    alt: 'Kräfteübersicht mit vier Fahrzeugen, Stärke, Atemschutzgeräteträgern, Status und Bemerkung, oben die Gesamtstärke 0/4/26/30',
    text:
      'Hier seht ihr, welche Fahrzeuge da sind, mit welcher Stärke und in welchem Status. ' +
      'Die Gesamtstärke habt ihr oben immer im Blick.',
    hotspots: [
      {
        ...at(1745, 160),
        titel: 'Gesamtstärke',
        text: 'Zugführer / Gruppenführer / Mannschaft / gesamt, daneben die Zahl der Atemschutzgeräteträger.',
      },
      {
        ...at(986, 261),
        titel: 'Stärke ändern',
        text: 'Steigt jemand um, korrigiert ihr die Stärke. Jede Änderung bleibt in der Historie.',
      },
      {
        ...at(1260, 262),
        titel: 'Status',
        text: 'Alarmiert, auf Anfahrt, im Einsatz, abgerückt – welche Status es gibt, legen eure Stammdaten fest.',
      },
      {
        ...at(330, 913),
        titel: 'Fahrzeug aus den Stammdaten',
        text: 'Fahrzeug wählen, und Wache, Funkrufname und Sitzplätze sind schon ausgefüllt.',
      },
    ],
  },
  {
    id: 'funktionen',
    kurz: 'Funktionen',
    titel: 'Funktionen',
    phase: 'im',
    alt: 'Führung und Funktionen: Einsatzleiter und Atemschutzüberwachung mit Name, Funkrufname, Handynummer und Beginn',
    text:
      'Wer führt, wer überwacht den Atemschutz, wer leitet welchen Abschnitt – ' +
      'und wie sind alle erreichbar? Wechselt eine Funktion, bleibt die Übergabe dokumentiert.',
    hotspots: [
      {
        ...at(300, 240),
        titel: 'Funktion',
        text: 'EL, Abschnittsleiter, AS-Überwachung und alle weiteren Rollen aus euren Stammdaten.',
      },
      {
        ...at(1537, 240),
        titel: 'Handynummer',
        text: 'Für den Rückruf, wenn der Funk nicht reicht. Sie bleibt auf euren Geräten und steht in eurem Bericht.',
      },
      {
        ...at(1726, 240),
        titel: 'Von – bis',
        text: 'Jede Funktion hat einen Beginn und nach der Übergabe ein Ende.',
      },
      {
        ...at(1835, 240),
        titel: 'Übertrag',
        text: 'Übergibt die Funktion an die nächste Person. Die bisherige Zuweisung wird mit Uhrzeit beendet, die neue beginnt.',
      },
      {
        ...at(1684, 150),
        titel: 'Beendete Funktionen',
        text: 'Zeigt, wer eine Funktion vorher hatte.',
      },
    ],
  },
  {
    id: 'atemschutz',
    kurz: 'Atemschutz',
    titel: 'Atemschutzüberwachung',
    phase: 'im',
    alt: 'Atemschutzüberwachung mit drei Trupps, einem roten Rückzugsalarm und einer fälligen Druckabfrage',
    text:
      'Einsatzzeit, Druckabfragen und Rückzug für jeden Trupp. Was fällig ist, meldet sich – ' +
      'mit Banner, Sprachansage und Sirene, laut genug für den ELW.',
    hotspots: [
      {
        ...at(1000, 190),
        titel: 'Rückzugsalarm',
        text: 'Einsatzzeit erreicht oder Rückzugsdruck unterschritten: rotes Banner, Sirene und Sprachansage, bis jemand quittiert.',
      },
      {
        ...at(760, 131),
        titel: 'Druckabfrage fällig',
        text: 'Das Banner nennt Funkrufname und Trupp. Ein Klick darauf führt direkt zum Trupp.',
      },
      {
        ...at(325, 386),
        titel: 'Sicherheitstrupp',
        text: 'Jedem Trupp wird ein Sicherheitstrupp zugeordnet. Fehlt er, warnt Lagebuch, lässt euch aber weiterarbeiten.',
      },
      {
        ...at(1251, 375),
        titel: 'Restzeit',
        text: 'Die verbleibende Einsatzzeit. Wie lang sie ist, legt der Trupp-Typ in den Stammdaten fest. Ist sie abgelaufen, steht hier „überzogen“.',
      },
      {
        ...at(1760, 375),
        titel: 'Druck und Rückzug',
        text: 'Neuen Druck eintragen und bestätigen oder den Trupp zurückziehen. Jede Druckkontrolle steht mit Uhrzeit im ETB.',
      },
      {
        ...at(866, 913),
        titel: 'Bereitstellen',
        text: 'Einen neuen Trupp anlegen: Funkrufname, Trupp-Art, Truppführer, Truppmann, Einstiegsdruck, Einsatzzeit und Abfrage-Intervall.',
      },
    ],
  },
  {
    id: 'aufgaben',
    kurz: 'Aufgaben',
    titel: 'Aufgaben',
    phase: 'im',
    alt: 'Aufgabenliste mit einer fälligen Aufgabe hoher Wichtigkeit und einer zweiten, deren Timer noch 45 Minuten läuft',
    text:
      'Aufträge, die nicht vergessen werden dürfen: mit Wichtigkeit, Dringlichkeit, Zuständigem und ' +
      'Timer. Wird eine Aufgabe fällig, sagt Lagebuch es an.',
    hotspots: [
      {
        ...at(592, 360),
        titel: 'Fällig',
        text: 'Der Timer ist abgelaufen: Die Aufgabe steht rot in der Liste, und Lagebuch sagt sie an.',
      },
      {
        ...at(340, 360),
        titel: 'Wichtig und dringlich',
        text: 'Zwei getrennte Einschätzungen, damit das Dringende nicht das Wichtige verdrängt.',
      },
      {
        ...at(612, 402),
        titel: 'Timer',
        text: 'Läuft im Hintergrund weiter, auch wenn ihr gerade in einer anderen Ansicht seid.',
      },
      {
        ...at(1760, 270),
        titel: 'Offen, erledigt, alle',
        text: 'Abgehakte Aufgaben verschwinden aus dem Blick, bleiben aber erhalten.',
      },
      {
        ...at(700, 913),
        titel: 'Neue Aufgabe',
        text: 'Wichtigkeit, Dringlichkeit, Zuständigen und Timer in Minuten eintragen – oder die Aufgabe direkt aus einem ETB-Eintrag anlegen.',
      },
    ],
  },
  {
    id: 'co-messung',
    kurz: 'CO-Messung',
    titel: 'CO-Messprotokoll',
    phase: 'im',
    alt: 'CO-Messprotokoll für die Hauptstraße 12 mit drei Stockwerken zu je zwei Wohnungen, eine davon mit 120 ppm rot markiert',
    text:
      'Haus, Stockwerk, Wohnung – aufgebaut wie das Gebäude vor Ort. Für jede Wohnung gibt es ' +
      'eine Messreihe mit Uhrzeit, und jede Messung steht auch im ETB und im Bericht.',
    hotspots: [
      {
        ...at(600, 375),
        titel: 'Messwert mit Gefahrenfarbe',
        text: '120 ppm färben die Wohnung rot. Hier wurde dreimal gemessen: 120, dann 40 und nach dem Lüften 5 ppm. Der ganze Verlauf bleibt erhalten.',
      },
      {
        ...at(430, 311),
        titel: 'Fortschritt',
        text: 'Zeigt, wie viele Einheiten durchsucht, betroffen und noch offen sind – als Zahl und als Balken.',
      },
      {
        ...at(340, 535),
        titel: 'Türmarkierung',
        text: '„/“ heißt offen, „×“ durchsucht, der rote Punkt betroffen. Wie mit Kreide an der Tür.',
      },
      {
        ...at(298, 372),
        titel: 'Stockwerk',
        text: 'Durchsuchte Wohnungen je Stockwerk auf einen Blick. Weitere Ober- und Untergeschosse lassen sich jederzeit ergänzen.',
      },
      {
        ...at(1690, 303),
        titel: 'Filter',
        text: 'Nur die offenen oder nur die betroffenen Wohnungen zeigen – bei großen Gebäuden der schnellste Weg.',
      },
      {
        ...at(655, 913),
        titel: 'Mehrere Häuser',
        text: 'Ein Einsatz kann mehrere Gebäude umfassen, jedes mit eigenem Aufbau.',
      },
    ],
  },
  {
    id: 'pdf-export',
    kurz: 'PDF-Bericht',
    titel: 'PDF-Bericht',
    phase: 'nach',
    alt: 'Dialog „PDF exportieren“ mit acht wählbaren Abschnitten, im Hintergrund das Einsatztagebuch',
    text:
      'Ein Klick, und der Einsatzbericht liegt als PDF auf dem Rechner – fertig für die Akte und ' +
      'die Kreisbrandinspektion. Ihr entscheidet, welche Abschnitte hineingehören.',
    hotspots: [
      {
        ...at(787, 505),
        titel: 'Abschnitte wählen',
        text: 'Checkliste, ETB, Funktionen, Kräfte, Aufgaben, Atemschutz, CO-Messprotokoll – einzeln an- und abwählbar.',
      },
      {
        ...at(787, 661),
        titel: 'Angehängte Dateien',
        text: 'Fotos und PDFs aus dem Einsatz werden in den Bericht eingebettet. Jedes angehängte PDF bekommt eine Deckseite.',
      },
      {
        ...at(1091, 719),
        titel: 'Exportieren',
        text: 'Lagebuch merkt sich, wohin der Einsatz zuletzt exportiert wurde.',
      },
    ],
  },
]

const bilder = import.meta.glob<{ default: ImageMetadata }>('../assets/screenshots/*.png', {
  eager: true,
})

/**
 * The screenshot for a view. Fails the build when it is missing or its size
 * changed, because either way the hotspots would point at the wrong thing.
 */
export function bild(id: string): ImageMetadata {
  const meta = bilder[`../assets/screenshots/${id}.png`]?.default
  if (!meta) {
    throw new Error(
      `Rundgang: screenshot "${id}.png" not found in src/assets/screenshots/.\n` +
        'Run `npm run sync`, or update src/data/rundgang.ts if it was renamed in CodeForFire/lagebuch.',
    )
  }
  if (meta.width !== FRAME.width || meta.height !== FRAME.height) {
    throw new Error(
      `Rundgang: ${id}.png is ${meta.width}×${meta.height}, expected ${FRAME.width}×${FRAME.height}.\n` +
        'The hotspot positions in src/data/rundgang.ts assume that frame — re-check them.',
    )
  }
  return meta
}

for (const path of Object.keys(bilder)) {
  const id = path.replace(/^.*\/(.*)\.png$/, '$1')
  if (!ANSICHTEN.some((a) => a.id === id)) {
    console.warn(`Rundgang: screenshot ${id}.png is not part of the tour yet (src/data/rundgang.ts).`)
  }
}
