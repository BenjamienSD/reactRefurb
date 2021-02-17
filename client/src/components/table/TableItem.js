import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
import FormContext from '../../context/form/formContext';
import AuthContext from '../../context/auth/authContext';
import { format, parseISO } from 'date-fns';

// each tableItem is a row
export default function TableItem({ form }, props) {
  const formContext = useContext(FormContext);
  const { deleteForm, clearCurrent } = formContext;

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const {
    _id,
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

  const onDelete = () => {
    deleteForm(_id);
    clearCurrent();
  };

  let isAdmin;
  let isOcmw;
  if (user !== null) {
    isAdmin = user.admin;
    if (user.email === 'ocmw@refurb.be') {
      isOcmw = true;
    }
  }

  //console.log(format(parseISO(datum), 'dd/MM/yyyy'));
  const formattedDate = format(parseISO(datum), 'dd/MM/yyyy');

  return (
    <tr>
      {/* {isAdmin && (
        <td className='tableButtons'>
          <Link
            onClick={() => {
              setCurrent(form);
            }}
            to='/formulier'
            className='btn btn-sm btn-info w-75 m-1'>
            <i className='fas fa-edit'></i>
          </Link>
        </td>
      )} */}

      {/* <td>{_id}</td> */}
      {!isOcmw && (
        <td>
          {doorverwijs ? (
            <i className='fas fa-check'></i>
          ) : (
            <i className='fas fa-times'></i>
          )}
        </td>
      )}

      <td>{andereBetaalWijze === 'nvt' ? betaalWijze : andereBetaalWijze}</td>
      {!isOcmw && (
        <td>
          {infoProviders ? (
            <i className='fas fa-check'></i>
          ) : (
            <i className='fas fa-times'></i>
          )}
        </td>
      )}
      {!isOcmw && (
        <td>
          {infoWifi ? (
            <i className='fas fa-check'></i>
          ) : (
            <i className='fas fa-times'></i>
          )}
        </td>
      )}
      {!isOcmw && (
        <td>
          {prijsKlasse ? (
            <i className='fas fa-check'></i>
          ) : (
            <i className='fas fa-times'></i>
          )}
        </td>
      )}
      {!isOcmw && (
        <td>
          {softwarePakket ? (
            <i className='fas fa-check'></i>
          ) : (
            <i className='fas fa-times'></i>
          )}
        </td>
      )}

      <td>{formattedDate}</td>
      <td>{dossierNummer}</td>
      <td>{contactPersoon}</td>
      <td>{digiLocatie}</td>
      <td>{medeWerker}</td>
      <td>{doelGroep}</td>
      <td>{klant}</td>
      <td>{product}</td>
      {!isOcmw && (
        <td>
          {kopie ? (
            <i className='fas fa-check'></i>
          ) : (
            <i className='fas fa-times'></i>
          )}
        </td>
      )}
      {!isOcmw && (
        <td>
          {infoMap ? (
            <i className='fas fa-check'></i>
          ) : (
            <i className='fas fa-times'></i>
          )}
        </td>
      )}
      {!isOcmw && (
        <td>
          {infoHardware ? (
            <i className='fas fa-check'></i>
          ) : (
            <i className='fas fa-times'></i>
          )}
        </td>
      )}
      {!isOcmw && (
        <td>
          {infoGarantie ? (
            <i className='fas fa-check'></i>
          ) : (
            <i className='fas fa-times'></i>
          )}
        </td>
      )}
      {!isOcmw && (
        <td>
          {infoSoftware ? (
            <i className='fas fa-check'></i>
          ) : (
            <i className='fas fa-times'></i>
          )}
        </td>
      )}
      {!isOcmw && (
        <td>
          {infoBeego ? (
            <i className='fas fa-check'></i>
          ) : (
            <i className='fas fa-times'></i>
          )}
        </td>
      )}
      {!isOcmw && (
        <td>
          {werkingDigipunt ? (
            <i className='fas fa-check'></i>
          ) : (
            <i className='fas fa-times'></i>
          )}
        </td>
      )}
      {isAdmin && (
        <td>
          <button onClick={onDelete} className='btn btn-sm btn-danger w-75 m-1'>
            <i className='fas fa-trash'></i>
          </button>
        </td>
      )}
    </tr>
  );
}
