const start = document.querySelector('.btn-start');
const stopElem = document.querySelector('.btn-stop');
let timerId = null;

stopElem.disabled = true;
start.addEventListener('click', onStart);
stopElem.addEventListener('click', onStop);

function onStart() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  start.disabled = true;
  stopElem.disabled = false;
}

function onStop() {
  clearInterval(timerId);
  start.disabled = false;
  stopElem.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
