# VerseBuilder — World Builder | Site vitrine

Site vitrine complet pour un World Builder RP, construit en **HTML5 / CSS3 / JavaScript Vanilla** (aucun framework). Prêt à être publié sur **GitHub Pages**.

## 1. Structure du projet

Tous les fichiers sont regroupés dans un seul dossier, à plat (aucun sous-dossier), pour une mise en ligne la plus simple possible :

```
/
├── index.html
├── about.html
├── univers.html
├── monde.html
├── personnages.html
├── personnage.html
├── pays.html
├── factions.html
├── alliances.html
├── contact.html
├── style.css
├── script.js        (toutes les interactions du site)
├── config.js        (email, réseaux sociaux, index de recherche)
└── README.md
```

## 2. Modifier le contenu

- **Textes** : chaque page est un fichier HTML autonome, entièrement commenté par section (Hero, À propos, Portfolio, etc.). Modifiez directement le texte entre les balises.
- **Couleurs / polices** : tout est centralisé dans `style.css`, section `1. VARIABLES & RESET` (`:root { ... }`). Changez une variable, tout le site s'adapte.
- **Ajouter une fiche recherchable** (monde, pays, personnage, faction...) : ajoutez une ligne dans le tableau `SEARCH_INDEX` de `config.js`.
- **Images** : le site n'utilise volontairement aucune image (photo, artwork...) — tout le visuel repose sur des icônes SVG et des textures décoratives en CSS.

## 3. Contact — comment ça marche

La page `contact.html` n'a plus de formulaire : elle affiche directement l'adresse e-mail, comme pour Discord et Instagram, sous forme de lien cliquable (`mailto:`) qui ouvre l'application mail du visiteur.

**L'adresse e-mail n'est jamais écrite en dur dans le HTML.** Elle provient uniquement de `config.js` :

```js
const CONFIG = {
  email: "contact@monsite.fr",
  ...
};
```

Changez cette valeur et le lien e-mail se met à jour automatiquement sur toute la page Contact.

## 4. Publier sur GitHub Pages

1. Créez un dépôt GitHub et poussez l'intégralité de ce dossier à la racine du dépôt.
2. Dans les paramètres du dépôt → *Pages* → *Source*, sélectionnez la branche `main` et le dossier `/ (root)`.
3. Votre site sera disponible à `https://votre-pseudo.github.io/nom-du-depot/`.

Aucune configuration serveur n'est nécessaire : le site est 100% statique.

## 5. Fonctionnalités incluses

- Fond animé (étoiles scintillantes, brume, carte ancienne, texture parchemin, vignette)
- Loader animé, curseur personnalisé, bouton retour en haut
- Header transparent devenant opaque au scroll + menu mobile premium
- Animations : fade-in, scroll reveal, parallax léger, effets de survol dorés/cyan
- Barre de recherche globale (raccourci `Ctrl/Cmd + K`)
- Filtres par catégorie (portfolio, personnages) avec JavaScript pur
- Fiches détaillées à onglets (monde, personnage)
- Schéma interactif d'alliances en SVG
- Page Contact avec e-mail, Discord et Instagram affichés directement (lien mailto cliquable)
- Site entièrement responsive (desktop / tablette / mobile) et accessible (focus clavier visible, `prefers-reduced-motion` respecté)

## 6. Technologies

HTML5, CSS3 (variables custom, aucun framework), JavaScript Vanilla. Polices Google Fonts : **Cinzel** (titres), **Cormorant Garamond** (texte), **MedievalSharp** (accents).

---

© 2025 VerseBuilder — World Builder
