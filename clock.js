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

    return timeString;
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
const addAlarmButton = document.getElementById("add-alarm-button");
const alarmTimeInput = document.getElementById("alarm-time");

addAlarmButton.addEventListener("click", setAlarm);

function setAlarm() {
    const alarmTime = alarmTimeInput.value;

    if (alarmTime !== "") {
        // alarmTime is in "HH:MM" 24hr format
        const [hourStr, minuteStr] = alarmTime.split(":");
        let hour = parseInt(hourStr, 10);
        const minute = minuteStr;
        const amPm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        const formattedTime = `${hour}:${minute.padStart(2, "0")} ${amPm}`;

        const alarmList = document.getElementById("alarm-list");
        const listItem = document.createElement("li");
        listItem.textContent = formattedTime;
        alarmList.appendChild(listItem);
    } else {
        alert("Please select a valid time for the alarm.");
    }
}