# Tilawa

Appli web pour créer des vidéos de récitation du Coran au format TikTok (9:16), directement sur le téléphone.

- **Plus de 200 récitateurs** : catalogue de [mp3quran.net](https://mp3quran.net) (minutage officiel des versets quand il existe) et récitateurs verset par verset d'[everyayah.com](https://everyayah.com) (synchro parfaite).
- **Texte uthmani + traduction** (français Hamidullah ou anglais Saheeh) via le paquet `quran-json`.
- **117 fonds animés** (13 décors × 9 ambiances), sans aucun signe ni symbole, plus ta propre photo ou vidéo.
- **Création de la vidéo dans le navigateur** (WebCodecs) : MP4 (H.264 + AAC) ou MOV (H.264 + son PCM) pour l'iPhone, avec un petit multiplexeur maison (`js/mux.js`).

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | page et styles |
| `js/app.js` | l'appli : bibliothèque, versets, synchro, aperçu, export |
| `js/sources.js` | récitateurs (mp3quran, everyayah), téléchargement partiel et minutage |
| `js/scenes.js` | les 117 fonds animés |
| `js/mux.js` | écriture des fichiers MP4 / MOV |
| `api/proxy.js` | relais audio (Vercel Edge) limité aux sites de récitation, pour les sites qui bloquent l'accès direct |

## Mise en ligne

Projet statique + une fonction Edge : sur [vercel.com](https://vercel.com), « Add New › Project », importer ce dépôt, laisser les réglages par défaut (Framework : Other), « Deploy ».

Sur iPhone : ouvrir le lien dans Safari › Partager › « Sur l'écran d'accueil ».
