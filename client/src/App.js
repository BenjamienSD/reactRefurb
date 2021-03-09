import React, { Fragment } from 'react';
import LoginPage from './components/login/LoginPage';
import InputForm from './components/inputform/InputForm';
import Table from './components/table/Table.js';
import Success from './components/layout/Success';
import NoForms from './components/layout/NoForms';
import Navigator from './components/layout/Navigator';
import Registrator from './components/registrator/Registrator';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormState from './context/form/FormState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';

// load token into global header
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <FormState>
        <Router>
          <Fragment>
            <Switch>
              <Route exact path='/' component={LoginPage} />
              <Route exact path='/login' component={LoginPage} />
              <PrivateRoute exact path='/navigator' component={Navigator} />
              <PrivateRoute exact path='/registrator' component={Registrator} />
              <PrivateRoute exact path='/table' component={Table} />
              <PrivateRoute exact path='/formulier' component={InputForm} />
              <PrivateRoute exact path='/success' component={Success} />
              <PrivateRoute exact path='/404' component={NoForms} />
            </Switch>
          </Fragment>
        </Router>
      </FormState>
    </AuthState>
  );
}

export default App;
