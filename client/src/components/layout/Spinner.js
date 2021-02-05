import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default function Spinner() {
  return (
    <Fragment>
      <div className='container'>
        <img src={spinner} className='spinner' alt='Loading...' />
      </div>
    </Fragment>
  );
}
