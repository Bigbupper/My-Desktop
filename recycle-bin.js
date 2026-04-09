
/* -------kirby recycle bin + draggable stars------- */
 
document.addEventListener('DOMContentLoaded', function () {
 
    const kirbyIcon   = document.getElementById('recycle-icon');
    const stars       = document.querySelectorAll('.star.icon');
 
    /* ----- initial star positions ----- */
    const startPositions = {
        'star-1': { top: 120, left: 120 },
        'cake-1': { top: 200, left: 150 },
    };
 
    stars.forEach(star => {
        const pos = startPositions[star.id];
        star.style.top  = pos.top  + 'px';
        star.style.left = pos.left + 'px';
    });
 
 
    /* ----- touch/mouse coord helper ----- */
    function getEventCoords(e) {
        if (e.touches && e.touches.length > 0) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        return { x: e.clientX, y: e.clientY };
    }
 
 
    /* ----- drag logic ----- */
    stars.forEach(star => {
 
        function startStarDrag(e) {
            e.preventDefault();
 
            const coords  = getEventCoords(e);
            const offsetX = coords.x - star.offsetLeft;
            const offsetY = coords.y - star.offsetTop;
 
            function moveStar(e) {
                const { x, y } = getEventCoords(e);
                star.style.left = (x - offsetX) + 'px';
                star.style.top  = (y - offsetY) + 'px';
 
                // show open mouth while star is over Kirby
                if (isOverKirby(star)) {
                    kirbyIcon.classList.add('kirby-hungry');
                } else {
                    kirbyIcon.classList.remove('kirby-hungry');
                }
            }
 
            function dropStar() {
                document.removeEventListener('mousemove', moveStar);
                document.removeEventListener('mouseup',   dropStar);
                document.removeEventListener('touchmove', moveStar);
                document.removeEventListener('touchend',  dropStar);
 
                kirbyIcon.classList.remove('kirby-hungry');
 
                if (isOverKirby(star)) {
                    eatStar(star);
                }
            }
 
            document.addEventListener('mousemove', moveStar);
            document.addEventListener('mouseup',   dropStar);
            document.addEventListener('touchmove', moveStar, { passive: false });
            document.addEventListener('touchend',  dropStar);
        }
 
        star.addEventListener('mousedown',  startStarDrag);
        star.addEventListener('touchstart', startStarDrag, { passive: false });
    });
 
 
    /* ----- drop detection ----- */
    function isOverKirby(star) {
        const starRect  = star.getBoundingClientRect();
        const kirbyRect = kirbyIcon.getBoundingClientRect();
 
        const starCentreX = starRect.left + starRect.width  / 2;
        const starCentreY = starRect.top  + starRect.height / 2;
 
        return (
            starCentreX >= kirbyRect.left  &&
            starCentreX <= kirbyRect.right &&
            starCentreY >= kirbyRect.top   &&
            starCentreY <= kirbyRect.bottom
        );
    }
 
 
    /* ----- eat animation ----- */
    function eatStar(star) {
        kirbyIcon.classList.add('kirby-hungry');
 
        setTimeout(() => {
            star.classList.add('eaten');
            kirbyIcon.classList.remove('kirby-hungry');
        }, 400);
    }
 
});