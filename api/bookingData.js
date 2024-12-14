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
    method: 'PATCH',
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

export {
  getAllBookings,
  getOwnerBookings,
  getSingleBooking,
  getUserBookings,
  deleteBooking,
  editBooking,
  createBooking,
};
