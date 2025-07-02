
/* --------pop-up windows---------- */

document.addEventListener('DOMContentLoaded', function () {

    function desktopWindowSetup(icon, windowElement) {
        const header = windowElement.querySelector('.window-header');
        const minimizeButton = windowElement.querySelector('.minimize-button');
        const maximizeButton = windowElement.querySelector('.maximize-button');
        const exitButton = windowElement.querySelector('.exit-button');
        const base = windowElement.querySelector('.base');
        const resizer = windowElement.querySelector('.resizer');
        const taskbar = document.getElementById('minimized-windows');
        let savedState = null;

        // Create taskbar icon
        const minimizedIcon = document.createElement('img');
        minimizedIcon.src = icon.querySelector('img').src;
        minimizedIcon.classList.add('minimize-icon');
        minimizedIcon.style.display = 'none';
        taskbar.appendChild(minimizedIcon);

        // Show taskbar icon when window is opened
        function openWindow() {
            windowElement.classList.add('open');
            windowElement.classList.remove('minimized');
            if (savedState && !windowElement.classList.contains('maximized')) {
                windowElement.style.width = savedState.width;
                windowElement.style.height = savedState.height;
                windowElement.style.left = savedState.left;
                windowElement.style.top = savedState.top;
                base.style.height = savedState.baseHeight;
            }
            minimizedIcon.style.display = 'flex';
            bringToFront(windowElement);
        }

        windowElement.openWindow = openWindow;

        // Minimize window
        function minimizeWindow() {
            if (!windowElement.classList.contains('maximized')) {
                savedState = {
                    width: windowElement.style.width || windowElement.offsetWidth + 'px',
                    height: windowElement.style.height || windowElement.offsetHeight + 'px',
                    left: windowElement.style.left || windowElement.offsetLeft + 'px',
                    top: windowElement.style.top || windowElement.offsetTop + 'px',
                    baseHeight: base.style.height || base.offsetHeight + 'px'
                };
            }
            windowElement.classList.remove('open');
            windowElement.classList.add('minimized');
        }
        if (minimizeButton) {
            minimizeButton.addEventListener('click', minimizeWindow);
        }

        // Toggle minimize from taskbar icon
        minimizedIcon.addEventListener('click', () => {
            if (windowElement.classList.contains('open')) {
                minimizeWindow();
            } else {
                openWindow();
            }
        });

        // Maximize window
        if (maximizeButton) {
            maximizeButton.addEventListener('click', () => {
                if (windowElement.classList.contains('maximized')) {
                    windowElement.classList.remove('maximized');
                    // Restore previous size and position
                    if (savedState) {
                        windowElement.style.width = savedState.width;
                        windowElement.style.height = savedState.height;
                        windowElement.style.left = savedState.left;
                        windowElement.style.top = savedState.top;
                        base.style.height = savedState.baseHeight;
                    }
                } else {
                    // saved current size and position
                    savedState = {
                        width: windowElement.style.width || windowElement.offsetWidth + 'px',
                        height: windowElement.style.height || windowElement.offsetHeight + 'px',
                        left: windowElement.style.left || windowElement.offsetLeft + 'px',
                        top: windowElement.style.top || windowElement.offsetTop + 'px',
                        baseHeight: base.style.height || base.offsetHeight + 'px'
                    };
                    windowElement.classList.add('maximized');
                    windowElement.style.width = '100%';
                    windowElement.style.height = 'calc(100% - 40px)'; // Adjust for taskbar height
                    windowElement.style.left = '0';
                    windowElement.style.top = '0';
                    base.style.height = 'calc(100% - 85px)'; // Adjust base height
                }
            });
        }

        // Close window and remove taskbar icon
        if (exitButton) {
            exitButton.addEventListener('click', () => {
                windowElement.classList.remove('open', 'minimized');
                minimizedIcon.style.display = 'none'
            });
        }

        // Make window draggable
        header.addEventListener('mousedown', function (e) {
            e.preventDefault();

            let offsetX = e.clientX - windowElement.offsetLeft;
            let offsetY = e.clientY - windowElement.offsetTop;

            function moveAt(e) {
                const parentWidth = windowElement.parentElement.clientWidth,
                    parentHeight = windowElement.parentElement.clientHeight - 40, // Adjust for taskbar height
                    windowWidth = windowElement.offsetWidth,
                    windowHeight = windowElement.offsetHeight,
                    maxLeft = parentWidth - windowWidth,
                    maxTop = parentHeight - windowHeight,
                    newLeft = Math.max(0, Math.min(maxLeft, e.clientX - offsetX)),
                    newTop = Math.max(0, Math.min(maxTop, e.clientY - offsetY));
                windowElement.style.left = newLeft + 'px';
                windowElement.style.top = newTop + 'px';
            }

            function onMouseUp() {
                document.removeEventListener('mousemove', moveAt);
                document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', moveAt);
            document.addEventListener('mouseup', onMouseUp);
        });

        // Make window resizable
        if (resizer) {
            windowElement.addEventListener('mousedown', function (e) {
                if (e.target.classList.contains('resizer')) {
                    e.preventDefault();

                    let startX = e.clientX;
                    let startY = e.clientY;
                    let startWidth = parseInt(document.defaultView.getComputedStyle(windowElement).width, 10);
                    let startHeight = parseInt(document.defaultView.getComputedStyle(windowElement).height, 10);

                    const minWidth = parseInt(document.defaultView.getComputedStyle(windowElement).minWidth, 10);
                    const maxWidth = parseInt(document.defaultView.getComputedStyle(windowElement).maxWidth, 10);
                    const minHeight = parseInt(document.defaultView.getComputedStyle(windowElement).minHeight, 10);
                    const maxHeight = parseInt(document.defaultView.getComputedStyle(windowElement).maxHeight, 10);

                    function doDrag(e) {
                        const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + e.clientX - startX));
                        const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + e.clientY - startY));
                        windowElement.style.width = newWidth + 'px';
                        windowElement.style.height = newHeight + 'px';
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
        }

        // Bring window to front when clicked
        windowElement.addEventListener('mousedown', function () {
            bringToFront(windowElement);
        });
    }

    function openFromDesktop(iconId, windowId) {
        const icon = document.getElementById(iconId);
        const windowElement = document.getElementById(windowId);
        if (!icon || !windowElement) return;

        desktopWindowSetup(icon, windowElement);
        console.log(windowElement.openWindow);

        icon.addEventListener('dblclick', (e) => {
            e.preventDefault();
            
            // reset position and size
            windowElement.style.top = '100px';
            windowElement.style.left = '100px';
            windowElement.style.width = '';
            windowElement.style.height = '';
            windowElement.classList.remove('maximized');

            windowElement.openWindow();
        });
    }

    function openFromStart(iconId, windowId) {
        const icon = document.getElementById(iconId);
        const windowElement = document.getElementById(windowId);
        if (!icon || !windowElement) return;

        desktopWindowSetup(icon, windowElement);

        icon.addEventListener('click', (e) => {
            e.preventDefault();
            windowElement.openWindow();
        });

        
    }

    function bringToFront(window) {
        const windows = document.querySelectorAll('.window');
        windows.forEach(w => w.style.zIndex = 1);
        window.style.zIndex = 10;
    }

    // double-click to open
    openFromDesktop('spotify-icon', 'spotify-window');
    openFromDesktop('files-icon', 'files-window');
    openFromDesktop('dressup-icon', 'dressup-window');
    openFromDesktop('opera-icon', 'opera-window');

    // open from start menu
    openFromStart('mini-weather-icon', 'weather-window');
    openFromStart('calculator-icon', 'calculator-window');

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

    /* -------calculator------- */
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".calc.base button");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const value = this.textContent;

            if (this.classList.contains("clear")) {
                clearDisplay();
            } else if (this.classList.contains("equal")) {
                calculate();
            } else if (this.classList.contains("backspace")) {
                backspace();
            } else {
                appendToDisplay(value);
            }
        });
    });

    function appendToDisplay(value) {
        display.value += value;
    }

    function clearDisplay() {
        display.value = "";
    }

    function backspace() {
        display.value = display.value.slice(0, -1);
    }

    function calculate() {
        try {
            if (display.value === "800815") {
                display.value = "BOOBIES";
            } else if (display.value === "80085") {
                display.value = "You pervert...";
            } else if (display.value === "8008") {
                display.value = "Childish...";
            } else if (display.value === "69") {
                display.value = "Nice...";
            } else if (display.value === "420") {
                display.value = "Drugs are bad for you...";
            }
            else {
                display.value = math.evaluate(display.value);
            }
        } catch (error) {
            display.value = "Invalid Expression";
        }
    }

    /* ----- dressup game ----- */

    // single choice options (skin, eyes, lips, hair, hat)
    function optionButtons(buttonSelector, imagePrefix, dataAttr) {
        const images = document.querySelectorAll(`#character-container img[id^="${imagePrefix}"]`);

        document.querySelectorAll(buttonSelector).forEach(button => {
            button.addEventListener('click', () => {
                const selectedId = button.getAttribute(dataAttr) + '-img';

                images.forEach(img => img.style.display = 'none');

                const activeImage = document.getElementById(selectedId);
                if (activeImage) activeImage.style.display = 'block';

                // Add selected/remove styling
                document.querySelectorAll(buttonSelector).forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
            });
        });
    }

    optionButtons('#skin-options button', 'base', 'data-skin');
    optionButtons('#brows-options button', 'brows', 'data-brows');
    optionButtons('#eye-options button', 'eyes', 'data-eyes');
    optionButtons('#lips-options button', 'lips', 'data-lips');
    optionButtons('#hair-options button', 'hair', 'data-hair');
    optionButtons('#shoes-options button', 'shoes', 'data-shoes');

    // toggle options (clothing items that can be layered)
    function toggleButtons(buttonSelector, imagePrefix, dataAttr) {
        document.querySelectorAll(buttonSelector).forEach(button => {
            button.addEventListener('click', () => {
                const itemId = button.getAttribute(dataAttr) + '-img';
                const image = document.getElementById(itemId);

                if (image) {
                    image.style.display = (image.style.display === 'block') ? 'none' : 'block';
                }

                // Toggle selected styling
                button.classList.toggle('selected');
            });
        });
    }

    toggleButtons('#hat-options button', 'hat', 'data-hat');
    toggleButtons('#longsleeve-options button', 'longsleeve', 'data-longsleeve');
    toggleButtons('#shortsleeve-options button', 'shortsleeve', 'data-shortsleeve');
    toggleButtons('#sleeveless-options button', 'sleeveless', 'data-sleeveless');
    toggleButtons('#skirt-options button', 'skirt', 'data-skirt');
    toggleButtons('#shorts-options button', 'shorts', 'data-shorts');
    toggleButtons('#pants-options button', 'pants', 'data-pants');
    toggleButtons('#socks-options button', 'socks', 'data-socks');

});
