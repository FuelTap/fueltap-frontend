import React from 'react';
import { Link } from 'react-router';
import { logoImg } from './Imports';

const Logo = () => {
  return (
    <Link to={'/'}>
      <img src={logoImg} alt="FuelTap's logo" />
    </Link>
  );
};

export default Logo;
