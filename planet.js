const id = 1;
let planet = {};
let characters = [];
let films = [];

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

  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getPlanet(id);
});

async function getPlanet(id) {
  let url = `https://swapi2.azurewebsites.net/api/planets/${id}`;

  try {
    const fetchedPlanet = await fetch(url).then((res) => res.json());
    //console.log(fetchedPlanets)
    planet = fetchedPlanet;
  } catch (ex) {
    console.error("Error reading planets.", ex.message);
  }
  console.log("The planet is: ", planet);
  console.log(planet?.diameter);
  renderPlanet(planet);
}

async function getCharactersFromPlanet() {
  let url = `https://swapi2.azurewebsites.net/api/planets/${id}/characters`;

  try {
    const fetchedCharacters = await fetch(url).then((res) => res.json());
    characters.push(...fetchedCharacters);
  } catch (ex) {
    console.error("Error reading characters from planet.", ex.message);
  }
  console.log("The characters from that planet are: ", characters);
}

async function getFilmsFromPlanet() {
  let url = `https://swapi2.azurewebsites.net/api/planets/${id}/films`;

  try {
    const fetchedFilms = await fetch(url).then((res) => res.json());
    films.push(...fetchedFilms);
  } catch (ex) {
    console.error("Error reading films from planet.", ex.message);
  }
  console.log("The films from that planet are: ", films);
}

const renderPlanet = (planet) => {
  document.title = `SWAPI - ${planet?.name}`; // Just to make the browser tab say their name
  planetNameH1.textContent = planet?.name;
  climateSpan.textContent = planet?.climate;
  diameterSpan.textContent = planet?.diameter;
  populationSpan.textContent = planet?.population;
};

//getPlanet();
//getCharactersFromPlanet();
//getFilmsFromPlanet();
