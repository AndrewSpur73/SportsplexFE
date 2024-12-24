/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ padding: '5px 0', paddingBottom: '5px' }}>
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>            <img
            src="\images\Sportsplex.png"
            alt="Sportsplex Logo"
            style={{ height: '80px', width: 'auto' }}
          />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center' }}>
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link style={{ marginLeft: '15px', marginRight: '20px', height: '50px' }}>Home</Nav.Link>
            </Link>
            <Link passHref href="/booking/new">
              <Nav.Link style={{ marginRight: 'auto', marginLeft: '10px', height: '50px' }}>NEW BOOKING</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut} style={{ height: '50px' }}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
