# Pedago Game — JPO Challenge Terminal

Suite de jeux éducatifs « terminal » pour une Journée Portes Ouvertes d'école IT.
Chaque jeu fait découvrir un métier de l'informatique via des défis interactifs,
**jouables directement dans le navigateur, sans installation ni serveur**
(tout fonctionne en `file://`).

## Lancer

Ouvrir `index.html` dans un navigateur (le hub), ou directement un jeu :
`cyber.html`, `dev.html`, `network.html`, `sql.html`, `linux.html`,
`data.html`, `prompt.html`.

Aucune étape de build : React est chargé via CDN, le code applicatif est en
JavaScript pur (`React.createElement`, **pas de JSX ni de Babel**).

## Structure

```
index.html              Hub d'accueil (landing animée, cartes des jeux)
<jeu>.html              7 jeux, chacun autonome
shared/                 Code factorisé
  ├ utils.js            pick, shuffle, randInt, calculateScore, formatTime
  ├ rain.js             RainCanvas — animation canvas type « Matrix »
  ├ game-engine.js      GameEngine — moteur menu / jeu / victoire (~350 l.)
  └ level-builders.js   buildLevel / buildDifficultyLevel / buildChallengeLevel
data/                   Contenu des niveaux (1 fichier par jeu)
  └ <jeu>-levels.js     déclare une variable globale (ex: var SQL_LEVELS = {...})
```

Les fichiers `data/*.js` sont chargés via `<script>` et exposent une variable
globale. Aucun module/bundler : c'est ce qui permet le `file://`.

## Deux familles de jeux

**Catégorie A — moteur partagé** (`cyber`, `dev`, `sql`, `linux`, `prompt`)
Utilisent `GameEngine` + les *builders*. Le HTML ne contient qu'une config
(thème, couleurs, profils) et le branchement des niveaux. Le contenu vit dans
`data/<jeu>-levels.js`.

**Catégorie B — moteur dédié** (`data`, `network`)
Architecture différente (progression linéaire ou par profils, historique de
commandes avec flèches ↑↓, scoring par bonne réponse + bonus de temps, écrans
d'intro / ASCII, auto-advance). Le moteur reste *inline* dans le HTML mais le
**contenu des niveaux est externalisé** dans `data/data-levels.js` /
`data/network-levels.js` (via `DATA_LEVELS.build()` et `NETWORK_LEVELS.generate()`).

## Les builders (`shared/level-builders.js`)

- **`buildLevel(data)`** — niveau à scénarios : pioche un scénario aléatoire
  parmi `data.scenarios[]` (rejouabilité).
- **`buildDifficultyLevel(data, difficulté)`** — niveau paramétré par difficulté :
  pioche dans `data.challenges[difficulté]`.
- **`buildChallengeLevel(data, difficulté?)`** — niveau « question → `answer` » :
  pioche dans un pool plat (`data.challenges` est un tableau) ou par difficulté.
  Options : `match: "exact" | "includes"`, `missionTemplate` (`{desc} {code} {error}`),
  `codeCommand` (commande `code` auto-générée), `winTemplate` (`{answer} {fix}`).

### Descripteurs de vérification (`check.type`)
`regex`, `regexAny`, `regexAll`, `answer`, `includes`, `score`.

### Normaliseurs
`removeSpaces`, `removeQuotes`, `alphaOnly`, `removeSpacesQuotes`.

Les niveaux dont la logique est réellement procédurale (compteurs mutables,
`btoa`/`atob`, chiffrement César, évaluateur Python) restent des *générateurs*
inline dans le HTML, mais consomment leur **contenu** depuis `data/` (ex. les
pools de mots de passe / messages / e-mails de `cyber.html`).

## Convention de style

Code historique en `var`/`function` (`game-engine.js`, `level-builders.js`,
`linux/sql/prompt`) ; code plus récent en ES6 (`const`, fléchées, *template
literals* : `cyber`, `dev`, `data`, `network`, `utils.js`). Les deux coexistent
sans souci puisqu'il n'y a pas de transpilation.

## Ajouter / modifier un niveau

1. Éditer le `data/<jeu>-levels.js` correspondant (texte, scénarios, réponses).
2. Pour la catégorie A, brancher le niveau dans le tableau `levels()` du profil
   dans `<jeu>.html` via le bon builder.
3. Recharger la page — aucun build nécessaire.
