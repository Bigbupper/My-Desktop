/* -------desktop clock------- */

function updateDateTime() {
    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const timeString = `${hours}:${minutes} ${amPm}`;

    const month = now.getMonth() + 1;
    const day = now.getDate();
    const year = now.getFullYear();
    const dateString = `${month}/${day}/${year}`;

    document.querySelectorAll(".datetime").forEach(el => {
        el.querySelector(".time").textContent = timeString;
        el.querySelector(".date").textContent = dateString;
    });

    currentTimeString = timeString;
}

updateDateTime();
setInterval(updateDateTime, 1000);

/* ------- clock window applications ------- */

/* tab selection */
const tabs = document.querySelectorAll("#clock-tabs .clock-window-tab");
const pages = document.querySelectorAll(".clock.base .clock-window-page");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-tab");

    tabs.forEach(t => t.classList.remove("active"));
    pages.forEach(p => p.classList.remove("active"));

    tab.classList.add("active");

    const targetPage = document.querySelector(`.clock-window-page[data-page="${target}"]`);
    if (targetPage) targetPage.classList.add("active");
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

    document.querySelector(".second").style.transform = `rotate(${secondDeg}deg)`;
    document.querySelector(".minute").style.transform = `rotate(${minuteDeg}deg)`;
    document.querySelector(".hour").style.transform = `rotate(${hourDeg}deg)`;
}

setInterval(updateAnalogClock, 1000);
updateAnalogClock();


/* alarms */
const alarms = [];

const addAlarmButton = document.getElementById("add-alarm-button");
const alarmTimeInput = document.getElementById("alarm-time");

addAlarmButton.addEventListener("click", setAlarm);

function setAlarm() {
    const alarmTime = alarmTimeInput.value;
    if (!alarmTime) {
        alert("Please select a valid time for the alarm.");
        return;
    }

    const [hourStr, minuteStr] = alarmTime.split(":");
    const tempDate = new Date();
    tempDate.setHours(hourStr, minuteStr);
    const formattedTime = tempDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    alarms.push(formattedTime);

    const listItem = document.createElement("li");
    listItem.textContent = formattedTime;
    document.getElementById("alarm-list").appendChild(listItem);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.className = "delete-alarm-button";
    listItem.appendChild(deleteButton);
};

document.getElementById("alarm-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-alarm-button")) {
        const li = e.target.closest("li"); // grab the closest parent <li>
        const alarmTime = li.dataset.time; // use stored value
        li.remove();
        alarms.splice(alarms.indexOf(alarmTime), 1);
    }
});

const alarmSound = new Audio("media/clock-assets/mixkit-alarm.wav");

function alarmRing() {
    const alarmList = document.getElementById("alarm-list");
    if (currentTimeString === alarmList) return;

    const items = Array.from(alarmList.children);
    items.forEach(li => {
        if (li.dataset.disabled === 'true') return;

        const timeText = li.firstChild && li.firstChild.nodeValue
            ? li.firstChild.nodeValue.trim()
            : li.textContent.trim();

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
