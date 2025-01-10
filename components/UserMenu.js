/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function UserMenu() {
  const { user } = useAuth();

  return (
    <Dropdown align="end" navbar="true" className=" last:mt-auto">
      <Dropdown.Toggle style={{ borderColor: '#939393' }} className="border-3 bg-transparent">
        <img src={user.image} alt={`${user.displayName}`} style={{ height: '75px', width: '100px' }} className="rounded-full" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="rounded-lg">
        <Dropdown.Item style={{ fontWeight: 'bold' }} onClick={signOut}>Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
