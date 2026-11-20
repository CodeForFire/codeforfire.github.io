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
    alt: 'Stammdaten-Editor mit der Kategorie Fahrzeuge: sieben Fahrzeuge zweier Wachen mit Funkrufname, Typ, Telefon, E-Mail, Sitzplätzen und ZF-Kennzeichen',
    text:
      'Alles, was im Einsatz in einer Auswahlliste steht, pflegt ihr einmal vorher: Fahrzeuge, Personal, ' +
      'Rollen, Funkgruppen, Geräte, Stichwörter, Straßen, Objekte, Textbausteine, Checklisten und Links. ' +
      'Im Programm selbst ist nichts davon fest eingebaut – eine frische Installation startet leer.',
    hotspots: [
      {
        ...at(138, 520),
        titel: 'Kategorien',
        text: 'Von Einstellungen bis Textbausteine. Funkgruppen mit Kurzwahl und Favoriten, Geräte für die Ausgabeliste, Messgase mit eigenen Grenzwerten, Objekte mit Geschossen und Wohnungen, Straßen mit PLZ und Ortsteil.',
      },
      {
        ...at(1650, 105),
        titel: 'Sitzplätze und ZF',
        text: 'Für jedes Fahrzeug die Zahl der Sitzplätze und ob ein Zugführer mitfährt. Damit füllt die Kräfte-Ansicht die Stärke später vor.',
      },
      {
        ...at(1110, 105),
        titel: 'Telefon und E-Mail',
        text: 'Hat ein Fahrzeug eine Nummer oder eine Adresse, steht es im Einsatz mit in den Kontakten – zum Anrufen oder Anschreiben.',
      },
      {
        ...at(106, 172),
        titel: 'Navigation',
        text: 'Legt fest, welche Bereiche die Seitenleiste im Einsatz zeigt und in welcher Reihenfolge. Nur das ETB lässt sich nicht abschalten.',
      },
      {
        ...at(138, 983),
        titel: 'Eigene Checklisten',
        text: 'Beliebig viele Listen, jede mit Namen und Pflichtpunkten. Über „+ Neue Checkliste“ kommt die nächste dazu.',
      },
      {
        ...at(1583, 42),
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
      'Lagebuch startet ohne Anmeldung und ohne Server. Jeder Einsatz ist eine eigene .lagebuch-Datei ' +
      'auf dem Laptop, mit allen angehängten Dateien darin. Ihr könnt sie kopieren, archivieren oder ' +
      'weitergeben wie jedes andere Dokument.',
    hotspots: [
      {
        ...at(648, 56),
        titel: 'Einsatzbereit',
        text: 'Kein Konto, keine Verbindung nötig. Was ihr hier seht, funktioniert auch im Funkloch.',
      },
      {
        ...at(721, 282),
        titel: 'Zuletzt verwendet',
        text: 'Die letzten Einsätze mit ihrem Speicherort. Eine Datei pro Einsatz, standardmäßig nach Datum und Uhrzeit benannt.',
      },
      {
        ...at(1192, 283),
        titel: 'Öffnen',
        text: 'Doppelklick, Enter oder Öffnen, und der Einsatz steht genau so da, wie er gespeichert wurde.',
      },
    ],
  },
  {
    id: 'einsatzdaten',
    kurz: 'Einsatzdaten',
    titel: 'Einsatzdaten',
    phase: 'im',
    alt: 'Dialog „Einsatzdaten“ mit Stichwort B 3 – Zimmerbrand, Einsatznummer, Straße, Hausnummer, PLZ, Ort und Ortsteil',
    text:
      'Stichwort, Einsatznummer und Adresse stehen in einem Dialog. Was die ILS erst später durchgibt, ' +
      'tragt ihr nach, sobald es da ist. Dokumentieren könnt ihr trotzdem sofort.',
    hotspots: [
      {
        ...at(850, 452),
        titel: 'Stichwort',
        text: 'Vorschläge aus der Stichwort-Liste eurer Stammdaten. Steht groß in der Kopfzeile jeder Ansicht und oben im PDF-Bericht.',
      },
      {
        ...at(1068, 452),
        titel: 'Einsatznummer',
        text: 'Im Format eurer Leitstelle, in Bayern B 1.2 JJMMTT lfd. Nr. Buchstabe und Datum füllt Lagebuch vor, ihr tragt nur die laufende Nummer ein.',
      },
      {
        ...at(900, 520),
        titel: 'Adresse',
        text: 'Straße, Hausnummer, PLZ, Ort und Ortsteil. Eine Straße aus den Stammdaten füllt PLZ, Ort und Ortsteil selbst aus, und mit Kartenpaket springt die Lagekarte gleich zur Einsatzstelle.',
      },
      {
        ...at(717, 28),
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
        text: 'Ein Klick irgendwo auf die Zeile, und der Haken ist gespeichert.',
      },
      {
        ...at(1850, 193),
        titel: 'Pflicht',
        text: 'Pflichtpunkte legt ihr in den Stammdaten fest.',
      },
      {
        ...at(110, 134),
        titel: 'Noch offen',
        text: 'Der rote Punkt in der Seitenleiste bleibt, solange Pflichtpunkte offen sind.',
      },
      {
        ...at(220, 77),
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
    alt: 'Einsatztagebuch mit fünf Einträgen; Spalten Zeit, Von, An, Eintrag und Erfasst von, darüber die Reiter Einsatztagebuch und Lagemeldung',
    text:
      'Das ETB ist das Herz des Einsatzes: jede Meldung mit Zeitstempel, Absender, Empfänger und Bearbeiter. ' +
      'Systemereignisse wie ein Rückzugsalarm oder eine Gasmessung landen hier automatisch.',
    hotspots: [
      {
        ...at(480, 259),
        titel: 'Von und An',
        text: 'Wer hat wem was gemeldet – Funkrufnamen aus den Kräften und Stammdaten werden beim Tippen vorgeschlagen.',
      },
      {
        ...at(710, 913),
        titel: 'Schnell mitschreiben',
        text: 'Von, An, Eintrag – Enter, und die Meldung steht. Ganz ohne Maus. Mit ::kürzel holt ihr einen Textbaustein aus den Stammdaten.',
      },
      {
        ...at(1063, 913),
        titel: 'Hinzufügen & Aufgabe',
        text: 'Macht aus der Meldung gleich eine Aufgabe, etwa aus „Nachforderung 1 LF“ den Auftrag, die Anfahrt zu verfolgen. Eintrag und Aufgabe bleiben verknüpft.',
      },
      {
        ...at(1832, 299),
        titel: 'Korrigieren mit Historie',
        text: 'Ein Eintrag lässt sich nachträglich ändern, das Original bleibt sichtbar. Nichts verschwindet unbemerkt.',
      },
      {
        ...at(1790, 208),
        titel: 'Filter',
        text: 'Blendet die automatischen Einträge aus, wenn ihr nur die Funksprüche lesen wollt – oder zeigt nur die Lagemeldungen.',
      },
      {
        ...at(437, 152),
        titel: 'Lagemeldung',
        text: 'Der zweite Reiter im ETB (Strg+L): die nächste Lagemeldung an die ILS, vorbefüllt aus dem Einsatz.',
      },
    ],
  },
  {
    id: 'lagemeldung',
    kurz: 'Lagemeldung',
    titel: 'Lagemeldung',
    phase: 'im',
    alt: 'Lagemeldung als Entwurf: Meldender, Einsatzstelle, Lage, Maßnahmen, Einheiten und Nachforderungen, darunter der fertige Funkspruch, rechts der Buchstabier-Helfer',
    text:
      'Die regelmäßige Lagemeldung an die ILS, Feld für Feld statt aus dem Kopf. Lagebuch setzt daraus ' +
      'den Funkspruch zum Vorlesen zusammen und schreibt ihn beim Senden ins ETB.',
    hotspots: [
      {
        ...at(1020, 265),
        titel: 'Vorbefüllt',
        text: 'Meldender, Einsatzstelle und eingesetzte Einheiten kommen aus dem Einsatz. Ihr ergänzt Lage, Maßnahmen und Nachforderungen.',
      },
      {
        ...at(1531, 524),
        titel: 'Einheiten neu holen',
        text: 'Übernimmt die Kräfte so, wie sie gerade im Einsatz stehen, mit Stärke.',
      },
      {
        ...at(1010, 670),
        titel: 'Funkspruch',
        text: '„1. Lagemeldung von Hauptstraße 12 · …“ – genau so, wie er vorgelesen wird.',
      },
      {
        ...at(1500, 737),
        titel: 'Senden an ILS',
        text: 'Schreibt die Meldung als „LM 1“ ins ETB, startet die Rückmeldung an die ILS neu und nimmt sie in den PDF-Bericht.',
      },
      {
        ...at(1735, 380),
        titel: 'Buchstabieren',
        text: 'Jedes Wort buchstabiert – nach der bekannten Tafel (Anton, Berta), nach DIN 5009 oder NATO. ABC neben einem Feld buchstabiert dessen Inhalt.',
      },
    ],
  },
  {
    id: 'fuehrung',
    kurz: 'Führung',
    titel: 'Führungsorganisation',
    phase: 'im',
    alt: 'Führungstafel mit Einsatzleitung Feuerwehr, Einsatzleitung Rettungsdienst, zwei Abschnitten und einer Bereitstellung mit ihren Einheiten, Funkgruppen und Leitern',
    text:
      'Die Führungsorganisation, wie ihr sie vom A3-Bogen kennt: Einsatzleitung, Abschnitte, ' +
      'Bereitstellung und die Einsatzleitungen der Partner, mit Leitern, Funkgruppen und Einheiten. ' +
      'Funktionen, Kräfte und die Lagekarte sind Reiter daneben.',
    hotspots: [
      {
        ...at(318, 207),
        titel: 'Draht zur ILS',
        text: 'Über welchen Kanal der ELW die Leitstelle erreicht – steht oben auf der Tafel und im Bericht.',
      },
      {
        ...at(277, 303),
        titel: 'Lageführung',
        text: 'Welche Einsatzleitung die Lage führt, wenn mehrere Organisationen vor Ort sind.',
      },
      {
        ...at(390, 545),
        titel: 'Führungsstelle',
        text: 'Standort, Führungsfahrzeug, Rufname und Funkgruppen der Einsatzleitung. Jede Führungsstelle kann bis zu drei TMO- und drei DMO-Gruppen führen.',
      },
      {
        ...at(345, 770),
        titel: 'Funkgruppen-Abgleich',
        text: 'Der Haken zeigt eine Funkgruppe, die die Stelle mit der übergeordneten teilt. Fehlt eine gemeinsame, warnt die Karte in Orange.',
      },
      {
        ...at(333, 707),
        titel: 'Abschnitt',
        text: 'Mit Auftrag, Abschnittsleiter und Melder. Abschnitte lassen sich ziehen, unterordnen und umsortieren.',
      },
      {
        ...at(243, 932),
        titel: 'Einheiten ziehen',
        text: 'Fahrzeuge an der Griffleiste in einen anderen Abschnitt ziehen – der Status zieht mit, und Strg+Z macht es ein paar Sekunden lang rückgängig.',
      },
      {
        ...at(1025, 707),
        titel: 'Bereitstellung',
        text: 'Nachrückende Kräfte sammeln, mit Summe der Stärke. Wer hier steht, hat den Status Bereitstellungsraum.',
      },
    ],
  },
  {
    id: 'kraefte',
    kurz: 'Kräfte',
    titel: 'Kräfte',
    phase: 'im',
    alt: 'Kräfteübersicht mit vier Fahrzeugen, Fahrzeugtyp, Abschnitt, Stärke, Atemschutzgeräteträgern, Status und Bemerkung, oben die Gesamtstärke 0/4/26/30',
    text:
      'Hier seht ihr, welche Fahrzeuge da sind, mit welcher Stärke, in welchem Abschnitt und in welchem ' +
      'Status. Die Gesamtstärke habt ihr oben immer im Blick.',
    hotspots: [
      {
        ...at(1670, 217),
        titel: 'Gesamtstärke',
        text: 'Zugführer / Gruppenführer / Mannschaft / gesamt, daneben die Zahl der Atemschutzgeräteträger.',
      },
      {
        ...at(817, 360),
        titel: 'Fahrzeugtyp',
        text: 'HLF, LF, DLK … – daraus zeichnet die Lagekarte das taktische Zeichen.',
      },
      {
        ...at(977, 360),
        titel: 'Abschnitt',
        text: 'Wo die Einheit in der Führungsorganisation steht. Hier zuweisen oder auf der Führungstafel ziehen.',
      },
      {
        ...at(1147, 360),
        titel: 'Stärke ändern',
        text: 'Steigt jemand um, korrigiert ihr die Stärke. Jede Änderung bleibt in der Historie.',
      },
      {
        ...at(1420, 320),
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
    alt: 'Funktionen: Einsatzleiter, Atemschutzüberwachung und zwei Einsatzabschnittsleiter mit Abschnitt, Name, Funkrufname, Handynummer und Beginn',
    text:
      'Wer führt, wer überwacht den Atemschutz, wer leitet welchen Abschnitt – ' +
      'und wie sind alle erreichbar? Wechselt eine Funktion, bleibt die Übergabe dokumentiert.',
    hotspots: [
      {
        ...at(260, 296),
        titel: 'Funktion',
        text: 'EL, EAL, Melder, AS-Überwachung und alle weiteren Rollen aus euren Stammdaten.',
      },
      {
        ...at(470, 378),
        titel: 'Abschnitt',
        text: 'Ein Abschnitt der Führungstafel – die Funktion steht dann auch auf deren Karte.',
      },
      {
        ...at(1237, 296),
        titel: 'Handynummer',
        text: 'Für den Rückruf, wenn der Funk nicht reicht. Sie bleibt auf euren Geräten und steht in eurem Bericht.',
      },
      {
        ...at(1400, 296),
        titel: 'Von – bis',
        text: 'Jede Funktion hat einen Beginn und nach der Übergabe oder dem Ende ein Ende.',
      },
      {
        ...at(1621, 296),
        titel: 'Übertragen',
        text: 'Übergibt die Funktion an die nächste Person. Die bisherige Zuweisung wird mit Uhrzeit beendet, die neue beginnt.',
      },
      {
        ...at(1734, 296),
        titel: 'Bearbeiten und Beenden',
        text: 'Einen Tippfehler im Namen korrigieren, ohne eine Übergabe vorzutäuschen – oder die Funktion ganz beenden. Beides steht im ETB.',
      },
      {
        ...at(1785, 207),
        titel: 'Beendete Funktionen',
        text: 'Zeigt, wer eine Funktion vorher hatte.',
      },
    ],
  },
  {
    id: 'lagekarte',
    kurz: 'Lagekarte',
    titel: 'Lagekarte',
    phase: 'im',
    alt: 'Lagekarte mit der Einsatzstelle am Marktplatz, drei Fahrzeugen als taktische Zeichen, Hydranten mit Durchfluss und der Einheitenliste daneben',
    text:
      'Die Karte der Einsatzstelle – offline, aus einem Kartenpaket pro Landkreis, das ihr einmal ' +
      'vorher ladet. Alle Daten der Karte sind hier frei erfunden.',
    hotspots: [
      {
        ...at(901, 540),
        titel: 'Einsatzstelle',
        text: 'Gesetzt aus der Adresse, durch Tippen auf die Karte oder per Adresssuche – ganz ohne Internet. Der Pin lässt sich ziehen.',
      },
      {
        ...at(908, 468),
        titel: 'Taktisches Zeichen',
        text: 'Jedes Fahrzeug nach DV 102 mit Funkrufname. Der Punkt zeigt, wo es steht; das Zeichen lässt sich daneben schieben.',
      },
      {
        ...at(878, 508),
        titel: 'Hydranten',
        text: 'Hydranten, Saugstellen und Löschteiche aus OpenStreetMap, gefärbt nach Durchfluss in l/min. Antippen öffnet die Details und ein Höhenprofil zur Einsatzstelle.',
      },
      {
        ...at(1560, 309),
        titel: 'Gelände',
        text: 'Höhen aus dem DGM5: Schummerung, Höhenlinien, Hangneigung – und der Fließweg, den Löschwasser oder ein Gefahrstoff nehmen würde.',
      },
      {
        ...at(1560, 341),
        titel: 'Nachtkarte',
        text: 'Dunkle Karte für den dunklen ELW.',
      },
      {
        ...at(1690, 370),
        titel: 'Einheiten',
        text: 'Alle Kräfte mit Typ, Stärke und Status. Eine noch nicht platzierte Einheit setzt ihr mit dem Pin auf die Karte.',
      },
      {
        ...at(1645, 916),
        titel: 'Ebenen',
        text: 'GeoJSON-Dateien wie eine DWD-Ausbreitungsprognose als eigene Ebene, mit Zeitleiste. Sie gehen mit dem Einsatz an jedes verbundene Gerät.',
      },
    ],
  },
  {
    id: 'kontakte',
    kurz: 'Kontakte',
    titel: 'Kontakte',
    phase: 'im',
    alt: 'Kontakte-Tab mit der Einsatzgruppe aus den Stammdaten: Name, Rolle, Funkrufname, Zuständigkeit, Telefon und E-Mail',
    text:
      'Das Telefonbuch der Feuerwehr, direkt aus euren Stammdaten: wer, in welcher Rolle, ' +
      'wie erreichbar – und wofür er oder sie zuständig ist.',
    hotspots: [
      {
        ...at(580, 152),
        titel: 'Suche',
        text: 'Findet, wen ihr sucht – über Name, Funktion, Zuständigkeit oder Nummer.',
      },
      {
        ...at(300, 213),
        titel: 'Name, Rolle, Funkrufname',
        text: 'Die Zeile einer Einsatzkraft: Name, Rolle und Funkrufname, genau wie der Bericht sie kennt.',
      },
      {
        ...at(400, 235),
        titel: 'Zuständigkeit',
        text: 'Wofür jemand zuständig ist – und der Text, den die Suche als Treffer markiert.',
      },
      {
        ...at(1210, 223),
        titel: 'Anrufen',
        text: 'Ein Klick wählt die Nummer in der Telefon-App des Rechners. Die Nummern bleiben auf euren Geräten.',
      },
      {
        ...at(1298, 224),
        titel: 'E-Mail',
        text: 'Öffnet eine Mail an die Person – etwa, um ein Foto oder den Bericht zu schicken.',
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
        ...at(420, 81),
        titel: 'Rückzugsalarm',
        text: 'Einsatzzeit erreicht oder Rückzugsdruck unterschritten: rotes Banner, Sirene und Sprachansage, bis jemand quittiert. F9 springt hin.',
      },
      {
        ...at(760, 137),
        titel: 'Druckabfrage fällig',
        text: 'Das Banner nennt Funkrufname und Trupp. Ein Klick darauf führt direkt zum Trupp.',
      },
      {
        ...at(320, 339),
        titel: 'Trupp',
        text: 'Benannt nach Funkrufname und Trupp-Art. Der Stift ändert die Trupp-Art, etwa wenn der Sicherheitstrupp als nächster vorgeht.',
      },
      {
        ...at(340, 393),
        titel: 'Sicherheitstrupp',
        text: 'Jedem Trupp wird ein Sicherheitstrupp zugeordnet. Fehlt er, warnt Lagebuch, lässt euch aber weiterarbeiten.',
      },
      {
        ...at(1251, 373),
        titel: 'Restzeit',
        text: 'Die verbleibende Einsatzzeit. Wie lang sie ist, legt der Trupp-Typ in den Stammdaten fest. Ist sie abgelaufen, steht hier „überzogen“.',
      },
      {
        ...at(1800, 352),
        titel: 'Druck und Rückzug',
        text: 'Neuen Druck eintragen und bestätigen oder den Trupp zurückziehen. Jede Druckkontrolle steht mit Uhrzeit im ETB.',
      },
      {
        ...at(1745, 391),
        titel: 'Ort',
        text: 'Wo der Trupp gerade ist, zu jeder Druckabfrage. Im Bericht ergibt das den Weg des Trupps.',
      },
      {
        ...at(1446, 913),
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
    alt: 'Aufgabenliste mit einer fälligen Aufgabe hoher Wichtigkeit und einer zweiten, deren Timer noch 45 Minuten läuft; oben das Banner der fälligen Aufgabe',
    text:
      'Aufträge, die nicht vergessen werden dürfen: mit Wichtigkeit, Dringlichkeit, Zuständigem und ' +
      'Timer. Wird eine Aufgabe fällig, sagt Lagebuch es an; korrigieren lässt sie sich jederzeit.',
    hotspots: [
      {
        ...at(545, 403),
        titel: 'Fällig',
        text: 'Der Timer ist abgelaufen: Die Aufgabe steht rot in der Liste, und Lagebuch sagt sie an.',
      },
      {
        ...at(1778, 189),
        titel: 'Erinnert, bis erledigt',
        text: 'Das Banner bleibt, bis die Aufgabe erledigt ist – oder +5 MIN sie fünf Minuten aufschiebt.',
      },
      {
        ...at(360, 403),
        titel: 'Wichtig und dringlich',
        text: 'Zwei getrennte Einschätzungen, damit das Dringende nicht das Wichtige verdrängt.',
      },
      {
        ...at(556, 445),
        titel: 'Timer',
        text: 'Läuft im Hintergrund weiter, auch wenn ihr gerade in einer anderen Ansicht seid.',
      },
      {
        ...at(1872, 403),
        titel: 'Korrigieren',
        text: 'Der Stift (oder Enter/F2 auf der Zeile) öffnet die Aufgabe zum Korrigieren: Wichtigkeit, Dringlichkeit, Zugeteilt an und Text.',
      },
      {
        ...at(1770, 313),
        titel: 'Offen, erledigt, alle',
        text: 'Abgehakte Aufgaben verschwinden aus dem Blick, bleiben aber erhalten.',
      },
      {
        ...at(1050, 913),
        titel: 'Neue Aufgabe',
        text: 'Wichtigkeit, Dringlichkeit, Zuständigen und Timer in Minuten eintragen – oder die Aufgabe direkt aus einem ETB-Eintrag anlegen.',
      },
    ],
  },
  {
    id: 'co-messung',
    kurz: 'Gasmessung',
    titel: 'Gasmessprotokoll',
    phase: 'im',
    alt: 'Gasmessprotokoll für die Hauptstraße 12 mit drei Stockwerken zu je zwei Wohnungen, eine davon mit 120 ppm rot markiert',
    text:
      'Haus, Stockwerk, Wohnung – aufgebaut wie das Gebäude vor Ort. Für jede Wohnung gibt es ' +
      'eine Messreihe mit Uhrzeit für bis zu acht Gase, und jede Messung steht auch im ETB und im Bericht.',
    hotspots: [
      {
        ...at(378, 412),
        titel: 'Messwert mit Gefahrenfarbe',
        text: '120 ppm CO färben die Wohnung rot. Welche Gase gemessen werden und ab wann es gefährlich wird, legen die Messgase in den Stammdaten fest – die Kachel zeigt immer das schlimmste.',
      },
      {
        ...at(430, 337),
        titel: 'Fortschritt',
        text: 'Zeigt, wie viele Einheiten durchsucht, betroffen und noch offen sind – als Zahl und als Balken.',
      },
      {
        ...at(1131, 495),
        titel: 'Türmarkierung',
        text: '„/“ heißt offen, „×“ durchsucht, der rote Punkt betroffen. Wie mit Kreide an der Tür.',
      },
      {
        ...at(1100, 412),
        titel: 'Schlüssel',
        text: 'Ob ein Schlüssel da ist – und wenn er übergeben wurde, seine Nummer, damit er an die richtige Tür zurückgeht.',
      },
      {
        ...at(235, 410),
        titel: 'Stockwerk',
        text: 'Durchsuchte Wohnungen je Stockwerk auf einen Blick. Weitere Ober- und Untergeschosse lassen sich jederzeit ergänzen.',
      },
      {
        ...at(1700, 346),
        titel: 'Filter',
        text: 'Nur die offenen oder nur die betroffenen Wohnungen zeigen – bei großen Gebäuden der schnellste Weg.',
      },
      {
        ...at(654, 913),
        titel: 'Mehrere Häuser',
        text: 'Ein Einsatz kann mehrere Gebäude umfassen. Ein Objekt aus den Stammdaten bringt Geschosse und Wohnungsbezeichnungen gleich mit.',
      },
    ],
  },
  {
    id: 'beteiligte',
    kurz: 'Beteiligte',
    titel: 'Beteiligte',
    phase: 'im',
    alt: 'Beteiligte-Tab mit drei Karten: Name, Telefon, Aufenthaltsort, Wohnung und Notiz, darüber ein Suchfeld',
    text:
      'Wer an diesem Einsatz hängt, steht hier: eine Karte pro Person mit Telefon, Aufenthaltsort ' +
      'und einer Notiz. Die Einträge lassen sich direkt in der Karte korrigieren.',
    hotspots: [
      {
        ...at(590, 316),
        titel: 'Suche',
        text: 'Filtert beim Tippen nach Name, Telefon, Notiz, Aufenthaltsort oder Wohnung.',
      },
      {
        ...at(695, 386),
        titel: 'Name',
        text: 'Eine Karte pro Person an diesem Einsatz. Der Name ist direkt in der Karte änderbar.',
      },
      {
        ...at(655, 428),
        titel: 'Aufenthaltsort',
        text: 'Wo die Person nach einer Räumung ist – bei der Nachbarin oder im RTW –, mit der Uhrzeit der letzten Änderung.',
      },
      {
        ...at(1495, 428),
        titel: 'Wohnung',
        text: 'Die Wohnung aus dem Gasmessprotokoll, in der die Person angetroffen wurde. Der Bericht nennt sie dort mit.',
      },
      {
        ...at(1090, 471),
        titel: 'Notiz',
        text: 'Was die Person angeht: „Bewohnerin 2. OG, über DLK gerettet“, „Polizei vor Ort“, …',
      },
      {
        ...at(1853, 387),
        titel: 'Entfernen',
        text: 'Nimmt eine Karte aus diesem Einsatz – die Daten bleiben in der Historie sichtbar.',
      },
    ],
  },
  {
    id: 'ausgabe',
    kurz: 'Ausgabe',
    titel: 'Ausgabeliste',
    phase: 'im',
    alt: 'Ausgabeliste mit drei Geräten: Mobilteil und Pressweste noch ausgegeben, das Fernglas zurück',
    text:
      'Mobilteil an die Polizei, Weste an die Presse: Was an der Einsatzstelle ausgegeben wird, steht ' +
      'hier – und was noch nicht zurück ist, steht oben.',
    hotspots: [
      {
        ...at(370, 383),
        titel: 'Gerät',
        text: 'Aus der Geräte-Liste der Stammdaten, mit Anzahl. Lagebuch fragt nach, bevor mehr ausgegeben werden, als es gibt.',
      },
      {
        ...at(620, 428),
        titel: 'Ausgegeben an',
        text: 'Name, Telefon und Organisation – vorgeschlagen aus Beteiligten und Kontakten.',
      },
      {
        ...at(1816, 382),
        titel: 'Zurück',
        text: 'Ein Klick nimmt das Gerät mit Uhrzeit zurück. Ein Versehen macht der Pfeil wieder rückgängig.',
      },
      {
        ...at(1826, 305),
        titel: 'Noch draußen',
        text: 'Wie viele Geräte noch ausgegeben sind. „Einsatz abschließen“ warnt, solange etwas fehlt.',
      },
      {
        ...at(1318, 908),
        titel: 'Ausgeben',
        text: 'Gerät, Person, Telefon und Bemerkung – und die Liste steht im PDF-Bericht.',
      },
    ],
  },
  {
    id: 'pdf-export',
    kurz: 'PDF-Bericht',
    titel: 'PDF-Bericht',
    phase: 'nach',
    alt: 'Dialog „PDF exportieren“ mit zwölf wählbaren Abschnitten, im Hintergrund das Einsatztagebuch',
    text:
      'Ein Klick, und der Einsatzbericht liegt als PDF auf dem Rechner – fertig für die Akte und ' +
      'die Kreisbrandinspektion. Ihr entscheidet, welche Abschnitte hineingehören.',
    hotspots: [
      {
        ...at(870, 465),
        titel: 'Abschnitte wählen',
        text: 'Checkliste, ETB, Lagemeldungen, Funktionen, Führungsorganisation, Kräfte, Beteiligte, Ausgabeliste, Aufgaben, Atemschutz, Gasmessprotokoll – einzeln an- und abwählbar.',
      },
      {
        ...at(866, 739),
        titel: 'Angehängte Dateien',
        text: 'Fotos und PDFs aus dem Einsatz werden in den Bericht eingebettet. Jedes angehängte PDF bekommt eine Deckseite.',
      },
      {
        ...at(828, 797),
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
