
let alarmTime = null;
const timeDisplay = document.getElementById('timeDisplay');
const alarmInput = document.getElementById('alarmTime');
const setAlarmBtn = document.getElementById('setAlarm');
const clearAlarmBtn = document.getElementById('clearAlarm');
const alarmSound = document.getElementById('alarmSound');
const alarmModal = document.getElementById('alarmModal');
const stopAlarm = document.getElementById('stopAlarm');
const snoozeAlarm = document.getElementById('snoozeAlarm');
const toastContainer = document.getElementById('toastContainer');

// Toast Function with Progress Bar
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  let color = '';
  
  if (type === 'success') color = 'bg-green-500';
  else if (type === 'error') color = 'bg-red-500';
  else if (type === 'warning') color = 'bg-yellow-500';
  else color = 'bg-blue-500';

  toast.className = `${color} text-white px-4 py-2 rounded shadow-md animate-bounce relative`;

  // Message Text
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  toast.appendChild(messageDiv);

  // Progress Bar
  const progressBarContainer = document.createElement('div');
  progressBarContainer.className = "absolute bottom-0 left-0 w-full bg-gray-300 rounded-b-lg";
  const progressBar = document.createElement('div');
  progressBar.className = "h-1 bg-white rounded-b-lg";
  progressBarContainer.appendChild(progressBar);
  toast.appendChild(progressBarContainer);

  toastContainer.appendChild(toast);

  // Start Progress
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += 1;
    progressBar.style.width = `${progress}%`;

    // Remove toast after 3 seconds
    if (progress === 100) {
      clearInterval(progressInterval);
      setTimeout(() => toast.remove(), 500); // Wait a bit before removing
    }
  }, 30); // 30ms for smooth progress

  // Remove after 3 seconds if progress didn't complete
  setTimeout(() => {
    if (progress < 100) {
      clearInterval(progressInterval);
      toast.remove();
    }
  }, 3000);
}

// Update clock every second
setInterval(() => {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-GB', { hour12: false }); // 24-hour format
  timeDisplay.textContent = timeString;

  // Check if alarm time matches current time (HH:MM)
  if (alarmTime && timeString.substring(0, 5) === alarmTime) {
    alarmSound.play();
    alarmModal.classList.remove('hidden'); // Show alert modal
  }
}, 1000);

// Set Alarm
setAlarmBtn.addEventListener('click', () => {
  alarmTime = alarmInput.value;
  if (alarmTime) {
    showToast(`✅ Alarm is set for ${alarmTime}`, 'success');
  } else {
    showToast('⚠️ Please select a valid time.', 'warning');
  }
});

// Clear Alarm
function clearAlarm() {
  alarmTime = null;
  alarmSound.pause();
  alarmSound.currentTime = 0;

}

clearAlarmBtn.addEventListener('click', () => {
  clearAlarm();
  showToast('🚫 Alarm cleared!', 'error');
});

// Stop Alarm Button
stopAlarm.addEventListener('click', () => {
  clearAlarm();
  showToast('🚫 Alarm stopped!', 'error');
  alarmModal.classList.add('hidden');
});

// Snooze Alarm Button (Updated for 1 Minute)
snoozeAlarm.addEventListener('click', () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 1);  // Add 1 minute for snooze
  const newAlarmTime = now.toLocaleTimeString('en-GB', { hour12: false }).substring(0, 5); // Correct time format

  // Ensure alarmTime is updated
  alarmTime = newAlarmTime;

  showToast(`😴 Snoozed for 1 minute. New Alarm: ${alarmTime}`, 'warning');  // Show toast
  alarmModal.classList.add('hidden');
});
