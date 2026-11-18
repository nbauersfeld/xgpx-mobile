# xgpx-mobile – die letzten Strecken auf dem Handy

Eine installierbare Webseite (PWA), die die letzten vier Trainings zeigt, mit
‹ › zu blättern: Karte, km, Dauer, Tempo, Höhenmeter, Puls, Gerät,
Höhenprofil und Splits. Was genau wo steht, sagt „Was die Seite zeigt“ unten.

Die Seite selbst enthält **keine Daten** und darf öffentlich liegen. Die Strecke
schreibt xgpx als `mobile/letzte.json` in das private Repository der Sammlung
(`xgpx-samples`). Die Seite holt sie über die GitHub-API mit einem Token, das nur
dieses eine Repository lesen darf. Repository und Token bleiben auf dem Handy.

## Was die Seite zeigt

Von oben nach unten:

- **Kopf:** Name des Trainings (sonst die Art),
  darunter Art, Wochentag, Datum und Startzeit. Rechts drei Knöpfe: **⤓** neu
  bei Garmin holen (siehe unten), **↻** neu laden, **⚙** Zugang.
- **‹ 1 / 4 ›:** blättert durch die letzten vier Trainings, das neueste zuerst.
  Aufzeichnungen, die höchstens 10 Minuten nacheinander starten, gelten als
  *ein* Training mit zwei Geräten und belegen nur einen Platz.
- **Karte** (OpenStreetMap): die ganze Strecke mit Anfang und Ende, ohne
  Privatzone. Sie ist in der **Pace-Farbe** eingefärbt, schnell rot, langsam
  blau, wie `color pace` im xgpx-Fenster. Der grüne Punkt ist der Start. Eine
  zweite Uhr am selben Training liegt als blaue Linie darunter, und unter der
  Karte stehen beide Geräte mit ihren Kilometern.
- **Zahlen:** Kilometer, Dauer (mit Pausen), Tempo (zu Fuß in min/km, auf dem
  Rad in km/h), Höhenmeter, Puls im Mittel und das Gerät. Die Höhenmeter kommen
  aus dem Geländemodell DGM1 und sind damit für jedes Gerät gleich. Ohne DGM1
  zählt die Uhr mit Luftdruckmesser, sonst das grobe Geländemodell; nur ohne
  alles steht der Wert der Uhr da, als „Hm (Uhr)“. Eine Uhr ohne Luftdruckmesser
  zählt das Rauschen der GPS-Höhe mit (214 statt 92 Hm).
- **Höhenprofil** über der Strecke, ebenfalls in der Pace-Farbe. Darunter die
  Skala von der langsamsten zur schnellsten Pace des Trainings, ohne die
  äußersten 5 % (eine Ampel streckt die Skala sonst).
- **Splits:** zu Fuß je Kilometer, auf dem Rad je 5 km. Je Zeile stehen bis
  wohin, ein Balken in der Pace-Farbe (je länger, desto schneller), die Pace
  bzw. km/h und die Höhe vom Anfang zum Ende des Splits (nicht aufsummiert).
  Der letzte Split zeigt seine Länge, etwa „6,01“.

Zahlen, Profil und Splits stammen von der ersten Aufzeichnung eines Trainings.
Ohne Netz zeigt die Seite den zuletzt geholten Stand; der gelbe Hinweis oben
sagt dann, warum nicht neu geholt wurde.

## Einrichten

### 1. Repository für die Seite anlegen

1. Auf github.com oben rechts **+ → New repository**.
2. Name `xgpx-mobile`, **Public**. Eine github.io-Seite aus einem privaten
   Repository geht nur mit einem bezahlten Plan, und hier liegt nur Code.
3. **Create repository**.
4. Auf der leeren Seite **uploading an existing file** wählen und diese fünf
   Dateien aus `xgpx/mobile/` hineinziehen: `index.html`, `sw.js`,
   `manifest.webmanifest`, `icon-192.png`, `icon-512.png`. Diese README darf mit.
   Dann **Commit changes**.

### 2. GitHub Pages einschalten

1. Im Repository `xgpx-mobile`: **Settings → Pages**.
2. Unter **Build and deployment**: Source **Deploy from a branch**, Branch
   **main**, Ordner **/ (root)**, **Save**.
3. Nach ein bis zwei Minuten steht oben die Adresse:
   `https://<konto>.github.io/xgpx-mobile/`.

