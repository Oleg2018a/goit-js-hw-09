import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';
// Notify.init({
//   width: '500px',
//   position: 'right-bottom', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
//   distance: '10px',
//   opacity: 1,
//   borderRadius: '5px',
//   rtl: false,
//   timeout: 3000,
//   messageMaxLength: 110,
//   backOverlay: false,
//   backOverlayColor: 'rgba(0,0,0,0.5)',
//   plainText: true,
//   showOnlyTheLastOne: false,
//   clickToClose: false,
//   pauseOnHover: true,

//   ID: 'NotiflixNotify',
//   className: 'notiflix-notify',
//   zindex: 4001,
//   fontFamily: 'Quicksand',
//   fontSize: '13px',
//   cssAnimation: true,
//   cssAnimationDuration: 400,
//   cssAnimationStyle: 'fade', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
//   closeButton: false,
//   useIcon: true,
//   useFontAwesome: false,
//   fontAwesomeIconStyle: 'basic', // 'basic' - 'shadow'
//   fontAwesomeIconSize: '34px',

//   success: {
//     background: '#32c682',
//     textColor: '#fff',
//     childClassName: 'notiflix-notify-success',
//     notiflixIconColor: 'rgba(0,0,0,0.2)',
//     fontAwesomeClassName: 'fas fa-check-circle',
//     fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
//     backOverlayColor: 'rgba(50,198,130,0.2)',
//   },

//   failure: {
//     background: '#ff5546',
//     textColor: '#000',
//     childClassName: 'notiflix-notify-failure',
//     notiflixIconColor: 'rgba(0,0,0,0.2)',
//     fontAwesomeClassName: 'fas fa-times-circle',
//     fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
//     backOverlayColor: 'rgba(255,85,73,0.2)',
//   },

//   warning: {
//     background: '#eebf31',
//     textColor: '#fff',
//     childClassName: 'notiflix-notify-warning',
//     notiflixIconColor: 'rgba(0,0,0,0.2)',
//     fontAwesomeClassName: 'fas fa-exclamation-circle',
//     fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
//     backOverlayColor: 'rgba(238,191,49,0.2)',
//   },

//   info: {
//     background: '#26c0d3',
//     textColor: '#fff',
//     childClassName: 'notiflix-notify-info',
//     notiflixIconColor: 'rgba(0,0,0,0.2)',
//     fontAwesomeClassName: 'fas fa-info-circle',
//     fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
//     backOverlayColor: 'rgba(38,192,211,0.2)',
//   },
// });
const inputEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysElem = document.querySelector('span[data-days]');
const hoursElem = document.querySelector('span[data-hours]');
const minutesElem = document.querySelector('span[data-minutes]');
const secondsElem = document.querySelector('span[data-seconds]');
let timerId = null;

btnStart.addEventListener('click', onStartClick);

btnStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
    }
  },
};

const datePicker = flatpickr('#datetime-picker', options);

function onStartClick() {
  btnStart.disabled = true;
  inputEl.disabled = true;
  timerId = setInterval(() => {
    const timeDifference = datePicker.selectedDates[0].getTime() - Date.now();
    const remainingTime = convertMs(timeDifference);

    daysElem.textContent = addLeadingZero(remainingTime.days);
    hoursElem.textContent = addLeadingZero(remainingTime.hours);
    minutesElem.textContent = addLeadingZero(remainingTime.minutes);
    secondsElem.textContent = addLeadingZero(remainingTime.seconds);
    if (timeDifference < 1000) {
      clearInterval(timerId);
      inputEl.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
