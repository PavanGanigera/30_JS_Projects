let display = document.getElementById('display');
let startStopBtn = document.getElementById('StartStop');
let resetBtn = document.getElementById('reset');
let stopBtn = document.getElementById('stop');
const playPauseIcon = document.querySelector('.icon');

let timer = null;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let running = false;

function updateDisplay() {
    let formattedHours = hours.toString().padStart(2, '0');
    let formattedMinutes = minutes.toString().padStart(2, '0');
    let formattedSeconds = seconds.toString().padStart(2, '0');
    let formattedMilliseconds = milliseconds.toString().padStart(3, '0'); // for 3 digit ms
    display.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}

function startStopwatch() {
    milliseconds += 10; // increase 10ms every 10ms
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    updateDisplay();
}

startStopBtn.addEventListener('click', function () {
    if (running) {
        clearInterval(timer);
    } else {
        timer = setInterval(startStopwatch, 10); // update every 10ms
    }
    // Toggle play/pause icon
    running = !running;

    playPauseIcon.classList.toggle('fa-play');
    playPauseIcon.classList.toggle('fa-pause');
});

stopBtn.addEventListener('click', function () {
    clearInterval(timer);
    running = false;
    playPauseIcon.classList.add('fa-play');
    playPauseIcon.classList.remove('fa-pause');
});

resetBtn.addEventListener('click', function () {
    clearInterval(timer);
    running = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
    playPauseIcon.classList.add('fa-play');
    playPauseIcon.classList.remove('fa-pause');
});

// Initial display
updateDisplay();
