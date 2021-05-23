const colors = ["#1abc9c", "#3498db", "#9b59b6", "#f39c12", "#e74c3c"];
// <⚠️ /DONT DELETE THIS ⚠️>

/*
✅ The text of the title should change when the mouse is on top of it.
✅ The text of the title should change when the mouse is leaves it.
✅ When the window is resized the title should change.
✅ On right click the title should also change.
✅ The colors of the title should come from a color from the colors array.
✅ DO NOT CHANGE .css, or .html files.
✅ ALL function handlers should be INSIDE of "superEventHandler"
*/
const titleStatus = document.querySelector("h2");

const superEventHandler = {
  mouseOver: function () {
    titleStatus.innerHTML = "The mouse is here!";
    titleStatus.style.color = colors[0];
  },
  mouseLeave: function () {
    titleStatus.innerHTML = "The mouse is gone!";
    titleStatus.style.color = colors[1];
  },
  mouseResize: function () {
    titleStatus.innerHTML = "You just resized!";
    titleStatus.style.color = colors[2];
  },
  mouseRight: function () {
    titleStatus.innerHTML = "That was a right click!";
    titleStatus.style.color = colors[3];
  },
};

function init() {
  titleStatus.style.position = "absolute";
  titleStatus.style.backgroundColor = "red";
  titleStatus.addEventListener("mouseover", superEventHandler.mouseOver);
  titleStatus.addEventListener("mouseleave", superEventHandler.mouseLeave);
  window.addEventListener("resize", superEventHandler.mouseResize);
  window.addEventListener("contextmenu", superEventHandler.mouseRight);
}

init();
