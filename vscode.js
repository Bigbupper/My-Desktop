require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.49.0/min/vs' }});
require(['vs/editor/editor.main'], function () {
    monaco.editor.create(document.getElementById('code-editor'), {
        value:
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Visual Studio Code</title>
            </head>
                <body>
                <!----- VScode window ----->
                    <div id="vscode-window" class="window">
                        <section class="window-header" id="vscode-header">
                            <div class="window-controls">
                                <button class="minimize-button">_</button>
                                <button class="maximize-button">🗖</button>
                                <button class="exit-button">
                                    <svg class="exit-icon" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 21.32L21 3.32001" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 3.32001L21 21.32" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                </button>
                            </div>
                        </section>
                        <div class="vscode base">
                            <div class="sidebar">
                                <button class="sidebar-button" id="explorer-button">
                                    <svg width="29" height="33" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 1H21.3516C21.6372 1 21.9098 1.12245 22.0996 1.33594L25.2529 4.88281L27.7471 7.68945C27.9098 7.8725 28 8.10958 28 8.35449V25C28 25.5523 27.5523 26 27 26H10C9.44772 26 9 25.5523 9 25V2C9 1.44772 9.44772 1 10 1Z" stroke="var(--vs-highlight)" stroke-width="2"/>
                                        <path d="M21 1V8.5" stroke="var(--vs-highlight)" stroke-width="2"/><path d="M20 8H27" stroke="var(--vs-highlight)" stroke-width="2"/>
                                        <path d="M2 7H8C8.55228 7 9 7.44772 9 8V24C9 25.1046 9.89543 26 11 26H20C20.5523 26 21 26.4477 21 27V31C21 31.5523 20.5523 32 20 32H2C1.44772 32 1 31.5523 1 31V8C1 7.44772 1.44772 7 2 7Z" stroke="var(--vs-highlight)" stroke-width="2"/>
                                    </svg>
                                </button>
                                <button class="sidebar-button" id="search-button">
                                    <svg width="28" height="31" viewBox="0 0 28 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="17.8946" cy="10" r="9" stroke="#E6E6E6" stroke-width="2"/>
                                        <path d="M11.6085 17L1.00003 29.59" stroke="#E6E6E6" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                </button>
                                <button class="sidebar-button" id="git-button">
                                    <svg width="29" height="32" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="23.5" cy="10.5" r="4.5" stroke="var(--vs-highlight)" stroke-width="2"/>
                                        <path d="M5.5907 22C8.07597 22 10.0907 24.0147 10.0907 26.5C10.0907 28.9853 8.07597 31 5.5907 31C3.10542 31 1.0907 28.9853 1.0907 26.5C1.0907 24.0147 3.10542 22 5.5907 22Z" stroke="var(--vs-highlight)" stroke-width="2"/>
                                        <circle cx="5.5" cy="5.5" r="4.5" stroke="var(--vs-highlight)" stroke-width="2"/><path d="M5.5 9.5L5.5 23" stroke="var(--vs-highlight)" stroke-width="2"/>
                                        <path d="M23.5 15.0001C23.5 15.0001 24 17 21 18C18 19 15 18 11 18C7 18 5.49999 20.5 5.49999 20.5" stroke="var(--vs-highlight)" stroke-width="2"/>
                                    </svg>
                                </button>
                                <button class="sidebar-button" id="extensions-button">
                                    <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="13.4142" y="8.53033" width="9.99623" height="10" transform="rotate(-45.3883 13.4142 8.53033)" stroke="var(--vs-highlight)" stroke-width="2"/>
                                        <rect x="13.0849" y="16.0065" width="12" height="12" transform="rotate(0.37442 13.0849 16.0065)" stroke="var(--vs-highlight)" stroke-width="2"/>
                                        <rect x="1.09147" y="15.7845" width="12" height="12" transform="rotate(0.37442 1.09147 15.7845)" stroke="var(--vs-highlight)" stroke-width="2"/>
                                        <rect x="1.08494" y="4.00651" width="12" height="12" transform="rotate(0.37442 1.08494 4.00651)" stroke="var(--vs-highlight)" stroke-width="2"/>
                                    </svg>
                                </button>
                            </div>
                        
                            <div class="editor-tabs">
                                <div class="vs-tab" id="html-tab">
                                    <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.99997 0L2.99997 1.50006L0.711274 3.63011L-6.47009e-06 2.89358L2.99997 0Z" fill="#FF7C2B"/>
                                        <path d="M0.711274 2.20752L2.99997 4.50006L2.99997 6.00006L-6.47009e-06 2.89358L0.711274 2.20752Z" fill="#FF7C2B"/>
                                        <path d="M3.83173 6.10352e-05L3.83173 1.50012L6.12042 3.63017L6.8317 2.89364L3.83173 6.10352e-05Z" fill="#FF7C2B"/>
                                        <path d="M6.12042 2.20758L3.83173 4.50012L3.83173 6.00012L6.8317 2.89364L6.12042 2.20758Z" fill="#FF7C2B"/>
                                    </svg>
                                    <span id="editor-tab-title">index.html</span>
                                    <button id="editor-tab-close-button">x</button>
                                </div>
                                <div class="vs-tab" id="css-tab">
                                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.98193 0H2.98193L1.5 6H0.5L1.98193 0Z" fill="#5CAED7"/>
                                        <path d="M3.98193 0H4.98193L3.44693 6H2.44693L3.98193 0Z" fill="#5CAED7"/>
                                        <path d="M5.4819 1.5L5.48191 2.49996L0.481929 2.49994L0.481941 1.49998L5.4819 1.5Z" fill="#5CAED7"/>
                                        <path d="M4.98192 4L4.98187 4.99996L3.66179e-06 4.99996L-1.12609e-05 3.99993L4.98192 4Z" fill="#5CAED7"/>
                                    </svg>
                                    <span id="editor-tab-title">styles.css</span>
                                    <button id="editor-tab-close-button">x</button>
                                </div>
                                <div class="vs-tab" id="js-tab">
                                    <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.99997 2C5.99997 1 5.704 0.5 4.99997 0.5C4.29594 0.5 3.99997 1 3.99997 2C3.99997 3 5.99998 3 5.99997 4C5.99996 5 5.704 5.5 4.99997 5.5C4.29594 5.5 4 5 3.99998 4" stroke="#FFFF80"/>
                                        <path d="M2.49999 0C2.49999 0 2.50002 3 2.49999 4C2.49997 5 2.20402 5.5 1.49999 5.5C0.795967 5.5 0.499983 5 0.499995 4" stroke="#FFFF80"/>
                                    </svg>
                                    <span id="editor-tab-title">script.js</span>
                                    <button id="editor-tab-close-button">x</button>
                                </div>
                            </div>    
                            <script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.49.0/min/vs/loader.js"></script>
                            <div id="code-editor"></div>
                        </div>
                        <div class="resizer"></div>
                    </div>
                </body>
            </html> `,
        language: "html",
        theme: "vs-dark",
        fontSize: 15,
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        minimap: {
            size: 'proportional',
        }
    });
});