import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import AuthContext from '../../context/auth/authContext';
import RegItem from './RegItem';
import { format, parseISO } from 'date-fns';

export default function Registrator() {
  const authContext = useContext(AuthContext);

  // const history = useHistory();

  const { loadUser } = authContext;

  const [registration, setRegistration] = useState();

  let date = new Date().toISOString();
  const formattedDate = format(parseISO(date), 'dd/MM/yyyy');
  const formattedTime = format(parseISO(date), 'kk:mm:ss');

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  });
  /* 
  const {
    klant,
    datum,
    startTime,
    endTime,
    soortVraag,
    vraag,
    antwoord,
    tijd,
  } = registration;
 */
  const onChange = (e) => {
    let { name, value } = e.target;
    setRegistration((registration) => {
      return {
        ...registration,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <Navbar />
      {/* onclick should start timer, and display a new collection of input fields */}

      <div className='dateNtime'>
        <h3>{formattedDate}</h3>
        <h5>{formattedTime}</h5>
      </div>

      <form>
        <div className='regItemContainer'>
          <RegItem />
          <RegItem />
          <RegItem />
          <RegItem />
        </div>

        {/* end registrate new client */}

        <div className='questionContainer'>
          <h5 className='text-center'>Nieuwe vraag</h5>
          {/*soort vraag                  selection*/}
          <div className='formItem'>
            <div>
              <label htmlFor='soortVraag'>Soort vraag</label>
            </div>
            <div>
              <select
                className='custom-select'
                name='soortVraag'
                id='soortVraag'
                onChange={onChange}
                required>
                <option value='- Maak een keuze -' defaultValue disabled hidden>
                  - Maak een keuze -
                </option>
                <option value='Account instellen'>Account instellen</option>
                <option value='Advies producten'>Advies producten</option>
                <option value='Bestandsoverdracht'>Bestandsoverdracht</option>
                <option value='Bib gegevens'>Bib gegevens</option>
                <option value='Hacks, virussen ed.'>Hacks, virussen ed.</option>
                <option value='Kaartlezen (bank, id)'>
                  Kaartlezen (bank, id)
                </option>
                <option value='Krook PCs'>Krook PCs</option>
                <option value='Office documenten'>Office documenten</option>
                <option value='Print- en scanhulp'>Print- en scanhulp</option>
                <option value='Sociale media'>Sociale media</option>
                <option value='Surfhulp - browser'>Surfhulp - browser</option>
                <option value='Toestellen en OS'>Toestellen en OS</option>
                <option value='Wifi, mobiele data, BT'>
                  Wifi, mobiele data, BT
                </option>
                <option value='Andere'>Andere</option>
              </select>
            </div>
          </div>

          {/*vraag                      text input*/}
          <div className='formItem'>
            <div>
              <label htmlFor='vraag'>Vraag</label>
            </div>
            <div>
              <input
                className='form-control'
                placeholder='Vraag'
                type='text'
                name='vraag'
                id='vraag'
                onChange={onChange}
                required
              />
            </div>
          </div>

          {/*antwoord                      text input*/}
          <div className='formItem'>
            <div>
              <label htmlFor='antwoord'>Antwoord</label>
            </div>
            <div>
              <input
                className='form-control'
                placeholder='antwoord'
                type='text'
                name='antwoord'
                id='antwoord'
                onChange={onChange}
                required
              />
            </div>
          </div>

          {/*tijd                      text input*/}
          <div className='formItem'>
            <div>
              <label htmlFor='tijd'>tijd</label>
            </div>
            <div>
              <input
                className='form-control'
                type='time'
                name='tijd'
                id='tijd'
                onChange={onChange}
                required
              />
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
}
