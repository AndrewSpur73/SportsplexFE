import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getLocations = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/locations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const createLocation = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/locations`, {
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

const deleteLocation = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/locations/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const editLocation = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/locations/${payload.id}`, {
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

export {
  getLocations,
  createLocation,
  deleteLocation,
  editLocation,
};
