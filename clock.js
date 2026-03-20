/* -------desktop clock------- */
let currentTimeString = '';

function updateDateTime() {
    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const timeStringSeconds = `${hours}:${minutes}:${seconds} ${amPm}`;
    const timeString = `${hours}:${minutes} ${amPm}`;

    const month = now.getMonth() + 1;
    const day = now.getDate();
    const year = now.getFullYear();
    const dateString = `${month}/${day}/${year}`;

    document.querySelector('.time').textContent = timeString;
    document.querySelector('.timeSeconds').textContent = timeStringSeconds;
    document.querySelectorAll('.date').forEach(el => {
            el.textContent = dateString;
    });
    
    currentTimeString = timeString;
}

updateDateTime();
setInterval(updateDateTime, 1000);

/* ------- clock window applications ------- */

/* tab selection */
const tabs = document.querySelectorAll('#clock-tabs .clock-window-tab');
const pages = document.querySelectorAll('.clock.base .clock-window-page');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-tab');

    tabs.forEach(t => t.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');

    const targetPage = document.querySelector(`.clock-window-page[data-page='${target}']`);
    if (targetPage) targetPage.classList.add('active');
  });
});

tabs[0].click();


/* analog clock */
function updateAnalogClock() {
    const now = new Date();

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondDeg = seconds * 6;
    const minuteDeg = minutes * 6 + seconds * 0.1;
    const hourDeg = (hours % 12) * 30 + minutes * 0.5;

    document.querySelector('.second').style.transform = `rotate(${secondDeg}deg)`;
    document.querySelector('.minute').style.transform = `rotate(${minuteDeg}deg)`;
    document.querySelector('.hour').style.transform = `rotate(${hourDeg}deg)`;
}

setInterval(updateAnalogClock, 1000);
updateAnalogClock();


/* alarms */
const alarms = [];

const addAlarmButton = document.getElementById('add-alarm-button');
const alarmTimeInput = document.getElementById('alarm-time');

addAlarmButton.addEventListener('click', setAlarm);

function setAlarm() {
    const alarmTime = alarmTimeInput.value;
    if (!alarmTime) {
        alert('Please select a valid time for the alarm.');
        return;
    }

    const [hourStr, minuteStr] = alarmTime.split(':');
    const tempDate = new Date();
    tempDate.setHours(hourStr, minuteStr);
    const formattedTime = tempDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    alarms.push(formattedTime);

    const listItem = document.createElement('li');
    listItem.dataset.time = formattedTime;

    const textSpan = document.createElement('span');
    textSpan.textContent = formattedTime;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-alarm-button');

    listItem.appendChild(textSpan);
    listItem.appendChild(deleteButton);
    document.getElementById('alarm-list').appendChild(listItem);
};

document.getElementById('alarm-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-alarm-button')) {
        const li = e.target.closest('li');
        const alarmTime = li.dataset.time;
        li.remove();
        alarms.splice(alarms.indexOf(alarmTime), 1);
    }
});

const alarmSound = new Audio('media/clock-assets/mixkit-alarm.wav');

function alarmRing() {
    const alarmList = document.getElementById('alarm-list');
    if (alarmList.children.length === 0) return;

    const items = Array.from(alarmList.children);
    items.forEach(li => {
        if (li.dataset.disabled === 'true') return;

        const timeText = li.dataset.time;

        if (timeText === currentTimeString) {
            if (li.classList.contains('ringing')) return;

            alarmSound.loop = true;
            alarmSound.play().catch(() => {});

            li.classList.add('ringing');

            const stopBtn = document.createElement('button');
            stopBtn.type = 'button';
            stopBtn.className = 'end-alarm-button';
            stopBtn.textContent = 'End Alarm';

            stopBtn.addEventListener('click', () => {
                li.classList.remove('ringing');
                li.dataset.disabled = 'true';
                alarmSound.pause();
                stopBtn.remove();
            });

            li.appendChild(stopBtn);
        }
    });
}

setInterval(alarmRing, 1000);

/* stopwatch */
let swStartTime = null;
let swElapsed = 0;
let swInterval = null;
let swRunning = false;

function formatStopwatch(ms) {
    const miliseconds = Math.floor(ms % 1000) / 100;
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 60000) % 60);
    const hours = Math.floor(ms / 3600000);

    const ss = String(seconds).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const hh = String(hours).padStart(2, '0');

    return `${hh}:${mm}:${ss}.${miliseconds}`;
}

function swTick() {
    const now = Date.now();
    const total = swElapsed + (now - swStartTime);
    document.getElementById('stopwatch-display').textContent = formatStopwatch(total);
}

document.getElementById('stopwatch-start').addEventListener('click', () => {
    if (swRunning) return;
    swStartTime = Date.now();
    swRunning   = true;
    swInterval  = setInterval(swTick, 100);
});

document.getElementById('stopwatch-pause').addEventListener('click', () => {
    if (!swRunning) return;
    swElapsed  += Date.now() - swStartTime;  // save elapsed before stopping
    clearInterval(swInterval);
    swRunning   = false;
});

document.getElementById('stopwatch-reset').addEventListener('click', () => {
    clearInterval(swInterval);
    swRunning  = false;
    swElapsed  = 0;
    swStartTime = null;
    document.getElementById('stopwatch-display').textContent = '00:00:00.0';
    document.getElementById('lap-list').innerHTML = '';
});

document.getElementById('stopwatch-lap').addEventListener('click', () => {
    if (!swRunning) return;
    const now = Date.now();
    const total = swElapsed + (now - swStartTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = formatStopwatch(total);
    document.getElementById('lap-list').appendChild(lapItem);
});

