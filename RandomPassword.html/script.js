let pwdbox = document.getElementById('password');
let generateBtn = document.getElementById('Genarator');
let copyBtn = document.querySelector('.fa-clone');
let length = 12; // Default length of the password
let upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let lowerCase = 'abcdefghijklmnopqrstuvwxyz';
let numbers = '0123456789';
let symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
let allCharacters = upperCase + lowerCase + numbers + symbols;
let password = '';

function generatePassword() {
    password = '';
    for (let i = 0; i < 12; i++) {
        let randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }
    pwdbox.value = password;
}

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', function() {
    if (pwdbox.value === '') {
        alert('Please generate a password first!');
        return;
    }
    // old version
    // pwdbox.select();
    // document.execCommand('copy');
    // alert('Password copied to clipboard!');
    // new version
    navigator.clipboard.writeText(pwdbox.value)
    .then(() => {
      alert('Password copied to clipboard!');
    })
    .catch(err => {
      console.error('Failed to copy:', err);
    });

});