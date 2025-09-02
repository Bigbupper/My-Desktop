    /* ----- dressup game ----- */
document.addEventListener('DOMContentLoaded', () => {

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

    // background changer
    const backgrounds = [
        'media/pixel-game-assets/pixil-background1.png',
        'media/pixel-game-assets/pixil-background2.png',
        'media/pixel-game-assets/pixil-background3.png'
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

    // initialize background
    changeBackground(currentBg);

});