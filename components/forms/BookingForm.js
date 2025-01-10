import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import {
  Button, Card, Container,
} from 'react-bootstrap';
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
    <Container style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
      <Card style={{
        width: '100%', maxWidth: '800px', backgroundColor: '#f8f9fa', border: '1px solid #6c757d', borderRadius: '8px', padding: '20px',
      }}
      >
        <Card.Body>
          <Card.Title style={{
            textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: '#060b3b', // Updated color
          }}
          >
            {obj.id ? 'Update' : 'Create'} a Booking
          </Card.Title>

          {isOwner ? (
            <Form onSubmit={handleSubmit}>
              {/* Facility Input */}
              <Form.Group controlId="formFacility" className="mb-3">
                <Form.Label style={{ fontWeight: 'bold', color: '#060b3b' }}>Facility</Form.Label> {/* Updated color */}
                <Form.Control
                  type="text"
                  placeholder="Enter a facility"
                  name="facility"
                  value={formInput.facility}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Sport Space Input */}
              <Form.Group controlId="formSportSpace" className="mb-3">
                <Form.Label style={{ fontWeight: 'bold', color: '#060b3b' }}>Sport Space</Form.Label> {/* Updated color */}
                <Form.Control
                  type="text"
                  placeholder="Enter the name of the field, court, pool, etc."
                  name="sportSpace"
                  value={formInput.sportSpace}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Description Textarea */}
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label style={{ fontWeight: 'bold', color: '#060b3b' }}>Description</Form.Label> {/* Updated color */}
                <Form.Control
                  as="textarea"
                  placeholder="Enter a description"
                  style={{ height: '100px' }}
                  name="description"
                  value={formInput.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Image URL */}
              <Form.Group controlId="formBasicImage" className="mb-3">
                <Form.Label style={{ fontWeight: 'bold', color: '#060b3b' }}>Image URL</Form.Label> {/* Updated color */}
                <Form.Control
                  type="url"
                  placeholder="Enter an image URL"
                  name="image"
                  value={formInput.image || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Sport Categories */}
              <Form.Label style={{ fontWeight: 'bold', color: '#060b3b' }}>Category</Form.Label> {/* Updated color */}
              <Form.Select
                aria-label="Category"
                name="categoryId"
                onChange={handleChange}
                value={formInput.categoryId}
                required
              >
                <option value="">Select a Sport</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>

              {/* Locations */}
              <Form.Label style={{ fontWeight: 'bold', color: '#060b3b' }}>Location</Form.Label> {/* Updated color */}
              <Form.Select
                aria-label="Location"
                name="locationId"
                onChange={handleChange}
                value={formInput.locationId}
                required
              >
                <option value="">Select a Location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </Form.Select>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                style={{
                  width: '100%', fontSize: '16px', padding: '10px', marginTop: '20px',
                }}
              >
                {obj.id ? 'Update' : 'Create'} Booking
              </Button>
            </Form>
          ) : (
            <p style={{ textAlign: 'center', color: '#6c757d' }}>You do not have permission to edit this booking.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
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
