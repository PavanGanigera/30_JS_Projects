const container = document.getElementById('seat-container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const bookBtn = document.getElementById('bookBtn');

populateUI();
let ticketPrice = +movieSelect.value;

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatIndices = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatIndices));
    localStorage.setItem('movieIndex', movieSelect.selectedIndex);
    localStorage.setItem('ticketPrice', ticketPrice);

    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * ticketPrice;
    // console.log("Selected Seat Count:", selectedSeats.length);
}

function populateUI() {
    const selected = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    const booked = JSON.parse(localStorage.getItem('bookedSeats')) || [];


    seats.forEach((seat, index) => {
        seat.classList.remove('selected', 'booked');
        if (selected.includes(index)) seat.classList.add('selected');
        if (booked.includes(index)) seat.classList.add('booked');
    });

    const savedMovieIndex = localStorage.getItem('movieIndex');
    if (savedMovieIndex !== null) movieSelect.selectedIndex = savedMovieIndex;
}

container.addEventListener('click', e => {

    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied') && !e.target.classList.contains('booked')
    ) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    updateSelectedCount();
});

bookBtn.addEventListener('click', () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedIndices = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    let bookedSeats = JSON.parse(localStorage.getItem('bookedSeats')) || [];

    bookedSeats = [...new Set([...bookedSeats, ...selectedIndices])];
    localStorage.setItem('bookedSeats', JSON.stringify(bookedSeats));
    localStorage.removeItem('selectedSeats');

    selectedSeats.forEach(seat => seat.classList.remove('selected'));
    selectedSeats.forEach(seat => seat.classList.add('booked'));

    updateSelectedCount();
    
    if (selectedSeats.length > 0) {
        alert(`You have successfully booked ${selectedSeats.length} seats.`);
    }
    else {
        alert('No seats selected.');
    }

    if (bookedSeats.length > 0) {
        alert(`in this theater booked ${bookedSeats.length - 1} seats.`);
    }

});

updateSelectedCount();