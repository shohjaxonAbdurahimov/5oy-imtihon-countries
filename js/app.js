import getDate from "./request.js";
// API
const API = "https://countries-api-v7sn.onrender.com/countries?limit=8";
const firstData = [];
const DATA = [];
getDate(API)
  .then((data) => {
    pushData(data);
  })
  .catch((errror) => console.log(errror));
let key = 0;
function pushData(data) {
  data.forEach((data) => {
    firstData.push(data);
    DATA.push(data);
  });

  updateUI(firstData);
  DATA.sort((a, b) => a.population - b.population).reverse();
}
function updateUI(data) {
  const parent = document.getElementById("siteList");
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
  key += 1;

  data.forEach((country) => {
    const siteList = document.getElementById("siteList");
    const flagLink = country.flags.svg;
    const flagAlt = country.flags.alt;
    const countryName = country.name.common;
    const region = country.region;
    const capital = country.capital[0];
    const population = String(country.population).replace(
      "$1,"
    );

    const div = creatElem("div", "img-wrapper");
    const a = creatElem("a", "card-link");
    a.setAttribute("href", `./about.html?slug=${country.name.slug}`);
    const img = creatElem("img", "country-flag");
    img.setAttribute("alt", flagAlt);
    img.src = flagLink;
    a.appendChild(img);
    div.appendChild(a);
    const li = creatElem("li", "site-item");
    const h1 = creatElem("h1", "country-name", countryName);
    li.appendChild(h1);
    const div2 = creatElem("div", "card-text-wrapper");
    const p1 = creatElem("p", "card-text", "Population: ");
    const span1 = creatElem("span", "span-text", population);
    p1.appendChild(span1);
    const p2 = creatElem("p", "card-text", "Region: ");
    const span2 = creatElem("span", "span-text", region);
    span2.classList.add("sort-region");
    p2.appendChild(span2);

    const p3 = creatElem("p", "card-text", "Capital: ");
    const span3 = creatElem("span", "span-text", capital);
    p3.appendChild(span3);
    div2.append(p1, p2, p3);
    li.append(div, h1, div2);
    siteList.appendChild(li);
  });
  if (key == 4) {
    const li = document.getElementById("sort-item-pop");
    li.children[0].remove();
    const a = document.createElement("a");
    a.textContent = "Population";
    a.setAttribute("href", "./index.html");
    li.appendChild(a);
  }
}

function creatElem(...elSet) {
  const [elName, elClass, country] = elSet;
  const element = document.createElement(elName);
  elClass && element.classList.add(elClass);
  if (country) element.textContent = country;
  return element;
}
const filterBtn = document.getElementById("sortBtn");
const arr = ["Africa", "Americas", "Asia", "Europe", "Oceania", "Population"];
const sortList = document.getElementById("sort-list");
const toggleWrap = document.getElementsByClassName("toggle-wrap")[0];
let click = false;

filterBtn.addEventListener("click", () => {
  document.addEventListener("click", (e) => {
    const val = e.target.textContent;
    if (arr.includes(val)) {
      const sortName = document.querySelectorAll(".sort-region");
      if (val == arr[5]) {
        updateUI(DATA);
      }
      sortName.forEach((item) => {
        const removeEl = item.parentElement.parentElement.parentElement;
        if (item.textContent == val) {
          removeEl.classList.remove("hidden");
          click = false;
        } else {
          removeEl.classList.add("hidden");
        }
      });

      toggleWrap.style = ``;
      sortList.classList.add("hidden");
    }
  });
  sortList.classList.toggle("hidden");
  if (!click) {
    toggleWrap.style = `  transform: rotate(0deg);`;
  } else {
    toggleWrap.style = ``;
  }
  click = !click;
});

getDate(API)
  .then((data) => quizUpdate(data))
  .catch((err) => console.log(err, "Something went wrong"));

const flagLink = [];
let quiz = [];
let randomName = () => Math.floor(Math.random() * 250);

function quizUpdate(data) {
  data.forEach((el) => {
    flagLink.push(el);
  });
  const flag = JSON.stringify(flagLink);
  localStorage.setItem("flag", flag);
}

const svgRandomLink = JSON.parse(localStorage.getItem("flag"));
svgRandomLink.forEach((el) => {
  quiz.push(
    new Question(
      el.flags.svg,
      el.name.common,
      svgRandomLink[randomName()].name.common,
      svgRandomLink[randomName()].name.common
    )
  );
});
const answerA = document.getElementById("answerA");
const answerB = document.getElementById("answerB");
const answerC = document.getElementById("answerC");

const quizImg = document.getElementById("quiz-img__link");