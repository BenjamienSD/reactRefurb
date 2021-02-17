import React, { Fragment, useContext, useEffect } from 'react';
import FormContext from '../../context/form/formContext';
// import oldData from '../../components/inputform/oldData';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import TableItem from './TableItem';
import TableHeader from './TableHeader';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';

export default function Table() {
  const formContext = useContext(FormContext);
  const authContext = useContext(AuthContext);

  const { loadUser, user } = authContext;
  const { forms, getForms, loading } = formContext;

  useEffect(() => {
    loadUser();
    getForms();
    // eslint-disable-next-line
  }, []);

  let isAdmin;
  let isOcmw;
  if (user !== null) {
    isAdmin = user.admin;
    if (user.email === 'ocmw@refurb.be') {
      isOcmw = true;
    }
  }

  if (forms === undefined) {
    return (
      <div>
        <Navbar />
        <p className='text-center mt-5 mb-5'>
          These are not the forms you're looking for...
        </p>
        <Footer />
      </div>
    );
  }
  /* 
  const upload = () => {
    oldData.forEach((form) => {
      addForm(form);
    });
  };

  if (forms.length === 0) {
    return (
      <Fragment>
        <Navbar />
        <div className='button'>
          <button className='btn btn-info' onClick={upload}>
            upload forms
          </button>
        </div>
        <Footer />
      </Fragment>
    );
  }
 */

  return (
    <div>
      {forms.length !== 0 && !loading ? (
        <Fragment>
          <Navbar />
          <div className='container'>
            <div className='formHeader mb-0'>
              <h1>Bestelgeschiedenis</h1>
              <p>bestellingen: {forms.length}</p>
            </div>

            <div className='table-responsive tableFixHead'>
              <table
                className='table table-bordered table-sm table-hover'
                id='table'>
                <thead className='thead-light'>
                  <tr>
                    {/* update functionality disabled */}
                    {/* {isAdmin && (
                      <TableHeader isOcmw={isOcmw} text={'Bewerken'} />
                    )} */}
                    {/* <th>id</th> */}
                    {!isOcmw && (
                      <TableHeader isOcmw={isOcmw} text={'Doorverwijs'} />
                    )}
                    <TableHeader isOcmw={isOcmw} text={'Betaalwijze'} />
                    {!isOcmw && (
                      <TableHeader isOcmw={isOcmw} text={'Info providers'} />
                    )}
                    {!isOcmw && (
                      <TableHeader isOcmw={isOcmw} text={'Info wifi'} />
                    )}
                    {!isOcmw && (
                      <TableHeader isOcmw={isOcmw} text={'Info prijsklasse'} />
                    )}
                    {!isOcmw && (
                      <TableHeader
                        isOcmw={isOcmw}
                        text={'Info softwarepakket'}
                      />
                    )}
                    <TableHeader isOcmw={isOcmw} text={'Datum'} />
                    <TableHeader isOcmw={isOcmw} text={'Dossiernummer'} />
                    <TableHeader isOcmw={isOcmw} text={'Contactpersoon'} />
                    <TableHeader isOcmw={isOcmw} text={'Locatie aankoop'} />
                    <TableHeader isOcmw={isOcmw} text={'Geregistreerd door'} />
                    <TableHeader isOcmw={isOcmw} text={'Doelgroep'} />
                    <TableHeader isOcmw={isOcmw} text={'Naam klant'} />
                    <TableHeader isOcmw={isOcmw} text={'Product'} />
                    {!isOcmw && (
                      <TableHeader
                        isOcmw={isOcmw}
                        text={'Scan/kopie doorverwijs'}
                      />
                    )}
                    {!isOcmw && (
                      <TableHeader isOcmw={isOcmw} text={'Info map'} />
                    )}
                    {!isOcmw && (
                      <TableHeader
                        isOcmw={isOcmw}
                        text={'Info hardware problemen'}
                      />
                    )}
                    {!isOcmw && (
                      <TableHeader isOcmw={isOcmw} text={'Info garantie'} />
                    )}
                    {!isOcmw && (
                      <TableHeader
                        isOcmw={isOcmw}
                        text={'Info software problemen'}
                      />
                    )}
                    {!isOcmw && (
                      <TableHeader isOcmw={isOcmw} text={'Info Beego'} />
                    )}
                    {!isOcmw && (
                      <TableHeader
                        isOcmw={isOcmw}
                        text={'Info werking Digipunt'}
                      />
                    )}
                    {isAdmin && (
                      <TableHeader isOcmw={isOcmw} text={'Verwijderen'} />
                    )}
                  </tr>
                </thead>
                <tbody className=''>
                  {forms.map((form) => (
                    <TableItem form={form} key={form._id} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Footer />
        </Fragment>
      ) : (
        <Fragment>
          <Navbar />
          <Spinner />
          <Footer />
        </Fragment>
      )}
    </div>
  );
}
