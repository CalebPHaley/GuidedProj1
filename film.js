const id = 1;

let filmNameH1;
let producerSpan;
let directorSpan;
let releaseSpan;
let detailSpan;
let filmsDiv;
let filmDiv;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  filmNameH1 = document.querySelector("h1#filmName");
  producerSpan = document.querySelector("span#producer");
  directorSpan = document.querySelector("span#director");
  releaseSpan = document.querySelector("span#release");
  detailSpan = document.querySelector("#detail");
  charactersUl = document.querySelector("#characters>ul");
  planetsUl = document.querySelector("#planets>ul");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getfilm(id);
});

async function getfilm(id) {
  let film = {};

  try {
    film = await fetchfilm(id);
    film.characters = await fetchCharactersFromfilm(id);
    film.planets = await fetchPlanetsFromfilm(id);
  } catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  console.log(film);
  renderfilm(film);
}

async function fetchfilm(id) {
  let url = `https://swapi2.azurewebsites.net/api/films/${id}`;

  result = await fetch(url).then((res) => res.json());
  //localStorage.setItem(result.id, JSON.stringify(id));
  console.log(result);
  return result;
}

async function fetchCharactersFromfilm(id) {
  let url = `https://swapi2.azurewebsites.net/api/films/${id}/characters`;
  const characters = await fetch(url).then((res) => res.json());
  return characters;
}

async function fetchPlanetsFromfilm(id) {
  let url = `https://swapi2.azurewebsites.net/api/films/${id}/planets`;
  const planets = await fetch(url).then((res) => res.json());

  return planets;
}

const renderfilm = (film) => {
  document.title = `SWAPI - ${film?.name}`; // Just to make the browser tab say their name
  filmNameH1.textContent = film?.title;
  producerSpan.textContent = film?.producer;
  directorSpan.textContent = film?.director;
  releaseSpan.textContent = film?.release_date;
  detailSpan.textContent = film?.opening_crawl;

  const characterList = film?.characters?.map(
    (character) =>
      `<li><a href="/film.html?id=${character.id}">${character.name}</li>`
  );
  charactersUl.innerHTML = characterList.join("");

  const planetsList = film?.planets?.map(
    (planets) =>
      `<li><a href="/film.html?id=${planets.id}">${planets.name}</li>`
  );
  planetsUl.innerHTML = planetsList.join("");
};

fetchfilm(1);
