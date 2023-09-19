const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString).get("slug");
const API = `https://countries-api-v7sn.onrender.com/countries/slug/${urlParams}`;
async function getAboutDate(url) {
  if (url) {
    const request = await fetch(url);
    if (!request.ok) {
      throw new Error("Something went wrong :(");
    }
    const data = await request.json();
    return data;
  } else {
    throw new Error("Wrong URL :(");
  }
}
getAboutDate(API)
  .then((data) => aboutUpdateUI(data))
  .catch((err) => console.log(err, "Something went wrong"));

function aboutUpdateUI(country) {
  const flagLink = country.flags.svg;
  const flagAlt = country.flags.alt;
  const aboutImg = document.getElementById("about-img__link");
  aboutImg.setAttribute("src", flagLink);
  aboutImg.setAttribute("alt", flagAlt);
  const countryName = country.name.common;
  const aboutCountName = document.querySelector(".about-country__name");
  aboutCountName.textContent = countryName;

  const nativeName = country.name.nativeName;
  const population = String(country.population).replace(
    /(.)(?=(\d{3})+$)/g,
    "$1,"
  );
  const region = country.region;
  const subRegion = country.subregion;
  const capital = country.capital;
  const topLevel = ".be";
  const currencies = country.currencies;
  const language = country.languages;

  const arr = [
    nativeName,
    population,
    region,
    subRegion,
    capital,
    topLevel,
    currencies,
    language,
  ];
  for (let i = 1; i < 9; i++) {
    const element = document.getElementById(`span${i}`);
    element.textContent = arr[i - 1];
  }

  const border = country.borders;
  for (let key in border) {
    const borderDiv = document.getElementById("border-div");

    const borderA = document.createElement("a");
    borderA.classList.add("btn-style");
    borderA.setAttribute("href", `./about.html?slug=${border[key].slug}`);
    borderA.textContent = border[key].common;
    borderDiv.appendChild(borderA);
  }
}

