import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className='footer'>
      <p className='footerText'>&copy; Digipunt {currentYear}</p>
    </div>
  );
}
