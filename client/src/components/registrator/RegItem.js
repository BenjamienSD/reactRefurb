import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';

function RegItem() {
  const [registration, setRegistration] = useState();
  const [buttonState, setButton] = useState('start');

  let date = new Date().toISOString();
  const formattedDate = format(parseISO(date), 'dd/MM/yyyy');

  const onChange = (e) => {
    let { name, value } = e.target;
    setRegistration((registration) => {
      return {
        ...registration,
        [name]: value,
      };
    });
  };

  const onClick = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    if (buttonState === 'start') {
      setButton('stop');
    } else if (buttonState === 'stop') {
      setButton('start');
    }
  };

  return (
    <div>
      {/* begin registrate new client */}
      <div className='registrator'>
        <h5>PC #</h5>
        {/*naam                       text input*/}
        <div>
          <div>
            <input
              className='form-control'
              placeholder='Naam'
              type='text'
              name='klant'
              id='klant'
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className='timers'>
          {' '}
          {/*startTime                     displays start time duh*/}
          <div className='formItem'>
            <div>
              <label htmlFor='startTime'>Start</label>
            </div>
            <div>
              <p>--:--</p>
            </div>
          </div>
          {/*endTime                     displays end time duh*/}
          <div className='formItem'>
            <div>
              <label htmlFor='endTime'>Eind</label>
            </div>
            <div>
              <p>--:--</p>
            </div>
          </div>
        </div>
        {/*startTime                     displays start time duh*/}
        <div className='formItem'>
          <div>
            <label htmlFor='startTime'>Duur:</label>
          </div>
          <div>
            <p>--:--</p>
          </div>
        </div>

        <button
          className={
            buttonState === 'start' ? 'btn btn-info' : 'btn btn-danger'
          }
          onClick={onClick}>
          {buttonState}
        </button>
      </div>

      {/* end registrate new client */}
    </div>
  );
}

export default RegItem;
