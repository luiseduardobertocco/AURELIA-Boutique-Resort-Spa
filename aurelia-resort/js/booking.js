const bookingModule = {
  init() {
    const form = document.querySelector('.booking-form');
    if (!form) return;

    const message = form.querySelector('.form-message');
    const checkIn = form.querySelector('#checkin');
    const checkOut = form.querySelector('#checkout');
    const guests = form.querySelector('#guests');
    const room = form.querySelector('#room');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!checkIn.value || !checkOut.value || !guests.value || !room.value) {
        message.textContent = 'Please complete all fields before submitting.';
        return;
      }

      if (new Date(checkOut.value) <= new Date(checkIn.value)) {
        message.textContent = 'Check-out date must be after check-in date.';
        return;
      }

      if (Number(guests.value) < 2) {
        message.textContent = 'Guest count must be at least 2.';
        return;
      }

      message.textContent = 'Your request has been received. Our concierge will contact you shortly.';
    });
  },
};

document.addEventListener('DOMContentLoaded', () => {
  bookingModule.init();
});
