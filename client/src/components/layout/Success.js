import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='success'>
          <div className='successTitle'>
            <h1>Registratie geslaagd!</h1>
          </div>
          <div className='mb-5'>
            <div className='icon icon--order-success svg'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='72px'
                height='72px'>
                <g fill='none' stroke='#8EC343' strokeWidth='2'>
                  <circle
                    cx='36'
                    cy='36'
                    r='35'
                    style={{
                      strokeDasharray: '240px, 240px',
                      strokeDashoffset: '480px',
                    }}></circle>
                  <path
                    d='M17.417,37.778l9.93,9.909l25.444-25.393'
                    style={{
                      strokeDasharray: '50px, 50px',
                      strokeDashoffset: '0px',
                    }}></path>
                </g>
              </svg>
            </div>
          </div>
          <div className='mt-5'>
            <Link to='/table'>
              <button className='btn btn-lg btn-info'>Resultaten</button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
