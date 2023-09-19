export default getDate;


function getDate(resource) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
      if (request.readyState < 4) {
        loaderToggle(true);
      } else if (request.readyState == 4 && request.status == 200) {
        const data = JSON.parse(request.responseText);
        resolve(data.data);
        loaderToggle(false);
      } else if (request.readyState == 4) {
        reject("Error!!!");
        loaderToggle(false);
      }
    });
    request.open("get", resource);
    request.send();
  });
}
// LOADER;
const overlay = document.getElementById("overlay");

const loaderToggle = (toggle) => {
  if (toggle) {
    overlay.classList.toggle("hidden");
  } else {
    overlay.classList.toggle("hidden");
  }
};
