# Tur Virtual 360° — Campus Educational

Interfață web imersivă pentru panorame 360° (echirectangulare). Funcționează pe
desktop, telefon, căști VR (Meta Quest) și **Apple Vision Pro** prin WebXR.

## Structură
```
index.html          → interfața (galerie + vizualizator 360)
scenes.js           → lista panoramelor (editează aici ca să adaugi scene)
images/             → panoramele full-size (2:1 echirectangular)
images/thumbs/      → miniaturile pentru galerie
vercel.json         → config pentru deploy
```

## Cum testezi local
În folderul proiectului:
```
python -m http.server 5173
```
Deschide http://localhost:5173

> Trebuie un server (nu doar dublu-click pe fișier), altfel imaginile 360
> nu se încarcă din cauza restricțiilor de securitate ale browserului.

## Cum o pui pe Vercel (acces de pe alte calculatoare)
1. Creează cont gratuit pe https://vercel.com
2. Cea mai simplă cale — instalează CLI și rulează din folder:
   ```
   npm i -g vercel
   vercel
   ```
   Urmează pașii; primești un link public (ex: `campus-tour.vercel.app`).
3. Alternativ: încarcă folderul pe un repo GitHub și importă-l în Vercel
   (Add New → Project → Import).

Linkul merge de pe orice calculator, telefon sau cască VR.

## Cum folosești
- **Trage** cu mouse-ul / degetul = privești în jur
- **Scroll / pinch** = zoom
- **Hotspot-uri (bulinele albastre din scenă)** = navighezi între panorame:
  - pe **desktop** treci cu mouse-ul peste bulină (se mărește) și dai click
  - în **VR / Apple Vision Pro** privești bulina ~1 secundă (reticulul se umple)
    sau faci *pinch* — și te teleportează în panorama respectivă
- **Enter VR** (buton jos sau iconița A-Frame din dreapta-jos) = intri în cască.
  Pe Apple Vision Pro deschide linkul în Safari și apasă „Enter VR".
- Săgeți **← →** sau butoanele = treci la altă scenă
- **Esc** = înapoi la galerie

## Cum reglezi hotspot-urile de navigare
În `scenes.js`, fiecare scenă are un câmp `links`. Fiecare legătură:
```js
{ to: "pano-03", label: "Grădina campusului", position: "0 -0.6 -5" }
```
- `to` = id-ul scenei în care te duce bulina
- `label` = textul afișat la hover
- `position` = "x y z" în jurul privitorului:
  - **z negativ** = în față, **z pozitiv** = în spate
  - **x** = stânga/dreapta, **y** = sus/jos (–0.6 = aproape de „sol")
  - ex: `"-4 -0.6 -3"` = bulină în față-stânga; `"0 -0.6 5"` = în spate
Ajustează valorile ca bulinele să cadă logic pe alei/uși în fiecare imagine.

## Cum adaugi panorame noi
1. Pune imaginea 360 (raport 2:1) în `images/` (ex: `pano-05.jpg`)
2. Pune o miniatură 600px lățime în `images/thumbs/` (același nume)
3. Adaugă un obiect nou în `scenes.js`:
   ```js
   { id:"pano-05", title:"Titlu", caption:"Descriere",
     image:"images/pano-05.jpg", thumb:"images/thumbs/pano-05.jpg", startYaw:0 }
   ```

## Note tehnice
- Motor: [A-Frame 1.5](https://aframe.io) (WebXR + three.js), încărcat din CDN.
- WebXR are nevoie de **HTTPS** ca să pornească modul VR — Vercel oferă HTTPS
  automat, deci pe linkul Vercel funcționează căștile. Pe `localhost` merge și
  fără HTTPS pentru testare (fără VR real).
