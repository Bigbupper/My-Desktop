/* -------spotify music player------- */
document.addEventListener('DOMContentLoaded', function () {

    //variables
    const // song select buttons
        play = document.querySelector(".button-container-play"),
        playIcon = play.querySelector("div"),
        previous = document.querySelector(".button.back"),
        next = document.querySelector(".button.next"),
        // selected song display
        albumCover = document.querySelector(".album-cover"),
        baseGradient = document.querySelector(".spotify.base"),
        title = document.querySelector("#title"),
        artist = document.querySelector("#artist"),
        // loop
        autoPlayBtn = document.querySelector(".loop-icon"),
        autoPlaySvg = autoPlayBtn.querySelector("svg"),
        // volume controls
        currentVolume = document.querySelector("#volume-slider"),
        volumeToggle = document.querySelector(".volume-toggle"),
        muteIcon = document.querySelector("#mute-icon"),
        volumeIcon = document.querySelector("#volume-icon"),
        // duration
        durationSlider = document.querySelector("#duration-slider"),
        trackCurrentTime = document.querySelector(".current-time"),
        trackDuration = document.querySelector(".duration-time");
    
    let autoPlay = 0, 
        indexTrack = 0, 
        trackIsPlaying = false, 
        isDragging = false, 
        track = document.createElement("audio");
    
    
    //playlist
    let trackList = [
        {
            title: "Congratulations",
            artist: "MGMT",
            cover: "./media/spotify-window-assets/MGMT-Congratulations.jpg",
            song: "./media/spotify-window-assets/MGMT-Congratulations.mp3",
            gradient: "linear-gradient( #00a98c,rgba(61, 37, 149, 0.23))"
        },
        {
            title: "Games",
            artist: "The Strokes",
            cover: "./media/spotify-window-assets/Strokes,The-Games.jpg",
            song: "./media/spotify-window-assets/Strokes,The-Games.mp3",
            gradient: "linear-gradient(rgb(221, 75, 143),rgba(102, 0, 122, 0.3))"
        },
        {
            title: "Don't Let's Start",
            artist: "They Might Be Giants",
            cover: "./media/spotify-window-assets/TMBG-Don'tLet'sStart.png",
            song: "./media/spotify-window-assets/TMBG-Don't Let's Start.mp3",
            gradient: "linear-gradient(rgb(86, 153, 76),rgba(12, 53, 80, 0.34))"
        },
        {
            title: "Harvest Moon",
            artist: "Neil Young",
            cover: "./media/spotify-window-assets/Harvest_-_neil_young.jpg",
            song: "./media/spotify-window-assets/Neil Young - Harvest Moon (2023 Remastered).mp3",
            gradient: "linear-gradient(rgba(172, 164, 164, 0.6),rgba(58, 53, 53, 0.4))"
        },
    ]

    // event listeners
    play.addEventListener("click", playSong);
    next.addEventListener("click", nextSong);
    previous.addEventListener("click", prevSong);
    autoPlayBtn.addEventListener("click", autoPlayToggle);
    volumeToggle.addEventListener("click", muteSound);
    currentVolume.addEventListener("change", changeVolume);
    currentVolume.addEventListener("input", changeVolume);
    durationSlider.addEventListener("input", whileDragging);
    durationSlider.addEventListener("change", seekTrack);
    track.addEventListener("timeupdate", updateDurationSlider);
    track.addEventListener("timeupdate", songTimeUpdate);


    // load track list
    function loadTrack(indexTrack) {
        track.src = trackList[indexTrack].song;
        albumCover.src = trackList[indexTrack].cover;
        title.textContent = trackList[indexTrack].title;
        artist.textContent = trackList[indexTrack].artist;    
        baseGradient.style.backgroundImage = trackList[indexTrack].gradient;
        track.load();
    }

    loadTrack(indexTrack)

    // play or pause song
    function playSong() {
        if (trackIsPlaying) {
            track.pause(); 
            trackIsPlaying = false;
            playIcon.classList.remove('pause');
            playIcon.classList.add('play'); 
        } else {
            track.play(); 
            trackIsPlaying = true;
            playIcon.classList.remove('play');
            playIcon.classList.add('pause'); 
        }
    }

    // next song
    function nextSong() {
        if (indexTrack < trackList.length - 1) {
            indexTrack++;
        } else {
            indexTrack = 0;
        }
        loadTrack(indexTrack)

        if (trackIsPlaying || autoPlay === 1) {
            track.play();
            trackIsPlaying = true;
        }
    }

    // previous song
    function prevSong() {
        if (indexTrack > 0) {
            indexTrack--;
        } else {
            indexTrack = trackList.length - 1;
        }
        loadTrack(indexTrack)

        if (trackIsPlaying) {
            track.play();
        }
    }

    // mute
    function muteSound() {
        if (track.volume > 0) {
            track.volume = 0;
            currentVolume.value = 0;
        } else {
            track.volume = 0.5;
            currentVolume.value = 50;
        }
        updateVolumeToggle();
        updateVolumeSlider();
        changeVolume();
    }

    //change volume with slider
    function changeVolume() {
        let volumePercentage = (currentVolume.value / 100) * 100;
        currentVolume.style.setProperty("--fill-percentage", `${volumePercentage}%`);
        track.volume = currentVolume.value / 100;
        updateVolumeToggle();
    }

    // update volume icon
    function updateVolumeToggle() {
        if (track.volume === 0) {
            muteIcon.style.display = "inline";
            volumeIcon.style.display = "none";
        } else {
            muteIcon.style.display = "none";
            volumeIcon.style.display = "inline";
        }
    }

    // update volume slider fill percentage
    function updateVolumeSlider() {
        let volumePercentage = (currentVolume.value / 100) * 100;
        currentVolume.style.setProperty("--fill-percentage", `${volumePercentage}%`);
    }

    // change duration
    function updateDurationSlider() {
        if (!isDragging && track.duration) {
            let progress = (track.currentTime / track.duration) * 100;
            durationSlider.style.setProperty("--fill-percentage", `${progress}%`);
            durationSlider.value = progress;
        }
    }
    function whileDragging() {
        isDragging = true; 
        let progress = durationSlider.value;
        durationSlider.style.setProperty("--fill-percentage", `${progress}%`);
    }
    function seekTrack() {
        let sliderPosition = (durationSlider.value / 100) * track.duration;
        track.currentTime = sliderPosition;
        isDragging = false;
    }

    // update song timer
    function songTimeUpdate() {
        if (track.duration) {
            let currentMins = Math.floor(track.currentTime / 60);
            let currentSecs = Math.floor(track.currentTime - currentMins * 60);
            let durationMins = Math.floor(track.duration / 60);
            let durationSecs = Math.floor(track.duration - durationMins * 60);

            if (durationSecs < 10) {
                durationSecs = "0" + durationSecs
            }
            
            if (currentSecs < 10) {
                currentSecs = "0" + currentSecs
            }
            trackCurrentTime.innerHTML = currentMins + ":" + currentSecs
            trackDuration.innerHTML = durationMins + ":" + durationSecs
        } else {
            trackCurrentTime.innerHTML = "0" + ":" + "00"
            trackDuration.innerHTML = "0" + ":" + "00"
        }
    }

    // auto play
    function autoPlayToggle() {
        autoPlay = autoPlay === 0 ? 1 : 0;
        autoPlaySvg.querySelector("path").setAttribute("stroke", autoPlay ? "#44b844" : "#ffffff");
    }
    track.addEventListener("ended", function () {
        if (autoPlay === 1) {
            nextSong();
        }
    });

});