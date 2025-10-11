document.addEventListener('DOMContentLoaded', () => {

    const assetStack = document.getElementById("asset-stack");

    // asset counts per category
    const assetConfig = {
        base: 5,
        eyes: 19,
        brows: 7,
        lips: 15,
        hair: 20,
        hat: 6,
        longsleeve: 10,
        shortsleeve: 9,
        sleeveless: 3,
        outerwear: 3,
        skirt: 7,
        shorts: 2,
        pants: 9,
        overalls: 2,
        socks: 7,
        shoes: 8,
        bags: 4,
        plushy: 2
    };

    // z-index map
    const layerMap = {
        base: 0,
        lips: 1,
        brows: 1,
        hair: 2,
        eyes: 3,
        socks: 4,
        shoes: 5,
        skirt: 6,
        shorts: 7,
        pants: 8,
        longsleeve: 9,
        shortsleeve: 9,
        sleeveless: 9,
        overalls: 10,
        outerwear: 11,
        hat: 12,
        bags: 13,
        plushy: 14,
    };

    // generate icons + layers
    Object.entries(assetConfig).forEach(([category, count]) => {
        const container = document.getElementById(`${category}-options`);
        if (!container) return;

        for (let i = 1; i <= count; i++) {
            const layerSrc = `media/pixel-game-assets/${category}/pixil-layer-${category}${i}.png`;
            const iconSrc = `media/pixel-game-assets/${category}/icons/${category}icon${i}.png`;

            // create button
            const btn = document.createElement("button");
            btn.dataset[category] = `${category}${i}`;
            btn.style.backgroundImage = `url(${iconSrc})`;
            container.appendChild(btn);

            // create hidden image layer
            const img = document.createElement("img");
            img.id = `${category}${i}-img`;
            img.src = layerSrc;
            img.classList.add("layer");
            img.style.display = "none";

            // assign z-index from the layer map
            img.style.zIndex = layerMap[category] ?? 0;

            assetStack.appendChild(img);
        }
    });

    function showSingleItem(buttonSelector, dataAttr) {
        const buttons = document.querySelectorAll(buttonSelector);

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedId = button.getAttribute(dataAttr) + '-img';
                const allImages = Array.from(assetStack.querySelectorAll('img'))
                    .filter(img => img.id.startsWith(dataAttr.replace('data-', '')));
                
                // hide all images in this category
                allImages.forEach(img => img.style.display = 'none');

                // show the selected one
                const activeImage = document.getElementById(selectedId);
                if (activeImage) activeImage.style.display = 'block';

                // button selected state
                buttons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
            });
        });
    }

    function toggleItem(buttonSelector, dataAttr) {
        const buttons = document.querySelectorAll(buttonSelector);

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const itemId = button.getAttribute(dataAttr) + '-img';
                const image = document.getElementById(itemId);

                if (image) {
                    const visible = window.getComputedStyle(image).display !== 'none';
                    image.style.display = visible ? 'none' : 'block';
                }

                button.classList.toggle('selected');
            });
        });
    }

    showSingleItem('#base-options button', 'data-base');
    showSingleItem('#brows-options button', 'data-brows');
    showSingleItem('#eyes-options button', 'data-eyes');
    showSingleItem('#lips-options button', 'data-lips');
    showSingleItem('#hair-options button', 'data-hair');
    showSingleItem('#shoes-options button', 'data-shoes');

    toggleItem('#hat-options button', 'data-hat');
    toggleItem('#longsleeve-options button', 'data-longsleeve');
    toggleItem('#shortsleeve-options button', 'data-shortsleeve');
    toggleItem('#sleeveless-options button', 'data-sleeveless');
    toggleItem('#outerwear-options button', 'data-outerwear');
    toggleItem('#skirt-options button', 'data-skirt');
    toggleItem('#shorts-options button', 'data-shorts');
    toggleItem('#pants-options button', 'data-pants');
    toggleItem('#overalls-options button', 'data-overalls');
    toggleItem('#socks-options button', 'data-socks');
    toggleItem('#bags-options button', 'data-bags');
    toggleItem('#plushy-options button', 'data-plushy');

    // background changer
    const backgrounds = [
        'media/pixel-game-assets/pixil-background1.png',
        'media/pixel-game-assets/pixil-background2.png',
        'media/pixel-game-assets/pixil-background3.png',
        'media/pixel-game-assets/pixil-background4.png'
    ];

    let currentBg = 0;
    const characterContainer = document.getElementById('character-container');

    function changeBackground(index) {
        currentBg = (index + backgrounds.length) % backgrounds.length;
        characterContainer.style.backgroundImage = `url(${backgrounds[currentBg]})`;
    }

    // event listeners
    document.getElementById('prev-bg').addEventListener('click', () => changeBackground(currentBg - 1));
    document.getElementById('next-bg').addEventListener('click', () => changeBackground(currentBg + 1));

    // load background
    changeBackground(currentBg);

    /* randomizer */
    
    /* clear all */
    const clearCharacterBtn = document.getElementById('clear-character-button');
    clearCharacterBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear your character? This cannot be undone."))
                //hidse images inside character container
                document.querySelectorAll('#character-container img').forEach(img => {
                    img.style.display = 'none';
                });

                //removes "selected" button states
                document.querySelectorAll('.selected').forEach(btn => {
                    btn.classList.remove('selected');
                });
            });
        
    /* ------- export character ------- */
    const downloadBtn = document.getElementById("download-button");

    if (downloadBtn && characterContainer) {
        downloadBtn.addEventListener("click", async () => {
            // Use device pixel ratio for crisp captures on mobile
            const scale = window.devicePixelRatio > 1 ? window.devicePixelRatio : 2;

            const canvas = await html2canvas(characterContainer, {
                backgroundColor: null, // keeps transparency around the character
                scale: scale,
                useCORS: true,
                logging: false
            });

            const link = document.createElement("a");
            link.download = "my-character.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    }
    });