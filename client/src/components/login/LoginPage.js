import React from 'react';
import ocmw from '../../img/logo_ocmw_gent_zonder_witrand.png';
import ateljee from '../../img/Logo_Ateljee_web-800.png';
import digipunt from '../../img/digiwieLogo.png';
import ftc from '../../img/klein-logo.png';
import LoginForm from '../login/LoginForm';
import Footer from '../layout/Footer';

export default function LoginPage() {
  return (
    <div className='loginPageContainer'>
      <div className='presentation'>
        <div className='presentation-header'>
          <h1>Bestelling Refurbished Laptop</h1>
        </div>
        <div className='loginForm'>
          <LoginForm />
        </div>
        <div className='presentation-body'>
          <h6>In samenwerking met</h6>
          <div className='logos'>
            <div className='company'>
              <img src={ocmw} alt='ocmw' />
            </div>
            <div className='company'>
              <img src={ateljee} alt='ateljee' />
            </div>
            <div className='company'>
              <img src={digipunt} alt='digipunt' />
            </div>
            <div className='company'>
              <img src={ftc} alt='ftc' />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
