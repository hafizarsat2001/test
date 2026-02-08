const API_BASE = 'https://pokeapi.co/api/v2/pokemon/';
let currentPokemonData = null;

/* ------------------ Helpers ------------------ */

function showLoading(show = true) {
  document.getElementById('loading').classList.toggle('hidden', !show);
}

function showError(message = '') {
  document.getElementById('error').textContent = message;
}

function displayPokemonCard(data, containerId = "pokemonContainer") {
  document.getElementById("parsedData").innerHTML = "";
  document.getElementById("rawJson").classList.add("hidden");

  const container = document.getElementById(containerId);
  container.innerHTML = `
    <div class="pokemon-card">
      <h2>${data.name}</h2>
      <img src="${data.sprites.front_default}" />
      <p>Height: ${data.height}</p>
      <p>Weight: ${data.weight}</p>
    </div>
  `;
}


/* ------------------ TODO 1 ------------------ */
/* Search Pokemon */
async function searchPokemon() {
  // TODO: Fetch Pokemon by name
  // TODO: Handle loading + errors
  // TODO: Save response to currentPokemonData
  const name = document.getElementById("pokemonInput").value.toLowerCase();
  if (!name) return;

  showError("");
  showLoading(true);

  try {
    const res = await fetch(API_BASE + name);
    if (!res.ok) throw new Error("Pokemon not found");

    const data = await res.json();
    currentPokemonData = data;

    displayPokemonCard(data);
  } catch (err) {
    showError(err.message);
  } finally {
    showLoading(false);
  }
}

/* ------------------ TODO 2 ------------------ */
/* Random Pokemon */
async function getRandomPokemon() {
  // TODO: Generate random ID (1–1010)
  // TODO: Fetch Pokemon
  // TODO: Display card
  const randomId = Math.floor(Math.random() * 1010) + 1;

  showError("");
  showLoading(true);

  try {
    const res = await fetch(API_BASE + randomId);
    const data = await res.json();

    currentPokemonData = data;
    displayPokemonCard(data);
  } catch {
    showError("Failed to load random Pokemon");
  } finally {
    showLoading(false);
  }
}

/* ------------------ TODO 3 ------------------ */
/* Raw JSON Display */
function showRawJson() {
  const raw = document.getElementById("rawJson");

  if (!currentPokemonData) {
    raw.textContent = "No Pokemon data available.";
  } else {
    raw.textContent = JSON.stringify(currentPokemonData, null, 2);
  }

  raw.classList.remove("hidden");
  raw.style.background = "#111";
  raw.style.color = "#0f0";
  raw.style.padding = "10px";
}


/* ------------------ TODO 4 ------------------ */
/* Parse Stats */
function parseStats() {
  // TODO: Extract base stats
  // data.stats -> [{ base_stat, stat: { name } }]
  if (!currentPokemonData) return;

  const statsHtml = currentPokemonData.stats
    .map(
      s => `<li>${s.stat.name.toUpperCase()}: ${s.base_stat}</li>`
    )
    .join("");

  document.getElementById("parsedData").innerHTML = `
    <h3>Base Stats</h3>
    <ul>${statsHtml}</ul>
  `;
}

/* ------------------ TODO 5 ------------------ */
/* Parse Moves */
function parseMoves() {
  // TODO: Extract first 10 move names
  if (!currentPokemonData) return;

  const moves = currentPokemonData.moves
    .slice(0, 10)
    .map(m => `<li>${m.move.name}</li>`)
    .join("");

  document.getElementById("parsedData").innerHTML = `
    <h3>Moves</h3>
    <ul>${moves}</ul>
  `;
}

/* ------------------ TODO 6 ------------------ */
/* Parse Types */
function parseTypes() {
  // TODO: Extract types and apply CSS classes
  if (!currentPokemonData) return;

  const types = currentPokemonData.types
    .map(
      t =>
        `<span class="type-badge type-${t.type.name}">
          ${t.type.name}
        </span>`
    )
    .join("");

  document.getElementById("parsedData").innerHTML = `
    <h3>Types</h3>
    <div>${types}</div>
  `;
}

/* ------------------ TODO 7 ------------------ */
/* Compare Pokemon */
async function comparePokemon() {
  // TODO: Use Promise.all()
  // TODO: Display side-by-side comparison
  const p1 = document.getElementById("compareOne").value.toLowerCase();
  const p2 = document.getElementById("compareTwo").value.toLowerCase();
  if (!p1 || !p2) return;

  showError("");
  showLoading(true);

  try {
    const [data1, data2] = await Promise.all([
      fetch(API_BASE + p1).then(r => r.json()),
      fetch(API_BASE + p2).then(r => r.json())
    ]);

    document.getElementById("comparisonContainer").innerHTML = `
      <div style="display:flex; gap:20px;">
        <div>${buildComparisonCard(data1)}</div>
        <div>${buildComparisonCard(data2)}</div>
      </div>
    `;
  } catch {
    showError("Comparison failed. Check Pokemon names.");
  } finally {
    showLoading(false);
  }
}

function buildComparisonCard(data) {
  const stats = data.stats
    .map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`)
    .join("");

  return `
    <div class="pokemon-card">
      <h3>${data.name}</h3>
      <img src="${data.sprites.front_default}" />
      <ul>${stats}</ul>
    </div>
  `;
}



/* ------------------ TODO 8 ------------------ */
/* Build Random Team */
async function buildRandomTeam() {
  // TODO: Generate 3 unique IDs
  // TODO: Fetch concurrently
  // TODO: Display team cards
  const ids = new Set();
  while (ids.size < 3) {
    ids.add(Math.floor(Math.random() * 1010) + 1);
  }

  showError("");
  showLoading(true);

  try {
    const teamData = await Promise.all(
      [...ids].map(id =>
        fetch(API_BASE + id).then(r => r.json())
      )
    );

    document.getElementById("teamContainer").innerHTML = teamData
      .map(
        p => `
        <div class="pokemon-card">
          <h3>${p.name}</h3>
          <img src="${p.sprites.front_default}" />
          <div>
            ${p.types
              .map(
                t =>
                  `<span class="type-badge type-${t.type.name}">
                    ${t.type.name}
                  </span>`
              )
              .join("")}
          </div>
        </div>
      `
      )
      .join("");
  } catch {
    showError("Failed to build team");
  } finally {
    showLoading(false);
  }
}

