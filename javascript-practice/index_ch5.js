// You're gonna need this
const clock = document.querySelector(".js-clock");

function getTime() {
  // Don't delete this.
  const xmasDay = new Date("2021-11-18:00:00:00+0900");

  const nowDay = new Date();
  const dDayTime = xmasDay.getTime() - nowDay.getTime();

  const dDayTimeDate = Math.floor(dDayTime / (1000 * 60 * 60 * 24));
  const dDayTimeHours = 23 - nowDay.getHours();
  const dDayTimeMinutes = 59 - nowDay.getMinutes();
  const dDayTimeSeconds = 59 - nowDay.getSeconds();

  clock.innerText = `${dDayTimeDate}d ${
    dDayTimeHours < 10 ? `0${dDayTimeHours}` : dDayTimeHours
  }h ${dDayTimeMinutes < 10 ? `0${dDayTimeMinutes}` : dDayTimeMinutes}m ${
    dDayTimeSeconds < 10 ? `0${dDayTimeSeconds}` : dDayTimeSeconds
  }s`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
