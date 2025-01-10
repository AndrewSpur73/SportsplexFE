/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
} from 'react-bootstrap';
import UserMenu from './UserMenu';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" style={{ padding: '5px 0', backgroundColor: '#939393' }}>
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <img
              src="\images\Sportsplex.png"
              alt="Sportsplex Logo"
              style={{ height: '100px', width: 'auto' }} // Increased the logo size
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            className="me-auto"
            style={{
              fontSize: '1.25rem', fontWeight: '500', fontFamily: '"Helvetica Neue", Arial, sans-serif', display: 'flex', alignItems: 'center',
            }}
          >
            <Link passHref href="/">
              <Nav.Link
                style={{
                  marginLeft: '15px',
                  marginRight: '20px',
                  height: '50px',
                  fontWeight: '600',
                  color: '#060b3b',
                  transition: 'color 0.3s, transform 0.3s',
                  fontSize: '1.25rem',
                }}
                className="navbar-link"
              >
                Home
              </Nav.Link>
            </Link>
            <Link passHref href="/booking/new">
              <Nav.Link
                style={{
                  marginRight: 'auto',
                  marginLeft: '10px',
                  height: '50px',
                  fontWeight: '600',
                  color: '#060b3b',
                  transition: 'color 0.3s, transform 0.3s',
                  fontSize: '1.25rem',
                }}
                className="navbar-link"
              >
                Create a Booking
              </Nav.Link>
            </Link>
            <Link passHref href="/booking/booked">
              <Nav.Link
                style={{
                  marginRight: 'auto',
                  marginLeft: '10px',
                  height: '50px',
                  fontWeight: '600',
                  color: '#060b3b',
                  transition: 'color 0.3s, transform 0.3s',
                  fontSize: '1.25rem',
                }}
                className="navbar-link"
              >
                My Bookings
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div className="usermenu">
        <UserMenu />
      </div>
    </Navbar>
  );
}
