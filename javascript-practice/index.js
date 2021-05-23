const generateNum = document.querySelector(".js-generateNum"),
  generateHeadLine = generateNum.querySelector("h2"),
  generateValue = generateNum.querySelector("input");

const guessNum = document.querySelector(".js-guessNum"),
  guessNumForm = guessNum.querySelector(".js-form"),
  guessNumInput = guessNumForm.querySelector(".js-input");

const result = document.querySelector(".js-result"),
  resultYouChose = result.querySelector(".js-resultYouChose"),
  resultMachineChose = result.querySelector(".js-resultMachhineChose"),
  resultCompete = result.querySelector(".js-resultCompete");

const USER_LS = "max-value",
  NOSHOW_CN = "no-show";

function compareWithMachine(e) {
  const currentValue = JSON.parse(localStorage.getItem(USER_LS));
  const randomValue = Math.floor(Math.random() * currentValue) + 1;

  resultMachineChose.innerHTML = randomValue;
  resultCompete.innerHTML = "You Lost!";
  if (JSON.parse(guessNumInput.value) === randomValue) {
    resultCompete.innerHTML = "You Win!";
  }
}

function guessNumber(e) {
  e.preventDefault();
  resultYouChose.innerHTML = guessNumInput.value;
  result.classList.remove(NOSHOW_CN);
  if (guessNumInput.value !== "") compareWithMachine(e);
}
function changeMaxValue() {
  const value = generateValue.value;
  generateHeadLine.innerHTML = `Generate a number between 0 and ${value}`;
  localStorage.setItem(USER_LS, value);
}

function loadValue() {
  const currentValue = localStorage.getItem(USER_LS) || 10;
  generateHeadLine.innerHTML = `Generate a number between 0 and ${currentValue}`;
  generateValue.value = currentValue;
  guessNumInput.max = currentValue;
}
function init() {
  loadValue();
  generateValue.addEventListener("input", changeMaxValue);
  guessNumForm.addEventListener("submit", guessNumber);
}
init();
