import React, { useState, useContext, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Navigator() {
  return (
    <div>
      <Navbar />
      <button>registraties</button>
      <button>refurb</button>
      <Footer />
    </div>
  );
}
