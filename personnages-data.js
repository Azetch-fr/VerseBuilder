/* ============================================================
   PERSONNAGES-DATA.JS
   Toutes les infos des personnages de la galerie (personnages.html).
   Pour ajouter, modifier ou supprimer un personnage, édite
   uniquement le tableau ci-dessous : la page se met à jour
   automatiquement (carte + filtre par race).

   Champs :
   - category : valeur utilisée par le filtre de race ("humain", "elfe",
                "nain" ou "autre")
   - univers  : valeur utilisée par le filtre d'univers (ex: "Le Cube").
                Ce filtre se cumule avec celui des races (les deux
                doivent correspondre pour qu'un personnage s'affiche).
                Pour ajouter un nouvel univers : mets ici le nom exact
                de l'univers, puis ajoute un bouton correspondant dans
                la barre de filtre "univers" de personnages.html
                (attribut data-filter="NomDeLUnivers").
   - tag      : petit label en haut de la carte (métier / rôle)
   - race     : race affichée dans la carte
   - nom      : nom du personnage
   - fiche    : contenu affiché dans la fenêtre "Voir la fiche".
                C'est ici qu'on écrit toute l'histoire / les
                pouvoirs / etc. du personnage. On peut utiliser
                du HTML simple : <h4>, <p>, <ul><li>...
                Rien à créer ailleurs : tout se passe dans cette
                seule variable.
   ============================================================ */

const PERSONNAGES = [
  {
    category: "Dracolier",
    univers: "Le Cube",
    race: "Dracolier",
    nom: "Orryon",
    fiche: `
      <h4>Fiche</h4>
      <p>
prénom: Orryon
<br>âge: 175
<br>espèce: Dracolier
<br>date de naissance: 9 mars

<br>Faction: Tour Noxilienne

<br>classe : Mage

<br>magie :  Démoniaque et Void

<br>arme :sceptre</p>`
  },









  {
    category: "elfe",
    univers: "Le Cube",
    race: "Elfe",
    nom: "Legolas Greenleaf",
    fiche: `
      <h4>fiche</h4>
      <p>
prénom: Legolas Greenleaf
<br>âge: 180 ans
<br>espèce: Elfe
<br>date de naissance: 18 avril 

<br>classe : Archer

<br>magie : sainte nature glacière + eau(explosion) + invocation(création) 
<br>+ bénédiction(manipulation de l'espace)

<br>arme : arc elfique  + et une longue dague blanche + arc d'ocelrat</p>`
},







  {
    category: "Ange",
    univers: "Le Cube",
    race: "Seraphin",
    nom: "Séraphina",
    fiche: `
      <h4>Fiche</h4>
      <p>
prénom Séraphina Thanatos
<br>âge 41 (20.5 ans en âge humain)
<br>espèce Seraphin
<br>date de naissance : 1er janvier 

<br>archétype : hybride: ninja et épéiste / élue primordiale de Kaito

<br>faction: Paladin

<br>magie (mana neutre) : magie sainte

<br>arme: rapière</p>`
  },








  {
    category: "elfe",
    univers: "Le Cube",
    race: "haute elfe noir déchu",
    nom: "Yimaï ",
    fiche: `
      <h4>Fiche</h4>
      <p>
prénom  : Yimaï 
<br>âge : 130 
<br>espèce : haute elfe noir déchu
<br>date de naissance : 3 décembre 7528

<br>archétype : hybride : ninja , champion , cœur angélique

<br>faction : Tour Magique

<br>magie : vent démoniaque, création angélique , overlord , feu , hérétique

<br>arme : bâton magique</p>`
  },






  {
    category: "autre",
    univers: "Le Cube",
    tag: "?",
    race: "?",
    nom: "?",
    fiche: `
      <h4>Fiche</h4>
      <p>Fiche à compléter.</p>
    `
  },






  {
    category: "humain",
    univers: "Le Cube",
    race: "Humaine",
    nom: "Ariane/Jester",
    fiche: `
      <h4>Fiche</h4>
      <p>
prénom  : Ariane 
<br>âge : ~150 000 ans
<br>espèce : humaine(imortelle)
<br>date de naissance : 2 octobre

<br>classe : Mage

<br>faction : Tour Noxilienne

<br>magie : Ténebre , Nécromancie , Création

<br>arme : Carte de Poker(52 cartes)</p>`
  }
];
