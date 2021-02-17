import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import FormContext from '../../context/form/formContext';
import AuthContext from '../../context/auth/authContext';
import Checkbox from './Checkbox';

export default function Form() {
  const formContext = useContext(FormContext);
  const authContext = useContext(AuthContext);

  const history = useHistory();

  const {
    addForm,
    current,
    clearCurrent,
    formDefault,
    updateForm,
  } = formContext;

  const { loadUser } = authContext;

  const [form, setForm] = useState(formDefault);

  // if a form was selected for update, load that form, otherwise blank form
  useEffect(() => {
    loadUser();
    if (current !== null) {
      setForm(current);
    } else {
      setForm(formDefault);
    }
    // eslint-disable-next-line
  }, [formContext, current, formDefault]);

  const {
    doorverwijs,
    betaalWijze,
    andereBetaalWijze,
    infoProviders,
    infoWifi,
    prijsKlasse,
    softwarePakket,
    datum,
    dossierNummer,
    contactPersoon,
    digiLocatie,
    medeWerker,
    doelGroep,
    klant,
    product,
    kopie,
    infoMap,
    infoHardware,
    infoGarantie,
    infoSoftware,
    infoBeego,
    werkingDigipunt,
  } = form;

  const onChange = (e) => {
    let { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      value = checked;
    }
    setForm((form) => {
      return {
        ...form,
        [name]: value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addForm(form);
    } else {
      updateForm(form);
    }
    history.push('/success');
    clearCurrent();
  };

  /*   const onCancel = () => {
    clearCurrent();
    history.push('/table');
  }; */

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='formHeader'>
          <h1>Bestelling Refurbished Laptop</h1>

          {/* {current && (
            <div>
              <h4>Bewerkingsmodus</h4>
            </div>
          )} */}
        </div>

        <form onSubmit={onSubmit}>
          {/*DEEL 1: INLEIDENDE VRAGEN*/}
          <div className='section'>
            <div className='sectionHeader'>
              <h2>Deel 1: Inleidende vragen</h2>
            </div>

            {/*doorverwijs                checkbox*/}

            <div className='formItem  mt-5'>
              <Checkbox
                name='doorverwijs'
                type='checkbox'
                className='custom-control-input'
                id='doorverwijs'
                value={doorverwijs}
                onChange={onChange}
                // if current !== null && current.dooverwijs === true, setChecked(true)
                // if current !== null && current.dooverwijs === false, setChecked(false)
                // if current === null, setChecked(false)
                current={current === null ? false : current.doorverwijs}
                text={'De klant heeft een doorverwijsbrief.'}
              />
            </div>

            {/*betaalwijze                selection*/}

            <div className='formItem mt-5'>
              <div>
                <label className='d-block' htmlFor='betaalWijze'>
                  <strong>Betaalwijze</strong>{' '}
                </label>

                <small className='text-muted'>
                  Bij voorkeur bankkaart of Payconiq
                </small>
              </div>
              <div>
                <select
                  className='custom-select'
                  name='betaalWijze'
                  id='betaalWijze'
                  value={betaalWijze}
                  onChange={onChange}
                  required
                  selected={
                    current !== null ? current.betaalWijze : betaalWijze
                  }>
                  <option value='' defaultValue disabled hidden>
                    - Maak een keuze -
                  </option>
                  <option value='Belfius'>Belfius</option>
                  <option value='Fortis'>Fortis</option>
                  <option value='Payconiq'>Payconiq</option>
                  <option value='Overschrijving'>Overschrijving</option>
                  <option value='Andere'>Andere</option>
                </select>
              </div>

              <div className='invalid-feedback'>
                Gelieve een keuze te maken.
              </div>

              <div className='formItem ml-0'>
                <div>
                  <label htmlFor='andere'>
                    Indien andere: welke bank / betaalwijze?
                  </label>
                </div>
                <input
                  className='form-control'
                  type='text'
                  name='andereBetaalWijze'
                  id='andereBetaalWijze'
                  value={andereBetaalWijze}
                  disabled={betaalWijze !== 'Andere'}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className='formItem mt-5'>
              <label className='d-block'>
                {' '}
                <strong>Info internet en wifi</strong>{' '}
              </label>
              <small className='text-muted mt-0'>
                Informeer klant over internetproviders en gratis WIFI
                mogelijkheden.
              </small>
            </div>

            {/*info internet providers    checkbox*/}

            <div className='formItem'>
              <Checkbox
                name='infoProviders'
                type='checkbox'
                className='custom-control-input'
                id='infoProviders'
                value={infoProviders}
                onChange={onChange}
                current={current === null ? '' : current.infoProviders}
                text={'Informatie providers gegeven.'}
              />
              <div>
                <small className='text-muted'>
                  Zie{' '}
                  <a
                    href='http://www.bestetarief.be/'
                    target='_blank'
                    rel='noopener noreferrer'>
                    {' '}
                    <strong>bestetarief.be</strong>{' '}
                  </a>{' '}
                  voor meer informatie.
                </small>
              </div>
            </div>

            {/*info wifi                  checkbox*/}

            <div className='formItem'>
              <Checkbox
                name='infoWifi'
                type='checkbox'
                className='custom-control-input'
                id='infoWifi'
                value={infoWifi}
                onChange={onChange}
                current={current === null ? '' : current.infoWifi}
                text={'Informatie over gratis WIFI in de stad Gent.'}
              />
              <div className='mt-0 mb-2'>
                <small className='text-muted'>
                  Zie{' '}
                  {/* <a
                    href='http://www.hierisgratiswifi.be/hotspots/Gent'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <strong>Hotspots Gent</strong>
                  </a>{' '}
                  of{' '} */}
                  <a
                    href='https://stad.gent/nl/bibliotheek/lenen-internet-faciliteiten-advies/internet-faciliteiten-advies/internet-wifi'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <strong>Wifi Gent</strong>
                  </a>{' '}
                  voor meer informatie.
                </small>
              </div>
            </div>

            {/*prijsklasse                checkbox*/}
            <div className='formItem  mt-5'>
              <label className='d-block'>
                {' '}
                <strong>Info prijsklasse en software</strong>{' '}
              </label>
              <small className='text-muted mt-0'>
                Overloop en vergelijk met de klant de prijsklasse van de
                computers en bijgeleverde software.
              </small>
            </div>
            <div className='formItem'>
              <Checkbox
                name='prijsKlasse'
                type='checkbox'
                className='custom-control-input'
                id='prijsKlasse'
                value={prijsKlasse}
                onChange={onChange}
                current={current === null ? '' : current.prijsKlasse}
                text={'Prijsklasse van €170 tot €350.'}
              />
            </div>

            {/*bijgeleverde software      checkbox*/}
            <div className='formItem'>
              <Checkbox
                name='softwarePakket'
                type='checkbox'
                className='custom-control-input'
                id='softwarePakket'
                value={softwarePakket}
                onChange={onChange}
                current={current === null ? '' : current.softwarePakket}
                text={'Bijgeleverde software.'}
              />
              <small className='text-muted'>
                Zie{' '}
                <a
                  href='https://pgeneration.be/?s=ocmw&post_type=product'
                  target='_blank'
                  rel='noopener noreferrer'>
                  <strong>FTC - OCMW</strong>
                </a>{' '}
                voor productspecificaties.
              </small>
            </div>
          </div>

          {/*DEEL 2: BESTELFORMULIER*/}
          <div className='section'>
            <div className='sectionHeader'>
              <h2>Deel 2: Bestelformulier</h2>
            </div>

            {/*datum                      date selection*/}
            <div className='formItem'>
              <div>
                <label htmlFor='datum'>Datum bestelling</label>
              </div>
              <div>
                <input
                  className='form-control'
                  type='date'
                  name='datum'
                  id='datum'
                  value={datum}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            {/*digipunt                   selection*/}
            <div className='formItem'>
              <div>
                <label htmlFor='digiLocatie'>Digipunt</label>
                <small className='text-muted'>
                  Geef aan bij welk Digipunt de klant zich aanbood.
                </small>
              </div>
              <div>
                <select
                  className='custom-select'
                  name='digiLocatie'
                  id='digiLocatie'
                  value={digiLocatie}
                  onChange={onChange}
                  required
                  selected={
                    current !== null ? current.digiLocatie : digiLocatie
                  }>
                  <option value='' defaultValue disabled hidden>
                    - Maak een keuze -
                  </option>
                  <option value='Brugsesteenweg'>Brugse</option>
                  <option value='Inburgering Gent'>In Gent</option>
                  <option value='Pannestraat'>Pannestr.</option>
                  <option value='UCO'>UCO</option>
                  <option value='VlaKa'>VlaKa</option>
                </select>
              </div>
            </div>

            {/*medewerker                 selection*/}
            <div className='formItem'>
              <div>
                <label htmlFor='medeWerker'>Medewerker</label>
                <small className='text-muted'>
                  Door welke Digipunt medewerker wordt deze bestelling
                  behandeld?
                </small>
              </div>
              <div>
                <select
                  className='custom-select'
                  name='medeWerker'
                  id='medeWerker'
                  value={medeWerker}
                  onChange={onChange}
                  required
                  selected={current !== null ? current.medeWerker : medeWerker}>
                  <option value='' defaultValue disabled hidden>
                    - Maak een keuze -
                  </option>
                  <option value='Benjamien Deprez'>Benjamien Deprez</option>
                  <option value='Jimmy Vangestel'>Jimmy Vangestel</option>
                  <option value='Johan Mariën'>Johan Mariën</option>
                  <option value='Kadrie Sadulova'>Kadrie Sadulova</option>
                  <option value='Koen Poté'>Koen Poté</option>
                  <option value='Mariette Vermeulen'>Mariette Vermeulen</option>
                  <option value='Michel Malin'>Michel Malin</option>
                  <option value='Obaidullah Safi'>Obaidullah Safi</option>
                  <option value='Patrick Moesick'>Patrick Moesick</option>
                  <option value='Peter Demuynck'>Peter Demuynck</option>
                  <option value='Siavash Changizi'>Siavash Changizi</option>
                  <option value='Solaiman Bahaduri'>Solaiman Bahaduri</option>
                </select>
              </div>
            </div>

            {/*doelgroep                  selection*/}
            <div className='formItem'>
              <div>
                <label htmlFor='doelGroep'>Doelgroep</label>
                <small className='text-muted'>
                  Wie is de doorverwijzende instantie?
                </small>
              </div>
              <div>
                <select
                  className='custom-select'
                  name='doelGroep'
                  id='doelGroep'
                  value={doelGroep}
                  onChange={onChange}
                  required
                  selected={current !== null ? current.doelGroep : doelGroep}>
                  <option value='' defaultValue disabled hidden>
                    - Maak een keuze -
                  </option>
                  <option value='OCMW'>OCMW</option>
                  <option value='Digitaal Werkt!'>Digitaal Werkt!</option>
                  <option value='Dienstenbedrijf Sociale Economie'>
                    Dienstenbedrijf Sociale Economie
                  </option>
                  <option value='Leenactie C.'>Leenactie Corona</option>
                  <option value='Gentenaar'>Gentenaar</option>
                </select>
              </div>
            </div>

            {/*naam                       text input*/}
            <div className='formItem'>
              <div>
                <label htmlFor='klant'>Naam klant</label>
                <small className='text-muted'>
                  Vul hier de naam van de klant in{' '}
                  <strong className='text-danger'>
                    (voornaam + achternaam)
                  </strong>{' '}
                  .
                </small>
              </div>
              <div>
                <input
                  className='form-control'
                  placeholder='Voornaam Naam'
                  type='text'
                  name='klant'
                  id='klant'
                  value={klant}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            {/*dossiernummer              text input*/}
            <div className='formItem'>
              <div>
                <label htmlFor='dossierNummer'>Dossiernummer</label>
                <small className='text-muted'>
                  Vul hier het{' '}
                  <strong className='text-danger'>dossiernummer</strong> in of{' '}
                  <strong className='text-danger'>'nvt'</strong> , zo er geen
                  nummer beschikbaar is.
                </small>
              </div>
              <div>
                <input
                  className='form-control'
                  placeholder='bvb: SD 123456'
                  type='text'
                  name='dossierNummer'
                  id='dossierNummer'
                  value={dossierNummer}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            {/*contactpersoon             text input*/}
            <div className='formItem'>
              <div>
                <label htmlFor='contactPersoon'>Contactpersoon</label>
                <small className='text-muted'>
                  Vermeld hier de contactpersoon die het doorverwijsformulier
                  ondertekende. <br /> Indien de doelgroep{' '}
                  <strong className='text-danger'>'Leenactie Corona'</strong>{' '}
                  is, vul je in dit veld 'Leenactie' in, eventueel gevolgd door
                  de naam van de school.
                </small>
              </div>
              <div>
                <input
                  className='form-control'
                  placeholder='Voornaam Naam'
                  type='text'
                  name='contactPersoon'
                  id='contactPersoon'
                  value={contactPersoon}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            {/*product                    text input*/}
            <div className='formItem'>
              <div>
                <label htmlFor='product'>Product</label>
                <small className='text-muted'>
                  Vermeld hier enkel productnummer en configuratie (voorbeeld:
                  003 14 INCH – 4GB – 120GB). Indien geen product werd besteld,
                  vermeld "geen". <br />
                  Indien meerdere laptops besteld worden moet elk toestel apart
                  geregistreerd worden.
                </small>
              </div>
              <div>
                <input
                  className='form-control'
                  placeholder='bvb: 001 14INCH – 8GB – 120GB'
                  type='text'
                  name='product'
                  id='product'
                  value={product}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>

          {/*DEEL 3: AFRONDING*/}
          <div className='section'>
            <div className='sectionHeader'>
              <h2>Deel 3: Afronding</h2>
            </div>

            {/*kopie                      checkbox*/}
            <div className='formItem'>
              <Checkbox
                name='kopie'
                type='checkbox'
                className='custom-control-input'
                id='kopie'
                value={kopie}
                onChange={onChange}
                current={current === null ? '' : current.kopie}
                text={'Kopie/scan doorverwijsformulier.'}
              />
              <small className='text-muted'>
                Geef aan of er een scan is gemaakt van het doorverwijsformulier.
              </small>
            </div>

            {/*infomap                    checkbox*/}
            <div className='formItem'>
              <Checkbox
                name='infoMap'
                type='checkbox'
                className='custom-control-input'
                id='infoMap'
                value={infoMap}
                onChange={onChange}
                current={current === null ? '' : current.infoMap}
                text={'Infomap.'}
              />
              <small className='text-muted'>
                Geef aan of de infomap is overlopen en meegegeven met de klant.
              </small>
            </div>

            {/*info hardware problemen    checkbox*/}
            <div className='formItem'>
              <label className='mb-3' htmlFor='infoHardware'>
                <strong>Defecten, garantie en herstellingen</strong>
              </label>
              <Checkbox
                name='infoHardware'
                type='checkbox'
                className='custom-control-input'
                id='infoHardware'
                value={infoHardware}
                onChange={onChange}
                current={current === null ? '' : current.infoHardware}
                text={
                  'Informatie over de herstellingsprocedure in geval van hardwareproblemen.'
                }
              />
              <small className='text-muted'>
                In het Digipunt wordt het defect beoordeeld. <br />
                In gevalle een hardware defect wordt het toestel in de originele
                doos door de klant terug gestuurd naar FTC. (doos dient dus
                bewaard te worden!).
              </small>
            </div>

            {/*info garantie              checkbox*/}
            <div className='formItem'>
              <Checkbox
                name='infoGarantie'
                type='checkbox'
                className='custom-control-input'
                id='infoGarantie'
                value={infoGarantie}
                onChange={onChange}
                current={current === null ? '' : current.infoGarantie}
                text={'Informatie over de garantietermijn.'}
              />
              <small className='text-muted'>
                OPGELET! De factuur dient als garantiebewijs.
              </small>
            </div>

            {/*info software problemen    checkbox*/}
            <div className='formItem'>
              <Checkbox
                name='infoSoftware'
                type='checkbox'
                className='custom-control-input'
                id='infoSoftware'
                value={infoSoftware}
                onChange={onChange}
                current={current === null ? '' : current.infoSoftware}
                text={
                  'Digipunt staat ter beschikking voor vragen met betrekking tot software problemen.'
                }
              />
            </div>

            {/*info BEEGO                 checkbox*/}
            <div className='formItem'>
              <Checkbox
                name='infoBeego'
                type='checkbox'
                className='custom-control-input'
                id='infoBeego'
                value={infoBeego}
                onChange={onChange}
                current={current === null ? '' : current.infoBeego}
                text={
                  'Informeer klant over mogelijkheid van digihulp aan huis met het BEEGO project en bied een BEEGObon aan.'
                }
              />
              <small>
                Zie{' '}
                <a
                  href='https://beego.be/'
                  target='_blank'
                  rel='noopener noreferrer'>
                  {' '}
                  <strong>BEEGO</strong>{' '}
                </a>{' '}
                voor meer informatie. <br />
                Indien de klant de bon heeft aanvaard, noteer de code en{' '}
                <a
                  href='https://docs.google.com/forms/d/e/1FAIpQLSeawRzTWJLDDkM1gD6A9dtkmxeqfcMe0O4pprguPDY9S-X3gA/viewform'
                  target='_blank'
                  rel='noopener noreferrer'>
                  <strong>registreer</strong>
                </a>{' '}
                de bon.
              </small>
            </div>

            {/*werking Digipunt           checkbox*/}
            <div className='formItem'>
              <Checkbox
                name='werkingDigipunt'
                type='checkbox'
                className='custom-control-input'
                id='werkingDigipunt'
                value={werkingDigipunt}
                onChange={onChange}
                current={current === null ? '' : current.werkingDigipunt}
                text={'informatie over werking van het Digipunt.'}
              />
            </div>

            <div className='button'>
              <input
                type='submit'
                value={current === null ? 'Indienen' : 'Update'}
                className='btn btn-lg btn-info'
              />
            </div>

            {/* {current && (
              <div className='button'>
                <button className='btn btn-lg btn-warning' onClick={onCancel}>
                  Annuleren
                </button>
              </div>
            )} */}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
