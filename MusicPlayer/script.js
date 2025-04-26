let progressBar = document.getElementById('progressBar');
let song = document.getElementById('song');
let playPauseIcon = document.getElementById('playPauseIcon');

song.onloadedmetadata = function () {
    progressBar.max = song.duration;
    progressBar.value = 0;
    setInterval(() => {
        progressBar.value = song.currentTime;
    }, 500);
}
song.ontimeupdate = function () {
    progressBar.value = song.currentTime;
};
song.onended = function () {
    playPauseIcon.classList.add('fa-play');
    playPauseIcon.classList.remove('fa-pause');
    songImg.classList.remove('playing');
};

playPauseIcon.addEventListener('click', function () {
    if (song.paused) {
        song.play();
    } else {
        song.pause();
    }

    // Toggle between play and pause icons
    playPauseIcon.classList.toggle('fa-play');
    playPauseIcon.classList.toggle('fa-pause');
    songImg.classList.toggle('playing');
});

progressBar.addEventListener('input', function () {
    song.currentTime = progressBar.value;
});

document.addEventListener('keyup', function (e) {
    if (e.code === 'Space') {
        if (song.paused) {
            song.play();
        } else {
            song.pause();
        }

        // Toggle between play and pause icons
        playPauseIcon.classList.toggle('fa-play');
        playPauseIcon.classList.toggle('fa-pause');
        songImg.classList.toggle('playing');
    }
});