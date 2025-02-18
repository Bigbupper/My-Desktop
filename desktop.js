
/* --------pop-up windows---------- */

document.addEventListener('DOMContentLoaded', function () {
    function toggleWindow(iconId, windowId) {
        const icon = document.getElementById(iconId);
        const window = document.getElementById(windowId);
        const header = window.querySelector('.window-header');
        const exitButton = window.querySelector('.exit-button');
        const base = window.querySelector('.base');
        const resizer = window.querySelector('.resizer');

        // Toggle window open/close
        icon.addEventListener('click', function () {
            window.classList.toggle('open');
            bringToFront(window);
        });

        // Close window
        exitButton.addEventListener('click', function () {
            window.classList.remove('open');
        });
        // Make window draggable
        header.addEventListener('mousedown', function (e) {
            e.preventDefault();

            let offsetX = e.clientX - window.offsetLeft;
            let offsetY = e.clientY - window.offsetTop;

            function moveAt(e) {
            const parentWidth = window.parentElement.clientWidth,
                  parentHeight = window.parentElement.clientHeight - 40, // Adjust for taskbar height
                  windowWidth = window.offsetWidth,
                  windowHeight = window.offsetHeight,
                  maxLeft = parentWidth - windowWidth,
                  maxTop = parentHeight - windowHeight,
                  newLeft = Math.max(0, Math.min(maxLeft, e.clientX - offsetX)),
                  newTop = Math.max(0, Math.min(maxTop, e.clientY - offsetY));
            window.style.left = newLeft + 'px';
            window.style.top = newTop + 'px';
            }

            function onMouseUp() {
            document.removeEventListener('mousemove', moveAt);
            document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', moveAt);
            document.addEventListener('mouseup', onMouseUp);
        });

        // Make window resizable
        window.addEventListener('mousedown', function (e) {
            if (e.target.classList.contains('resizer')) {
            e.preventDefault();

            let startX = e.clientX;
            let startY = e.clientY;
            let startWidth = parseInt(document.defaultView.getComputedStyle(window).width, 10);
            let startHeight = parseInt(document.defaultView.getComputedStyle(window).height, 10);

            const minWidth = parseInt(document.defaultView.getComputedStyle(window).minWidth, 10);
            const maxWidth = parseInt(document.defaultView.getComputedStyle(window).maxWidth, 10);
            const minHeight = parseInt(document.defaultView.getComputedStyle(window).minHeight, 10);
            const maxHeight = parseInt(document.defaultView.getComputedStyle(window).maxHeight, 10);

            function doDrag(e) {
                const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + e.clientX - startX));
                const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + e.clientY - startY));
                window.style.width = newWidth + 'px';
                window.style.height = newHeight + 'px';
                base.style.height = (newHeight - 45) + 'px';
            }

            function stopDrag() {
                document.removeEventListener('mousemove', doDrag);
                document.removeEventListener('mouseup', stopDrag);
            }

            document.addEventListener('mousemove', doDrag);
            document.addEventListener('mouseup', stopDrag);
            }
        });

        // Bring window to front when clicked
        window.addEventListener('mousedown', function () {
            bringToFront(window);
        });
    }

    function bringToFront(window) {
        const windows = document.querySelectorAll('.window');
        windows.forEach(w => w.style.zIndex = 1);
        window.style.zIndex = 10;
    }

    // Window toggles
    toggleWindow('spotify-icon', 'spotify-window');
    toggleWindow('files-icon', 'files-window');
    toggleWindow('mini-weather-icon', 'weather-window');
    // Add more icons and windows as needed


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

        document.getElementById("time").textContent = timeString;
        document.getElementById("date").textContent = dateString;
    }

    updateDateTime();    
    setInterval(updateDateTime, 1000);

    /* -------start menu------- */

    const startButton = document.getElementById('start-button');
    const startMenu = document.querySelector('.start-menu');

    startButton.addEventListener('click', function (e) {
        e.stopPropagation();
        startMenu.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
        if (!startMenu.contains(e.target)) {
            startMenu.classList.remove('open');
        }
    });

    startMenu.addEventListener('click', function (e) {
        e.stopPropagation();
    });
});
