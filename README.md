# xgpx-mobile – die letzte Strecke auf dem Handy

Eine installierbare Webseite (PWA), die die zuletzt aufgezeichnete Strecke zeigt:
Karte, km, Dauer, Tempo, Höhenmeter, Puls, Gerät und Höhenprofil.

Die Seite selbst enthält **keine Daten** und darf öffentlich liegen. Die Strecke
schreibt xgpx als `mobile/letzte.json` in das private Repository der Sammlung
(`xgpx-samples`). Die Seite holt sie über die GitHub-API mit einem Token, das nur
dieses eine Repository lesen darf. Repository und Token bleiben auf dem Handy.

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

## Neue Fassung der Seite

Ändert sich etwas in `xgpx/mobile/`, die geänderten Dateien wie in Schritt 1.4
wieder hochladen. Das Handy holt die neue Fassung beim nächsten Öffnen mit Netz.
