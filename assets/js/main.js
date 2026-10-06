const EPISODES = [
  {
    id: "ao-ashi-s02e01",
    titre: "Ao Ashi",
    saison: 2,
    episode: 1,
    description:
      "Ashito Aoi intègre l’équipe A de la Tokyo City Esperion. Entouré de joueurs d’élite, il découvre un rythme et une exigence tactique qui le forcent à progresser s’il veut rester dans le groupe.",
    image: "assets/img/ao-ashi.jpg",
    imageAlt: "Affiche d’Ao Ashi saison 2",
    fichier: "assets/video/ao-ashi-s02e01.mp4",
    taille: "75,3 Mo",
    langue: "VOSTFR",
    resolution: "360p",
    genre: "Sport",
    plateforme: "Crunchyroll",
    ajoute: "2026-10-04",
    sortie: "4 octobre 2026",
    studio: "TMS Entertainment",
  },
  {
    id: "black-clover-s02e01",
    titre: "Black Clover",
    saison: 2,
    episode: 1,
    description:
      "Asta, lié au diable Liebe, reprend l’entraînement avec les Taureaux Noirs. Alors que le royaume de Clover se relève, la route vers le titre d’Empereur-Mage s’ouvre sur de nouvelles épreuves aux côtés de Yuno.",
    image: "assets/img/black-clover.jpg",
    imageAlt: "Affiche de Black Clover saison 2",
    fichier: "assets/video/black-clover-s02e01.mp4",
    taille: "179 Mo",
    langue: "VOSTFR",
    resolution: "480p",
    genre: "Fantasy",
    plateforme: "Crunchyroll",
    ajoute: "2026-10-04",
    sortie: "3 octobre 2026",
    studio: "Studio Pierrot",
  },
  {
    id: "tokyo-revengers-s04e01",
    titre: "Tokyo Revengers",
    arc: "Guerre des Trois Titans",
    saison: 4,
    episode: 1,
    description:
      "Après la dissolution du Tokyo Manji Gang, trois factions se disputent le contrôle de la ville. Takemichi Hanagaki repart dans le passé pour affronter la Guerre des Trois Titans et sauver ceux qui lui restent.",
    image: "assets/img/tokyo-revengers.jpg",
    imageAlt: "Affiche de Tokyo Revengers — Guerre des Trois Titans",
    fichier: "assets/video/tokyo-revengers-s04e01.mp4",
    taille: "62,5 Mo",
    langue: "VF",
    resolution: "480p",
    genre: "Action",
    plateforme: "Disney+",
    ajoute: "2026-10-06",
    sortie: "2 octobre 2026",
    studio: "Liden Films",
  },
];

const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

/** Sur GitHub Pages, les MP4 LFS ne sont pas servis : on utilise le CDN média GitHub. */
function resolveMediaUrl(path) {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.replace(/^\.\//, "").replace(/^\//, "");
  if (location.hostname.endsWith("github.io")) {
    return `https://media.githubusercontent.com/media/BROU01/streamvault/main/${clean}`;
  }
  return clean;
}

function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MOIS[m - 1]} ${y}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function episodeLabel(anime) {
  const base = `Saison ${anime.saison}, épisode ${anime.episode}`;
  return anime.arc ? `${base} · ${anime.arc}` : base;
}

function episodeCard(anime, featuredId) {
  const nomTelechargement = `${slugify(anime.titre)}-s${String(anime.saison).padStart(2, "0")}e${String(anime.episode).padStart(2, "0")}.mp4`;
  const featured = anime.id === featuredId;
  const mediaUrl = resolveMediaUrl(anime.fichier);

  return `
  <article class="episode-card${featured ? " featured" : ""}">
    ${featured ? '<p class="badge-recent">Sortie la plus récente</p>' : ""}
    <div class="poster-frame">
      <img
        src="${anime.image}"
        alt="${escapeHtml(anime.imageAlt)}"
        width="400"
        height="600"
        loading="lazy"
        decoding="async"
      >
    </div>
    <div class="card-body">
      <p class="card-sub">${escapeHtml(episodeLabel(anime))}</p>
      <h3 class="card-title">${escapeHtml(anime.titre)}</h3>
      <p class="card-desc">${escapeHtml(anime.description)}</p>
      <ul class="card-meta">
        <li>${escapeHtml(anime.langue)}</li>
        <li>${escapeHtml(anime.resolution)}</li>
        <li>${escapeHtml(anime.taille)}</li>
        <li>${escapeHtml(anime.genre)}</li>
      </ul>
      <p class="card-studio">${escapeHtml(anime.studio)} · ${escapeHtml(anime.plateforme)}</p>
    </div>
    <div class="card-footer">
      <p class="card-added">Ajouté le ${formatDate(anime.ajoute)} · Sortie le ${escapeHtml(anime.sortie)}</p>
      <div class="card-actions">
        <button
          type="button"
          class="btn"
          data-watch
          data-src="${escapeHtml(mediaUrl)}"
          data-title="${escapeHtml(anime.titre)} — S${anime.saison}E${anime.episode}"
          aria-label="Regarder ${escapeHtml(anime.titre)}, saison ${anime.saison}, épisode ${anime.episode}"
        >
          Regarder
        </button>
        <a
          class="btn btn-secondary"
          href="${escapeHtml(mediaUrl)}"
          download="${nomTelechargement}"
          aria-label="Télécharger ${escapeHtml(anime.titre)}, saison ${anime.saison}, épisode ${anime.episode}"
        >
          Télécharger
        </a>
      </div>
    </div>
  </article>`;
}

function sortByReleaseDesc(a, b) {
  return b.ajoute.localeCompare(a.ajoute) || b.sortie.localeCompare(a.sortie);
}

const sorted = [...EPISODES].sort(sortByReleaseDesc);
const featuredId = "ao-ashi-s02e01";

const grille = document.querySelector("#episode-grid");
if (grille) {
  grille.innerHTML = sorted.map((ep) => episodeCard(ep, featuredId)).join("");
}

const dialog = document.querySelector("#player-dialog");
const video = document.querySelector("#player-video");
const playerTitle = document.querySelector("#player-title");

function closePlayer() {
  if (!dialog || !video) return;
  video.pause();
  video.removeAttribute("src");
  video.load();
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
}

function openPlayer(src, title) {
  if (!dialog || !video || !playerTitle) return;
  playerTitle.textContent = title;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "true");
  video.src = src;
  video.load();

  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");

  // iOS : play() doit suivre le geste utilisateur ; si ça échoue, les contrôles natifs restent utilisables.
  const attempt = video.play();
  if (attempt && typeof attempt.catch === "function") {
    attempt.catch(() => {});
  }
}

if (grille) {
  grille.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-watch]");
    if (!trigger) return;
    event.preventDefault();
    openPlayer(trigger.dataset.src, trigger.dataset.title);
  });
}

if (dialog) {
  dialog.querySelectorAll("[data-player-close]").forEach((btn) => {
    btn.addEventListener("click", closePlayer);
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closePlayer();
  });

  dialog.addEventListener("close", () => {
    if (!video) return;
    video.pause();
    video.removeAttribute("src");
    video.load();
  });
}

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#main-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const ouvert = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(ouvert));
    navToggle.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Ouvrir le menu");
    }
  });
}
