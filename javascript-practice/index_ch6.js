const select = document.querySelector("select");
const USER_LS = "country",
  SELECT_US = "selected";

function setCountryName(text) {
  for (i = 0; i < select.length; i++) {
    if (select[i].value == text) select[i].selected = true;
  }
  getCountryName();
}
function saveCountryName(event) {
  event.preventDefault();
  localStorage.setItem(USER_LS, select.value);
}
function getCountryName() {
  select.addEventListener("change", saveCountryName);
}
function init() {
  const countryUser = localStorage.getItem(USER_LS);
  if (countryUser === null) {
    getCountryName();
  } else {
    setCountryName(countryUser);
  }
}

init();


// answer
// const select = document.querySelector(".js-select");

// function handleChange() {
//   const selected = select.value;
//   localStorage.setItem("country", selected);
// }

// function loadCountries() {
//   const selected = localStorage.getItem("country");
//   if (selected) {
//     const option = document.querySelector(`option[value="${selected}"]`);
//     option.selected = true;
//   }
// }

// loadCountries();
// select.addEventListener("change", handleChange);

