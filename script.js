
const weddingDate = new Date("2026-09-13T10:00:00+05:30").getTime();

function openInvitation(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const intro = document.getElementById("intro");
  if (intro) intro.classList.add("hide");

  setTimeout(() => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 250);
}

const openBtn = document.getElementById("openBtn");
if (openBtn) {
  ["click", "touchend", "pointerup"].forEach(evt => {
    openBtn.addEventListener(evt, openInvitation, { passive: false });
  });
}

function updateCountdown() {
  const diff = weddingDate - Date.now();

  if (diff <= 0) {
    days.textContent = 0;
    hours.textContent = 0;
    minutes.textContent = 0;
    seconds.textContent = 0;
    return;
  }

  days.textContent = Math.floor(diff / 86400000);
  hours.textContent = Math.floor((diff % 86400000) / 3600000);
  minutes.textContent = Math.floor((diff % 3600000) / 60000);
  seconds.textContent = Math.floor((diff % 60000) / 1000);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const foil = document.getElementById("foilCard");
if (foil) {
  ["click", "touchend", "pointerup"].forEach(evt => {
    foil.addEventListener(evt, revealDate, { passive: false });
  });
}

let revealed = false;

function revealDate(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  if (revealed) return;
  revealed = true;

  foil.classList.add("revealed");
  launchPieces();
}

function launchPieces() {
  const types = ["gold", "gold", "star"];
  for (let i = 0; i < 150; i++) {
    setTimeout(() => {
      const p = document.createElement("div");
      const t = types[Math.floor(Math.random() * types.length)];
      p.className = "lux-piece " + t;

      if (t === "star") {
        p.textContent = Math.random() > .5 ? "✦" : "✧";
      }

      p.style.left = Math.random() * 100 + "vw";
      p.style.animationDuration = (4.8 + Math.random() * 3.8) + "s";
      p.style.setProperty("--drift", (-90 + Math.random() * 180) + "px");

      document.body.appendChild(p);
      setTimeout(() => p.remove(), 9000);
    }, i * 20);
  }
}
