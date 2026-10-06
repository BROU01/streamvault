# StreamVault

Page statique pour **regarder** ou **télécharger** des épisodes d’anime en local.

## Fonctionnalités

- Catalogue généré depuis un seul tableau de données (`assets/js/main.js`)
- Lecture dans le navigateur (lecteur modal) ou téléchargement MP4
- Logo et favicon chrome, menu mobile, contrastes lisibles
- Respect de `prefers-reduced-motion`

## Stack

- HTML / CSS / JavaScript (sans framework)
- Fichiers média dans `assets/img` et `assets/video`

## Démarrage

Ouvrez `index.html` dans un navigateur, ou servez le dossier en local :

```bash
npx serve .
```

## Structure

```
anime/
├── index.html
├── assets/
│   ├── brand/     # logo, favicon
│   ├── css/       # styles
│   ├── img/       # affiches
│   ├── js/        # données + rendu
│   └── video/     # épisodes MP4 (Git LFS)
└── README.md
```

## Ajouter un épisode

Ajoutez un objet dans le tableau `EPISODES` de `assets/js/main.js` (titre, saison, fichier, etc.). Les cartes se génèrent automatiquement.

## Licence

Code source : usage libre pour ce dépôt.  
Les œuvres animées appartiennent à leurs ayants droit respectifs.
