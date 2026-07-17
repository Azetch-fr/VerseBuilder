/* ================================================================
   SCRIPT.JS — Azetch, World Builder
   Toutes les interactions du site : fond animé, header, navigation
   mobile, révélations au scroll, filtres, onglets,
   recherche globale, formulaire de contact, curseur personnalisé.
   Chaque bloc vérifie l'existence de ses éléments avant de s'exécuter,
   ce qui permet d'inclure ce fichier unique sur toutes les pages.
   ================================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------------------------------------
     0. Détection du chemin racine (index vs /pages/*)
     Permet de construire des URL correctes pour la recherche.
  ------------------------------------------------------------ */
  const ROOT = document.body.dataset.root || "";

  /* ------------------------------------------------------------
     1. LOADER
  ------------------------------------------------------------ */
  const loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("loader-hidden"), 500);
    });
    // Filet de sécurité si "load" tarde trop
    setTimeout(() => loader.classList.add("loader-hidden"), 2500);
  }

  /* ------------------------------------------------------------
     2. CURSEUR PERSONNALISÉ
  ------------------------------------------------------------ */
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (dot && ring && matchMedia("(hover: hover)").matches) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });
    (function animateRing() {
      if (!document.hidden) {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.left = ringX + "px";
        ring.style.top = ringY + "px";
      }
      requestAnimationFrame(animateRing);
    })();
    document.querySelectorAll("a, button, .card, input, textarea, .filter-btn")
      .forEach(el => {
        el.addEventListener("mouseenter", () => ring.classList.add("is-active"));
        el.addEventListener("mouseleave", () => ring.classList.remove("is-active"));
      });
  }

  /* ------------------------------------------------------------
     3. HEADER AU SCROLL (+ PARALLAX HERO, RETOUR EN HAUT plus bas)
     Les 3 anciens listeners "scroll" séparés (header, parallax,
     backToTop) tournaient chacun sur CHAQUE event de scroll natif
     (qui peut se déclencher des dizaines de fois par seconde),
     avec 3 lectures de window.scrollY + 3 écritures de style/classe
     à chaque fois : c'est la cause principale du lag au scroll.
     On les fusionne en un seul listener, batché avec
     requestAnimationFrame (max 1 mise à jour par frame, jamais plus
     d'une fois toutes les ~16ms peu importe le nombre d'events).
  ------------------------------------------------------------ */
  const header = document.querySelector(".site-header");
  const heroBgEl = document.querySelector(".hero-bg");
  const backToTopEl = document.getElementById("backToTop");

  let scrollTicking = false;
  const runScrollUpdates = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 40);
    if (backToTopEl) backToTopEl.classList.toggle("show", y > 500);
    if (heroBgEl && y < window.innerHeight) {
      heroBgEl.style.transform = `translateY(${y * 0.25}px)`;
    }
    scrollTicking = false;
  };
  const onScroll = () => {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(runScrollUpdates);
    }
  };
  if (header || heroBgEl || backToTopEl) {
    runScrollUpdates();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("is-open");
      mainNav.classList.toggle("mobile-open");
      document.body.style.overflow = mainNav.classList.contains("mobile-open") ? "hidden" : "";
    });
    mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      navToggle.classList.remove("is-open");
      mainNav.classList.remove("mobile-open");
      document.body.style.overflow = "";
    }));
  }

  /* ------------------------------------------------------------
     3bis. GALERIE DE PERSONNAGES (rendu depuis personnages-data.js)
     Construit les cartes de la page personnages.html à partir du
     tableau PERSONNAGES. Placé avant le bloc "SCROLL REVEAL" pour
     que les cartes générées profitent aussi de l'animation.
  ------------------------------------------------------------ */
  const charGrid = document.getElementById("personnagesGrid");
  if (charGrid && typeof PERSONNAGES !== "undefined") {
    charGrid.innerHTML = PERSONNAGES.map((p, i) => {
      const delay = i % 3 === 1 ? " reveal-delay-1" : i % 3 === 2 ? " reveal-delay-2" : "";
      return `
        <article class="card char-item reveal${delay}" data-category="${p.category}" data-univers="${p.univers || ''}">
          <div class="card-body">
            <div class="card-meta"><span>${p.race}</span></div>
            <h3>${p.nom}</h3>
            <button type="button" class="card-link fiche-trigger" data-index="${i}">Voir la fiche</button>
          </div>
        </article>`;
    }).join("");
  }

  /* ------------------------------------------------------------
     3ter. FICHE PERSONNAGE (fenêtre affichant PERSONNAGES[i].fiche)
  ------------------------------------------------------------ */
  const ficheOverlay = document.getElementById("ficheOverlay");
  if (ficheOverlay && typeof PERSONNAGES !== "undefined") {
    const ficheTag = document.getElementById("ficheTag");
    const ficheNom = document.getElementById("ficheNom");
    const ficheMeta = document.getElementById("ficheMeta");
    const ficheContent = document.getElementById("ficheContent");
    const ficheClose = ficheOverlay.querySelector(".fiche-close");

    const openFiche = (p) => {
      ficheTag.textContent = p.tag;
      ficheNom.textContent = p.nom;
      ficheMeta.innerHTML = `<span>${p.race}</span>${p.univers ? `<span>${p.univers}</span>` : ""}`;
      ficheContent.innerHTML = p.fiche || "<p>Fiche à venir.</p>";
      ficheOverlay.classList.add("is-open");
    };
    const closeFiche = () => ficheOverlay.classList.remove("is-open");

    document.addEventListener("click", (e) => {
      const trigger = e.target.closest(".fiche-trigger");
      if (trigger) openFiche(PERSONNAGES[Number(trigger.dataset.index)]);
    });
    ficheClose.addEventListener("click", closeFiche);
    ficheOverlay.addEventListener("click", (e) => { if (e.target === ficheOverlay) closeFiche(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeFiche(); });
  }

  /* ------------------------------------------------------------
     4. SCROLL REVEAL (IntersectionObserver)
  ------------------------------------------------------------ */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  }

  /* ------------------------------------------------------------
     5. PARALLAX HERO + 6. RETOUR EN HAUT
     (fusionnés dans le scroll handler unique ci-dessus, section 3 —
     il ne reste ici que le clic du bouton retour en haut)
  ------------------------------------------------------------ */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ------------------------------------------------------------
     7. FILTRES (portfolio, personnages)
     Chaque barre de filtre (data-filter-group) porte :
       - data-filter-attr   : l'attribut data-* de la carte à comparer
                              (ex: "category" ou "univers")
       - data-filter-target : le sélecteur des cartes concernées
                              (ex: ".char-item")
     Plusieurs barres de filtre peuvent cibler les mêmes cartes :
     dans ce cas elles se CUMULENT (logique ET) — une carte n'est
     visible que si elle correspond à TOUS les filtres actifs.
     (Compatibilité : si data-filter-attr/target sont absents, on
     retombe sur l'ancien comportement — filtre par data-category.)
  ------------------------------------------------------------ */
  const filterGroups = [];

  const applyAllFilters = () => {
    // Toutes les cartes ciblées par au moins un des groupes de filtre
    const allItems = new Set();
    filterGroups.forEach(g => document.querySelectorAll(g.targetSelector).forEach(el => allItems.add(el)));

    allItems.forEach(item => {
      const matches = filterGroups.every(g => {
        if (g.value === "all") return true;
        // Un groupe ne s'applique qu'aux cartes qu'il cible
        if (!item.matches(g.targetSelector)) return true;
        return item.dataset[g.attr] === g.value;
      });
      item.classList.toggle("hidden-item", !matches);
    });
  };

  document.querySelectorAll("[data-filter-group]").forEach(group => {
    const buttons = group.querySelectorAll(".filter-btn");
    const attr = group.dataset.filterAttr || "category";
    const targetSelector = group.dataset.filterTarget || group.dataset.filterGroup;
    const state = { attr, targetSelector, value: "all" };
    filterGroups.push(state);

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.value = btn.dataset.filter;
        applyAllFilters();
      });
    });
  });

  /* ------------------------------------------------------------
     8. ONGLETS DE FICHE (personnage / pays / faction / monde)
  ------------------------------------------------------------ */
  document.querySelectorAll("[data-tabs]").forEach(tabWrap => {
    const btns = tabWrap.querySelectorAll(".sheet-tab-btn");
    const panels = tabWrap.querySelectorAll(".sheet-tab-panel");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        btns.forEach(b => b.classList.remove("active"));
        panels.forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        const panel = tabWrap.querySelector(`[data-panel="${btn.dataset.tab}"]`);
        if (panel) panel.classList.add("active");
      });
    });
  });

  /* ------------------------------------------------------------
     10. FOND ANIMÉ — étoiles + brume (canvas)
     Optimisations perf :
     - respecte prefers-reduced-motion (un seul rendu statique, pas de boucle)
     - coupe les boucles rAF quand l'onglet n'est pas visible (document.hidden)
     - la brume est calculée à résolution réduite puis étirée en CSS
       (le fillRect plein écran par blob est l'opération la plus coûteuse
       du site : diviser la résolution par 4 divise son coût par ~4)
     - moins d'étoiles, et un throttle des repaints sur les gros écrans
  ------------------------------------------------------------ */
  const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Petit debounce générique : évite de relancer un recalcul coûteux
  // (ex. régénérer 180 étoiles) à chaque pixel pendant un redimensionnement
  // de fenêtre, qui peut déclencher l'event "resize" des dizaines de fois.
  function debounce(fn, delay) {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  initStarfield();
  initFog();

  function initStarfield() {
    const canvas = document.getElementById("starfield");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let w, h;
    let rafId = null;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      // Densité réduite (avant : w*h/9000, jusqu'à ~900 étoiles en 4K)
      // + plafond dur pour éviter l'explosion du nombre d'étoiles sur
      // les très grands écrans / écrans à forte densité de pixels.
      const count = Math.min(180, Math.floor((w * h) / 16000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.2,
        speed: Math.random() * 0.15 + 0.02,
        phase: Math.random() * Math.PI * 2
      }));
    }
    resize();
    window.addEventListener("resize", debounce(resize, 150));

    if (prefersReducedMotion) {
      // Un seul rendu fixe, pas d'animation ni de boucle rAF.
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245, 245, 240, 0.4)";
        ctx.fill();
      });
      return;
    }

    let t = 0;
    function draw() {
      if (!document.hidden) {
        ctx.clearRect(0, 0, w, h);
        t += 0.01;
        stars.forEach(s => {
          const twinkle = 0.5 + 0.5 * Math.sin(t * s.speed * 10 + s.phase);
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 245, 240, ${0.15 + twinkle * 0.55})`;
          ctx.fill();
          s.y += s.speed * 0.15;
          if (s.y > h) s.y = 0;
        });
      }
      rafId = requestAnimationFrame(draw);
    }
    rafId = requestAnimationFrame(draw);
    document.addEventListener("visibilitychange", () => {
      // Rien à faire de spécial ici : draw() se met en pause tout seul
      // via le check document.hidden, on continue juste de planifier
      // la frame suivante pour reprendre immédiatement au retour.
    });
  }

  function initFog() {
    const canvas = document.getElementById("fogCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    // Facteur de sous-échantillonnage : on dessine à 45% de la taille
    // réelle de l'écran puis on étire le canvas en CSS (width/height:100%
    // dans le CSS existant). L'effet de brume est très flou par nature,
    // la perte de netteté est invisible mais le coût de chaque fillRect
    // plein écran chute d'environ 80%.
    const SCALE = prefersReducedMotion ? 1 : 0.45;
    let w, h;
    function resize() {
      w = canvas.width = Math.round(window.innerWidth * SCALE);
      h = canvas.height = Math.round(window.innerHeight * SCALE);
    }
    resize();
    window.addEventListener("resize", debounce(resize, 150));

    const blobs = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.25 + Math.random() * 0.2,
      speed: 0.00015 + Math.random() * 0.0002,
      offset: Math.random() * 1000,
      hue: i % 2 === 0 ? "212,175,55" : "92,200,255"
    }));

    function renderFrame(time) {
      ctx.clearRect(0, 0, w, h);
      blobs.forEach(b => {
        const angle = time * b.speed + b.offset;
        const x = (b.x + Math.sin(angle) * 0.15) * w;
        const y = (b.y + Math.cos(angle * 0.8) * 0.15) * h;
        const radius = b.r * Math.max(w, h);
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, `rgba(${b.hue}, 0.06)`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });
    }

    if (prefersReducedMotion) {
      renderFrame(0);
      return;
    }

    let skipFrame = false;
    function draw(time) {
      if (!document.hidden) {
        // Un frame sur deux : le mouvement de la brume est lent, la
        // différence n'est pas perceptible mais ça divise par 2 le
        // nombre de createRadialGradient()/fillRect() par seconde,
        // l'opération la plus coûteuse du fond animé.
        skipFrame = !skipFrame;
        if (!skipFrame) renderFrame(time);
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  /* ------------------------------------------------------------
     11. RECHERCHE GLOBALE
  ------------------------------------------------------------ */
  const searchTrigger = document.querySelector(".search-trigger");
  const searchOverlay = document.getElementById("searchOverlay");
  if (searchTrigger && searchOverlay) {
    const input = searchOverlay.querySelector("input");
    const resultsBox = searchOverlay.querySelector(".search-results");
    const closeBtn = searchOverlay.querySelector(".search-close");

    const openSearch = () => {
      searchOverlay.classList.add("is-open");
      setTimeout(() => input.focus(), 200);
    };
    const closeSearch = () => searchOverlay.classList.remove("is-open");

    searchTrigger.addEventListener("click", openSearch);
    closeBtn.addEventListener("click", closeSearch);
    searchOverlay.addEventListener("click", (e) => { if (e.target === searchOverlay) closeSearch(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeSearch();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); }
    });

    function renderResults(query) {
      resultsBox.innerHTML = "";
      if (!query) return;
      const q = query.toLowerCase();
      const matches = (window.SEARCH_INDEX || []).filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.keywords || "").toLowerCase().includes(q)
      ).slice(0, 12);

      if (!matches.length) {
        resultsBox.innerHTML = `<p class="search-empty">Aucun résultat trouvé dans le Codex pour « ${query} ».</p>`;
        return;
      }
      matches.forEach(m => {
        const a = document.createElement("a");
        a.href = ROOT + m.url;
        a.className = "search-result-item";
        a.innerHTML = `<span class="cat">${m.category}</span>${m.title}`;
        resultsBox.appendChild(a);
      });
    }
    input.addEventListener("input", (e) => renderResults(e.target.value.trim()));
  }

  /* ------------------------------------------------------------
     12. CONTACT — l'adresse e-mail est affichée directement
     (voir data-config-email plus bas), plus de formulaire.
  ------------------------------------------------------------ */

  /* ------------------------------------------------------------
     13. AFFICHAGE DES INFOS DE CONTACT (issues de config.js)
  ------------------------------------------------------------ */
  document.querySelectorAll("[data-config-email]").forEach(el => {
    el.textContent = CONFIG.email;
    if (el.tagName === "A") el.setAttribute("href", `mailto:${CONFIG.email}`);
  });
  document.querySelectorAll("[data-config-discord]").forEach(el => el.textContent = CONFIG.social.discord);
  document.querySelectorAll("[data-config-instagram]").forEach(el => el.setAttribute("href", CONFIG.social.instagram));
  document.querySelectorAll("[data-config-author]").forEach(el => el.textContent = CONFIG.author);

});
