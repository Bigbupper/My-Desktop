document.addEventListener('DOMContentLoaded', function () {

    function setupOperaTabs(operaWindow) {
        const tabList = operaWindow.querySelector('.tab-list');
        const bookmarks = operaWindow.querySelectorAll('.bookmark');
        const pages = operaWindow.querySelectorAll('.webpage');

        function addTab(bookmark, targetPageId) {
            const tab = document.createElement('button');
            tab.classList.add('tab');

            // clone the bookmark's SVG and span
            const svgClone = bookmark.querySelector('svg').cloneNode(true);
            const spanClone = bookmark.querySelector('span').cloneNode(true);

            const closeBtn = document.createElement('button');
            closeBtn.classList.add('close-tab');
            closeBtn.innerHTML = '<svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 21.32L21 3.32001" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 3.32001L21 21.32" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';

            closeBtn.addEventListener('click', (event) => {
                event.stopPropagation();

                const wasActive = tab.classList.contains('active');
                tab.remove();

                const targetPage = operaWindow.querySelector(`#${targetPageId}`);
                if (targetPage) targetPage.style.display = 'none';

                if (wasActive) {
                    const remainingTabs = tabList.querySelectorAll('.tab');
                    if (remainingTabs.length > 0) {
                        const firstTab = remainingTabs[0];
                        const firstTabLabel = firstTab.querySelector('span').textContent;
                        const newTargetPageId = getPageIdFromTabLabel(firstTabLabel);
                        switchTab(newTargetPageId);
                    }
                }
            });

            tab.appendChild(svgClone);
            tab.appendChild(spanClone);
            tab.appendChild(closeBtn);
            tabList.appendChild(tab);

            tab.addEventListener('click', () => {
                switchTab(targetPageId);
            });
        }

        function switchTab(targetPageId) {
            pages.forEach(page => page.style.display = 'none');
            const targetPage = operaWindow.querySelector(`#${targetPageId}`);
            if (targetPage) targetPage.style.display = 'flex';

            const allTabs = tabList.querySelectorAll('.tab');
            allTabs.forEach(t => t.classList.remove('active'));

            const matchingTab = [...allTabs].find(tab =>
                tab.querySelector('span').textContent === targetPageId.replace('-page', '')
            );
            if (matchingTab) matchingTab.classList.add('active');
        }

        bookmarks.forEach(bookmark => {
            bookmark.addEventListener('click', () => {
                const tabLabel = bookmark.querySelector('span').textContent;
                const targetPageId = getPageIdFromTabLabel(tabLabel);

                if (!targetPageId) return;

                const existingTab = [...tabList.querySelectorAll('.tab')].find(tab =>
                    tab.querySelector('span').textContent === tabLabel
                );

                if (!existingTab) {
                    addTab(bookmark, targetPageId);
                }

                switchTab(targetPageId);
            });
        });

        function getPageIdFromTabLabel(tabLabel) {
            const map = {
                'Email': 'email-page',
                'Github': 'github-page',
                'Noise Mixer': 'noise-mixer-page',
                'Youtube': 'youtube-page',
                'Home': 'home-page'
            };
            return map[tabLabel] || null;
        }
    }

    const operaWindow = document.getElementById('opera-window');
    setupOperaTabs(operaWindow);

});
