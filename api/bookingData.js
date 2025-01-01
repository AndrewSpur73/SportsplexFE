import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllBookings = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bookings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getOwnerBookings = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bookings/user/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleBooking = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bookings/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createBooking = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const editBooking = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bookings/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.text())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteBooking = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bookings/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getUserBookings = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bookings/attend/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// RSVP to a boooking
const createReservation = (bookingId, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bookings/attend?bookingId=${bookingId}&userId=${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// unRSVP to booking
const removeReservation = (userId, bookingId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bookings/attend/${userId}/${bookingId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      console.log('status:', res);
      if (res.status === 204) {
        resolve({});
      } else {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const toggleRSVP = (userId, bookingId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bookings/${userId}/reserved/${bookingId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json().catch(() => ({})))
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllBookings,
  getOwnerBookings,
  getSingleBooking,
  getUserBookings,
  deleteBooking,
  editBooking,
  createBooking,
  createReservation,
  removeReservation,
  toggleRSVP,
};
