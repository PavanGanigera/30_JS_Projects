const dateInput = document.getElementById('Date');
window.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  dateInput.max = today;

  // Open date picker when clicking anywhere on the input
  dateInput.addEventListener('click', () => {
    if (dateInput.showPicker) {
      dateInput.showPicker();
    }
  });

});

document.getElementById('Calculate').addEventListener('click', () => {
  let birthDateInput = document.getElementById('Date').value;
  const today = new Date();
  const birthDate = new Date(birthDateInput);

  if (!birthDateInput) {
    alert('Please select your birthdate.');
    return;
  }
  const FormatToday = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

  if (FormatToday === birthDateInput) {
    alert('Hey there! You are born today!');
    alert('🎉 Happy Birthday! 🎉');

    setTimeout(() => {
      dateInput.value = '';
    }, 2000);
    
    return;
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();
  // Adjust months and years if needed
  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += prevMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }
  alert(`You are ${years} year(s), ${months} month(s), and ${days} day(s) old.`);
  setTimeout(() => {
    dateInput.value = '';
  }, 2000);
});