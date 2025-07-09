/* -------spotify music player------- */
document.addEventListener('DOMContentLoaded', function () {
    
    // Playback controls
    const play = document.querySelector(".button-container-play");
    const playIcon = play.querySelector("div");
    const previous = document.querySelector(".button.back");
    const next = document.querySelector(".button.next");

    // Selected song display
    const albumCover = document.querySelector(".album-cover");
    const baseGradient = document.querySelector(".spotify.base");
    const title = document.querySelector("#title");
    const artist = document.querySelector("#artist");

    // Liked controls
    const likedToggle = document.querySelector(".liked-toggle");
    const likedIcon = document.querySelector("#liked");
    const notLikedIcon = document.querySelector("#not-liked");

    // Loop controls
    const autoPlayBtn = document.querySelector(".loop-icon");
    const autoPlaySvg = autoPlayBtn.querySelector("svg");

    // Volume controls
    const currentVolume = document.querySelector("#volume-slider");
    const volumeToggle = document.querySelector(".volume-toggle");
    const muteIcon = document.querySelector("#mute-icon");
    const volumeIcon = document.querySelector("#volume-icon");

    // Duration controls
    const durationSlider = document.querySelector("#duration-slider");
    const trackCurrentTime = document.querySelector(".current-time");
    const trackDuration = document.querySelector(".duration-time");
    
    let autoPlay = 0;
    let indexTrack = 0;
    let trackIsPlaying = false;
    let isDragging = false;
    let track = document.createElement("audio");
    
    //playlist
    let trackList = [
        {
            title: "Congratulations",
            artist: "MGMT",
            cover: "media/spotify-window-assets/MGMT-Congratulations.jpg",
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
            cover: "./media/spotify-window-assets/TMBG-cover.jpg",
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
    likedToggle.addEventListener("click", likeSong);
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
        updateVolumeSlider();
        changeVolume();
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
            currentVolume.value = 10;
        }
        updateVolumeToggle();
        updateVolumeSlider();
        changeVolume();
    }

    // toggle liked
    function likeSong() {
        if (notLikedIcon.style.display === "inline") {
            likedIcon.style.display = "inline";
            notLikedIcon.style.display = "none";
        } else {
            likedIcon.style.display = "none";
            notLikedIcon.style.display = "inline";
        }
    }

    //change volume with slider
    function changeVolume() {
        let volumePercentage = (currentVolume.value / 100) * 100;
        currentVolume.style.setProperty("--fill-percentage", `${volumePercentage}%`);
        track.volume = currentVolume.value / 100;
        updateVolumeToggle();
    }
    // update volume slider fill percentage
    function updateVolumeSlider() {
        let volumePercentage = (currentVolume.value / 100) * 100;
        currentVolume.style.setProperty("--fill-percentage", `${volumePercentage}%`);
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

    // change duration
    function updateDurationSlider() {
        if (!isDragging && track.duration) {
            let progress = (track.currentTime / track.duration) * 100;
            durationSlider.style.setProperty("--fill-percentage", `${progress}%`);
            durationSlider.value = progress;
        }
        requestAnimationFrame(updateDurationSlider);
    }
    requestAnimationFrame(updateDurationSlider)
    
    
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
        autoPlaySvg.querySelector("path").setAttribute("stroke", autoPlay ? "#ffafca" : "#ffffff");
    }
    track.addEventListener("ended", function () {
        if (autoPlay === 1) {
            nextSong();
        }
    });

    // song list
    const songList = document.querySelector(".song-list");
    const closeSongList = document.querySelector(".close-song-list");
    const songListButton = document.querySelector(".dot-menu");

    songListButton.addEventListener("click", () => {
        songList.classList.add("show");
    });
    closeSongList.addEventListener("click", () => {
        songList.classList.remove("show");
    });

    trackList.forEach((song, index) => {
        const li = document.createElement("li");
        li.innerHTML =
            `<div class="song-item"> 
                <img class="list-cover" src="${song.cover}" alt="${song.title}">
                <div class="song-info">
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                </div>
            <div/>`;
        li.addEventListener("click", () => {
            indexTrack = index;
            loadTrack(indexTrack);
            playSong();
        });
        songList.appendChild(li);
    });
});