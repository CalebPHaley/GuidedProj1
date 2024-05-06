let nameH1;
let birthYearSpan;
let heightSpan;
let massSpan;
let filmsDiv;
let planetDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  nameH1 = document.querySelector("h1#name");
  birthYearSpan = document.querySelector("span#birth_year");
  massSpan = document.querySelector("span#mass");
  heightSpan = document.querySelector("span#height");
  charactersSpan = document.querySelector("span#characters");
  filmsUl = document.querySelector("#films>ul");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getfilm(id);
});

async function getfilm(id) {
  let film;
  try {
    film = await fetchfilm(id);
    film.characters = await fetchCharacters(film);
    film.films = await fetchFilms(film);
  } catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderfilm(film);
}
async function fetchfilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl).then((res) => res.json());
}

async function fetchCharacters(film) {
  const url = `${baseUrl}/planets/${film?.characters}`;
  const planet = await fetch(url).then((res) => res.json());
  return planet;
}

async function fetchFilms(film) {
  const url = `${baseUrl}/films/${film?.id}/films`;
  const films = await fetch(url).then((res) => res.json());
  return films;
}

const renderfilm = (film) => {
  document.title = `SWAPI - ${film?.name}`; // Just to make the browser tab say their name
  nameH1.textContent = film?.name;
  heightSpan.textContent = film?.height;
  massSpan.textContent = film?.mass;
  birthYearSpan.textContent = film?.birth_year;
  charactersSpan.innerHTML = `<a href="/planet.html?id=${film?.characters.id}">${film?.characters.name}</a>`;
  const filmsLis = film?.films?.map(
    (film) => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`
  );
  filmsUl.innerHTML = filmsLis.join("");
};
