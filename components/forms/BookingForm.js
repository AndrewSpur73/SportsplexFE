import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button, FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getCategories } from '../../api/categoryData';
import { createBooking, editBooking } from '../../api/bookingData';
import { getLocations } from '../../api/locationData';

const initialState = {
  facility: '',
  sportSpace: '',
  description: '',
  image: '',
  rsvps: 0,
};

export default function BookingForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCategories().then(setCategories);
    getLocations().then(setLocations);
    if (obj.id) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let valueInt = null;
    if (name === 'categoryId' || name === 'locationId') {
      valueInt = parseInt(value, 10);
    }
    setFormInput((prevState) => ({
      ...prevState,
      [name]: valueInt || value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formInput, ownerId: user.id };
    if (obj.id) {
      // Ensure we're sending the correct form input
      editBooking(payload).then(() => router.push(`/booking/${obj.id}`));
    } else {
      // Handle booking creation
      console.warn(payload);
      createBooking(payload).then(() => {
        router.push('/');
      });
    }
  };

  const isOwner = !obj.id || obj.ownerId === user.id;

  return (
    <div className="flex w-[500px] mx-auto inter-normal">
      <div className="flex-grow mt-32">
        {isOwner ? (
          <Form onSubmit={handleSubmit}>
            <Form.Label>{obj.id ? 'Update' : 'Create'} Booking</Form.Label>

            {/* FACILITY INPUT */}
            <Form.Group controlId="formFacility" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter a facility"
                name="facility"
                value={formInput.facility}
                onChange={handleChange}
                className="input rounded-none"
                required
              />
            </Form.Group>

            {/* SPORT SPACE INPUT */}
            <Form.Group controlId="formSportSpace" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter the name of the field, court, pool, etc."
                name="sportSpace"
                value={formInput.sportSpace}
                onChange={handleChange}
                className="input rounded-none"
                required
              />
            </Form.Group>

            {/* DESCRIPTION TEXTAREA */}
            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Description"
                style={{ height: '100px' }}
                name="description"
                value={formInput.description}
                onChange={handleChange}
                className="input rounded-none"
                required
              />
            </Form.Group>

            {/* IMAGE */}
            <Form.Group controlId="formBasicImage" className="mb-3">
              <Form.Control
                type="url"
                name="image"
                placeholder="Enter an image URL"
                value={formInput.image || ''}
                onChange={handleChange}
                className="input rounded-none"
                required
              />
            </Form.Group>

            {/* SPORT CATEGORIES */}
            <FloatingLabel controlId="floatingSelect" label="Category">
              <Form.Select
                style={{ minHeight: '100px', fontSize: '23px' }}
                aria-label="Category"
                name="categoryId"
                onChange={handleChange}
                className="mb-3"
                value={formInput.categoryId}
                required
              >
                <option value="">Select a Sport</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id} type="number">
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>

            {/* LOCATIONS */}
            <FloatingLabel controlId="floatingSelect" label="Location">
              <Form.Select
                style={{ minHeight: '100px', fontSize: '23px' }}
                aria-label="Location"
                name="locationId"
                onChange={handleChange}
                className="mb-3"
                value={formInput.locationId}
                required
              >
                <option value="">Select a Location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id} type="number">
                    {location.name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>

            {/* SUBMIT BUTTON */}
            <Button type="submit" className="form-button">
              {obj.id ? 'Update' : 'Create'} Booking
            </Button>
          </Form>
        ) : (
          <p>You do not have permission to edit this booking.</p>
        )}
      </div>
    </div>
  );
}
BookingForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    facility: PropTypes.string,
    sportSpace: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    ownerId: PropTypes.number,
    location: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
};
BookingForm.defaultProps = {
  obj: initialState,
};
