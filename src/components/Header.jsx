import React from 'react';

const Header = ({ children, center = true }) => {
  return (
    <header
      className={`flex w-full items-center ${center ? 'justify-center' : 'justify-between'} container border-b py-[12px] lg:py-4`}
    >
      {children}
    </header>
  );
};

export default Header;