### 3. Token zum Lesen der Strecke anlegen

1. Auf github.com oben rechts das eigene Bild → **Settings → Developer settings →
   Personal access tokens → Fine-grained tokens → Generate new token**.
2. **Token name** z. B. `xgpx-mobile`, **Expiration** nach Wunsch (ein Jahr;
   danach ein neues anlegen und auf dem Handy eintragen).
3. **Repository access: Only select repositories → `xgpx-samples`**.
4. **Permissions → Repository permissions → Contents: Read-only**. Metadata
   (Read-only) setzt GitHub selbst dazu. Sonst nichts.
5. **Generate token** und den Token (`github_pat_…`) kopieren. GitHub zeigt
   ihn nur einmal.

Geht das Handy verloren: denselben Weg zurück und den Token **Revoke**n. Mit
ihm kann man nur die Sammlung lesen, nicht ändern.

### 4. Die Strecke bereitstellen

In der xgpx-Shell `restart` (oder neu starten). Beim Start und nach jedem
`garmin fetch` schreibt xgpx `mobile/letzte.json` und lädt sie mit der Sammlung
hoch. Auf github.com unter `xgpx-samples/mobile/` nachsehen, ob sie da ist.

### 5. Auf dem Handy

1. In **Chrome** die Adresse aus Schritt 2 öffnen.
2. Es fragt nach dem Zugang: Repository `<konto>/xgpx-samples`, darunter der
   Token. **Speichern** – die Strecke erscheint.
3. Chrome-Menü **⋮ → App installieren** (oder **Zum Startbildschirm
   hinzufügen**). Danach öffnet sie sich ohne Adressleiste wie eine App.

Die Seite lädt bei jedem Öffnen neu, **↻** lädt von Hand, **⚙** ändert den
Zugang. Ohne Netz zeigt sie den zuletzt geholten Stand.

## Neu holen ohne Rechner (Knopf ⤓)

Ohne diesen Knopf zeigt die Seite, was ein Rechner zuletzt mit `garmin fetch`
geholt hat. **⤓** startet stattdessen eine GitHub Action in `xgpx-samples`: sie
holt die jüngsten Aktivitäten bei Garmin, rechnet die Höhenmeter, schreibt
`mobile/letzte.json` und lädt hoch. Nach zwei bis drei Minuten zeigt die Seite
den neuen Lauf; oben steht, wie weit sie ist. Jeder Druck kostet rund drei
Minuten vom Kontingent für GitHub Actions.

Die Action meldet sich mit einer **eigenen** Garmin-Anmeldung an, nicht mit
der des Rechners: Garmin erneuert sein Token mit jedem Abruf, und zwei Stellen
mit demselben Token würden sich gegenseitig abmelden. Das Token liegt
verschlüsselt in der Sammlung (`.abholen/garmin.wallet`); den Schlüssel kennt
nur das Secret der Action.

Einmal einrichten:

1. In der xgpx-Shell `garmin login github`: E-Mail, Passwort, ggf. Code.
   Danach steht ein Schlüssel auf dem Bildschirm (nur dieses eine Mal).
2. Auf github.com in **`xgpx-samples` → Settings → Secrets and variables →
   Actions → New repository secret**: Name `XGPX_ABHOLEN_SCHLUESSEL`, Wert der
   Schlüssel aus Schritt 1.
3. Die Action braucht den Code von xgpx. Ein zweites Fine-grained-Token anlegen
   (wie oben in Schritt 3): Name `xgpx-code`, **Only select repositories →
   `xgpx`**, **Contents: Read-only**. In `xgpx-samples` als Secret `XGPX_CODE`
   ablegen.
4. Das Token auf dem Handy erweitern: **Settings → Developer settings →
   Fine-grained tokens → xgpx-mobile → Edit**, unter Repository permissions
   zusätzlich **Actions: Read and write**, **Update**. Der Token selbst bleibt
   derselbe, auf dem Handy ändert sich nichts.
5. `index.html` und `sw.js` neu hochladen (siehe unten).

Die Action selbst (`.github/workflows/abholen.yml` in `xgpx-samples`) legt
xgpx dort ab; die Vorlage ist `mobile/abholen.yml`.

## Neue Fassung der Seite

Ändert sich etwas in `xgpx/mobile/`, die geänderten Dateien wie in Schritt 1.4
wieder hochladen. Das Handy holt die neue Fassung beim nächsten Öffnen mit Netz.
