const id = 1;
//let planet = {};
//let characters = [];
//let films = [];

let planetNameH1;
let climateSpan;
let diameterSpan;
let populationSpan;
let filmsDiv;
let planetDiv;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  planetNameH1 = document.querySelector("h1#planetName");
  climateSpan = document.querySelector("span#climate");
  populationSpan = document.querySelector("span#population");
  diameterSpan = document.querySelector("span#diameter");
  charactersUl = document.querySelector("#characters>ul");
  filmsUl = document.querySelector("#films>ul");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getPlanet(id);
});

async function getPlanet(id) {
  let planet = {};

  try {
    planet = await fetchPlanet(id);
    planet.characters = await fetchCharactersFromPlanet(id);
    planet.films = await fetchFilmsFromPlanet(id);
  } catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  console.log(planet);
  renderPlanet(planet);
}

async function fetchPlanet(id) {
  let url = `https://swapi2.azurewebsites.net/api/planets/${id}`;

  return await fetch(url).then((res) => res.json());
}

async function fetchCharactersFromPlanet(id) {
  let url = `https://swapi2.azurewebsites.net/api/planets/${id}/characters`;
  const characters = await fetch(url).then((res) => res.json());
  return characters;
}

async function fetchFilmsFromPlanet(id) {
  let url = `https://swapi2.azurewebsites.net/api/planets/${id}/films`;
  const films = await fetch(url).then((res) => res.json());

  return films;
}

const renderPlanet = (planet) => {
  document.title = `SWAPI - ${planet?.name}`; // Just to make the browser tab say their name
  planetNameH1.textContent = planet?.name;
  climateSpan.textContent = planet?.climate;
  diameterSpan.textContent = planet?.diameter;
  populationSpan.textContent = planet?.population;

  const characterList = planet?.characters?.map(
    (character) =>
      `<li><a href="/film.html?id=${character.id}">${character.name}</li>`
  );
  charactersUl.innerHTML = characterList.join("");

  const filmsList = planet?.films?.map(
    (film) => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`
  );
  filmsUl.innerHTML = filmsList.join("");
};

//getPlanet();
//getCharactersFromPlanet();
//getFilmsFromPlanet();
