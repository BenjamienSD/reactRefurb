import React, { Fragment, useContext } from 'react';
import logo from '../../img/digiwieLogo.png';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

export default function Navbar() {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  return (
    <nav
      className='navbar navbar-expand-lg navbar-light'
      style={{ backgroundColor: '#e3f2fd', padding: '0', height: '50px' }}>
      <img src={logo} alt='digipuntlogo' style={{ width: '50px' }} />
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarText'
        aria-controls='navbarText'
        aria-expanded='false'
        aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarText'>
        <ul className='navbar-nav mr-auto'>
          <div className='navDiv'>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                activeClassName='active'
                to='/formulier'>
                Formulier
                <span className='sr-only'>(current)</span>
              </NavLink>
            </li>
          </div>
          <div className='navDiv'>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                activeClassName='active'
                to='/table'>
                Bestelgeschiedenis
              </NavLink>
            </li>
          </div>
        </ul>

        <Fragment>
          <a
            href='/login'
            className='nav-item nav-link'
            style={{ color: '#5cbfc4' }}
            onClick={() => {
              logout();
            }}>
            <span className='hide-sm'> Uitloggen </span>
            <i className='fas fa-sign-out-alt'></i>
          </a>
        </Fragment>
      </div>
    </nav>
  );
}
