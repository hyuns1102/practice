const h2 = document.querySelector("h2");
const body = document.querySelector("body");
function curWidth() {
  const width = window.innerWidth;
  if (width <= 400) {
    body.style.backgroundColor = "red";
  } else if (400 < width && width <= 600) {
    body.style.backgroundColor = "green";
  } else if (600 < width && width <= 800) {
    body.style.backgroundColor = "yellow";
  } else if (800 < width) {
    body.style.backgroundColor = "tomato";
  }
}

function init() {
  h2.style.color = "white";
  curWidth();
  window.addEventListener("resize", curWidth);
}

init();
