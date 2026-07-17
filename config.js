/* ============================================================
   CONFIG.JS
   Fichier de configuration central du site.
   Modifie les valeurs ci-dessous : tout le site s'adapte
   automatiquement (formulaire de contact, liens sociaux, etc.)
   ============================================================ */

const CONFIG = {

  // Adresse e-mail affichée sur la page Contact (lien "M'écrire directement").
  // Change uniquement cette valeur : elle est utilisée partout sur le site.
  email: "q.djferreira@gmail.com",

  // Réseaux sociaux / contacts (affichés sur la page Contact et le footer)
  social: {
    discord: "azetch",
    instagram: "https://www.instagram.com/azetch.0508?igsh=ZnhheGpvbmZncXBk"
  },

  // Nom affiché du World Builder
  author: "VerseBuilder"

};

/* ============================================================
   SEARCH_INDEX
   Index utilisé par la barre de recherche globale (voir script.js).
   Ajoute une ligne ici à chaque nouvelle fiche (monde, pays,
   personnage, faction, alliance)
   pour qu'elle devienne trouvable depuis n'importe quelle page.
   "url" est toujours relatif à la racine du site (commence par /).
   ============================================================ */
const SEARCH_INDEX = [
  { title: "Le Cube", category: "Monde", url: "monde.html", keywords: "monde principal royaumes primordiaux secondaires mortels" },
  { title: "Royaumes Primordiaux", category: "Pays", url: "pays.html#royaumes-primordiaux", keywords: "avaloria naphre bubïo spad" },
  { title: "Royaumes Secondaires", category: "Pays", url: "pays.html#royaumes-secondaires", keywords: "narabe celestia cristalia ténérise thealand doomletter assya lithium draconia astrologia" },
  { title: "Royaumes Mortels", category: "Pays", url: "pays.html#royaumes-mortels", keywords: "neptunia yru coraillon edgar trilopty zãpãnã yzraïl gnardland infernia gaïland fôresria antrika" },
  { title: "Monnaie commune (teph, glyphen, glyphe)", category: "Pays", url: "pays.html#economie", keywords: "argent économie prix teph glyphen glyphe spad" },
  { title: "Sareth Vaelin", category: "Personnage", url: "personnages.html", keywords: "assassin lame d'argent espion" },
  { title: "Tour Magique", category: "Faction", url: "factions.html", keywords: "mages traditionnels magie avancée" },
  { title: "Sorcier Naphrein", category: "Faction", url: "factions.html", keywords: "mages sorciers naphre" },
  { title: "Paladin", category: "Faction", url: "factions.html", keywords: "prêtre prêtresse dieu marque divine magie sainte" }
];
