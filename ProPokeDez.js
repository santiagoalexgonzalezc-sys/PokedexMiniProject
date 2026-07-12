const go_Kanto = document.getElementById("go_Kanto");
const home_Section = document.getElementById("home_Section");
const kanto_Region_Section = document.getElementById("kanto_Region_Section");
const cardContainer = document.getElementById("Container_Of_Cards");

function capitalizeName(name) {
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : "Unknown";
}

function formatStatValue(value) {
  return value ?? "—";
}

function createPokemonMarkup(pokemon) {
  const typesMarkup = pokemon.types
    .map((type) => `<span class="type-pill">${capitalizeName(type)}</span>`)
    .join("");

  const statsMarkup = [
    ["HP", pokemon.stats.hp],
    ["Attack", pokemon.stats.attack],
    ["Defense", pokemon.stats.defense],
    ["Sp. Atk", pokemon.stats.specialAttack],
    ["Sp. Def", pokemon.stats.specialDefense],
    ["Speed", pokemon.stats.speed],
  ]
    .map(([label, value]) => `<div class="stat-card"><span>${label}</span><strong>${formatStatValue(value)}</strong></div>`)
    .join("");

  return `
    <article class="Cards">
      <button class="cardPoke" type="button" data-id="${pokemon.id}">
        <h3 class="podedex_Pokemon">#${String(pokemon.id).padStart(3, "0")}</h3>
        <img class="imagen_Pokemon" src="${pokemon.image}" alt="${pokemon.name}">
        <h2 class="nombre_Pokemon">${pokemon.name}</h2>
      </button>
      <div class="overlay-container">
        <div class="poke_Class">
          <button class="modal-close" type="button" aria-label="Close details">×</button>
          <div class="detail-panel">
            <div class="detail-header">
              <div>
                <p class="detail-id">#${String(pokemon.id).padStart(3, "0")}</p>
                <h2 class="detail-name">${pokemon.name}</h2>
                <div class="type-row">${typesMarkup}</div>
              </div>
              <img class="detail-image" src="${pokemon.image}" alt="${pokemon.name}">
            </div>
            <p class="detail-description">${pokemon.description}</p>
            <div class="details-grid">
              <div class="info-card"><span>Height</span><strong>${pokemon.height}</strong></div>
              <div class="info-card"><span>Weight</span><strong>${pokemon.weight}</strong></div>
              <div class="info-card"><span>Abilities</span><strong>${pokemon.abilities.join(", ")}</strong></div>
            </div>
            <div class="stat-list">${statsMarkup}</div>
          </div>
        </div>
      </div>
    </article>
  `;
}

function bindCardEvents() {
  document.querySelectorAll(".cardPoke").forEach((button) => {
    button.addEventListener("click", () => {
      const overlay = button.closest(".Cards").querySelector(".overlay-container");
      if (overlay) {
        overlay.classList.add("is-visible");
      }
    });
  });

  document.querySelectorAll(".modal-close").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const overlay = button.closest(".overlay-container");
      if (overlay) {
        overlay.classList.remove("is-visible");
      }
    });
  });
}

function renderCards(pokemonList) {
  if (!cardContainer) {
    return;
  }

  cardContainer.innerHTML = pokemonList.map(createPokemonMarkup).join("");
  bindCardEvents();
}

async function loadPokemonData() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const list = await response.json();

    const details = await Promise.all(
      list.results.map(async (item) => {
        const pokemonResponse = await fetch(item.url);
        const pokemon = await pokemonResponse.json();
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
        const species = await speciesResponse.json();
        const flavorText = species.flavor_text_entries.find((entry) => entry.language.name === "en")?.flavor_text.replace(/\n|\f/g, " ") || "No description available.";

        return {
          id: pokemon.id,
          name: capitalizeName(pokemon.name),
          image: pokemon.sprites.other?.["official-artwork"]?.front_default || `./Images/${pokemon.id}.png`,
          types: pokemon.types.map((entry) => entry.type.name),
          height: `${(pokemon.height / 10).toFixed(1)} m`,
          weight: `${(pokemon.weight / 10).toFixed(1)} kg`,
          abilities: pokemon.abilities.map((entry) => capitalizeName(entry.ability.name)),
          stats: {
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            specialAttack: pokemon.stats[3].base_stat,
            specialDefense: pokemon.stats[4].base_stat,
            speed: pokemon.stats[5].base_stat,
          },
          description: flavorText,
        };
      })
    );

    renderCards(details);
  } catch (error) {
    console.error("Unable to load Pokémon data", error);
    if (cardContainer) {
      cardContainer.innerHTML = '<p class="fallback-message">Unable to load Pokémon data right now.</p>';
    }
  }
}

function goToKantoFunction() {
  home_Section.style.display = "none";
  kanto_Region_Section.style.display = "flex";
}

function iniciarPagina() {
  go_Kanto?.addEventListener("click", goToKantoFunction);
  loadPokemonData();
}

window.addEventListener("click", (event) => {
  document.querySelectorAll(".overlay-container.is-visible").forEach((overlay) => {
    if (event.target === overlay) {
      overlay.classList.remove("is-visible");
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".overlay-container.is-visible").forEach((overlay) => overlay.classList.remove("is-visible"));
  }
});

window.addEventListener("load", iniciarPagina);
