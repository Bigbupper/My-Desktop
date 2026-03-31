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

        let hasBeenOpened = false;
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
            } /* else if (!hasBeenOpened) {
                const pos = getNextPosition();
                windowElement.style.left = pos.left + 'px';
                windowElement.style.top = pos.top + 'px';
                hasBeenOpened = true;
            } */
            minimizedIcon.style.display = 'flex';
            windowElement._minimizedIcon = minimizedIcon;
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
            minimizedIcon.classList.remove('active-icon');
        }
        if (minimizeButton) {
            minimizeButton.addEventListener('click', minimizeWindow);
        }

        // Toggle minimize from taskbar icon
        // Windows-style: if this window is the active (top) window, minimize it
        // if open but not active, bring to front; if minimized, restore it
        minimizedIcon.addEventListener('click', () => {
            const isActive = parseInt(windowElement.style.zIndex) === zCounter - 1;
            if (windowElement.classList.contains('open') && isActive) {
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
                    windowElement.style.height = '100%'; // Adjust for taskbar height
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
                minimizedIcon.classList.remove('active-icon');
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

                    startDragProtection('nwse-resize');

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
                        stopDragProtection();
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

    // window positioning
    let zCounter = 1;
    function bringToFront(windowEl) {
        windowEl.style.zIndex = zCounter++;
        updateActiveIcon();
    }

    function updateActiveIcon() {
        // clear active from all icons, then mark only the top window's icon
        document.querySelectorAll('.minimize-icon').forEach(i => i.classList.remove('active-icon'));
        let topZ = 0, topWindow = null;
        document.querySelectorAll('.window.open').forEach(w => {
            const z = parseInt(w.style.zIndex) || 0;
            if (z > topZ) { topZ = z; topWindow = w; }
        });
        if (topWindow) topWindow._minimizedIcon?.classList.add('active-icon');
    }

    let cascadeOffset = 0;
    function getNextPosition() {
        const offset = cascadeOffset;
        cascadeOffset = (cascadeOffset + 30) % 180;
        return { top: 80 + offset, left: 80 + offset };
    }

    const iframeOverlay = document.createElement('div');
    iframeOverlay.style.cssText = `
        display: none; position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        z-index: 99999;
    `;
    document.body.appendChild(iframeOverlay);

    function startDragProtection(cursor) {
        iframeOverlay.style.display = 'block';
        iframeOverlay.style.cursor = cursor || 'default';
    }
    function stopDragProtection() {
        iframeOverlay.style.display = 'none';
        iframeOverlay.style.cursor = 'default';
    }


    // double-click to open
    openFromDesktop('spotify-icon', 'spotify-window');
    openFromDesktop('files-icon', 'files-window');
    openFromDesktop('dressup-icon', 'dressup-window');
    openFromDesktop('opera-icon', 'opera-window');
    openFromDesktop('vscode-icon', 'vscode-window');

    // open from start menu
    openFromStart('mini-weather-icon', 'weather-window');
    openFromStart('calculator-icon', 'calculator-window');
    openFromStart('todolist-icon', 'todo-window');
    openFromStart('clock-icon', 'clock-window');

    /* -------change color mode------- */
    const bodyTheme = document.body;
    const colorModeButton = document.getElementById('color-mode-toggle');
    let isDarkMode = true; // Start in dark mode

    colorModeButton.addEventListener('click', toggleColorMode);

    function toggleColorMode() {
        const darkIcons = document.querySelectorAll('.dark-icon');
        const lightIcons = document.querySelectorAll('.light-icon');
        if (isDarkMode) {
            bodyTheme.classList.add('light-mode');
            bodyTheme.style.backgroundImage = "url('media/light-bg.jpg')";
            darkIcons.forEach(icon => icon.style.display = "none");
            lightIcons.forEach(icon => icon.style.display = "block");
            isDarkMode = false;
        } else {
            bodyTheme.classList.remove('light-mode');
            bodyTheme.style.backgroundImage = "url('media/dark-bg.png')";
            darkIcons.forEach(icon => icon.style.display = "block");
            lightIcons.forEach(icon => icon.style.display = "none");
            isDarkMode = true;
        }
    }  /* -------start menu------- */

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
