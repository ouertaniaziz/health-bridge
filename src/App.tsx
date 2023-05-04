import React, { useState, useEffect } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import VerticalLayout from './layout/vertical/Vertical';
import HorizontalLayout from './layout/horizontal/Horizontal';

import NotFound from './pages/sessions/404';
import { defaultRoutes, sessionRoutes, doctorRoutes, patientRoutes } from './routing';

import './App.less';
import './App.scss';
import { useHideLoader } from './hooks/useHideLoader';
import { PatientProvider } from './layout/components/Patientoffice/provider/PatientProvider';
import Chatgptmodal from './layout/components/Patientoffice/chatgptmodal';

const Routes = ({ routes, layout = '' }) => (
  <Switch>
    {routes.map((route, index) => (
      <Route
        key={index}
        exact={route.exact}
        path={layout.length > 0 ? `/${layout}/${route.path}` : `/${route.path}`}
        component={() => <route.component />}
      />
    ))}

    <Route path='*'>
      <Redirect to='/public/page-404' />
    </Route>
  </Switch>
);

const DefaultRoutes = ({ layout }) => <Routes routes={defaultRoutes} layout={layout} />;
const DoctorRoutes = ({ layout }) => <Routes routes={doctorRoutes} layout={layout} />;
const PatientRoutes = ({ layout }) => <Routes routes={patientRoutes} layout={layout} />;

const SessionRoutes = () => <Routes routes={sessionRoutes} layout='public' />;

const App = () => {
  const [doctor, setdoctor] = useState(false);
  const [patient, setpatient] = useState(false);
  const [NotLogged, setNotLogged] = useState(false);

  useEffect(() => {
    console.log(localStorage.getItem('user'), 'test');
    if (localStorage.getItem('user')) {
      if (JSON.parse(localStorage.getItem('user')).role === 'patient') {
        setpatient(true);
      } else if (JSON.parse(localStorage.getItem('user')).role === 'doctor') {
        setdoctor(true);
      } else setNotLogged(true);
    }
  }, [localStorage]);

  useHideLoader();
  return (
    <Switch>
      <Route path='/public'>
        <SessionRoutes />
      </Route>

      <Route path='/doctor'>
        <VerticalLayout>
          <DoctorRoutes layout='doctor' />
        </VerticalLayout>
      </Route>

      <Route path='/patient'>
        <PatientProvider>
          <VerticalLayout>
            <Chatgptmodal />
            <PatientRoutes layout='patient' />
          </VerticalLayout>
        </PatientProvider>
      </Route>

      {(doctor || patient || !localStorage.getItem('user')) && (
        <Route path='/'>
          {doctor ? (
            <Redirect to='/doctor/settings' />
          ) : patient ? (
            <Redirect to='/patient/dashboard' />
          ) : (
            <Redirect to='/public/sign-in' />
          )}
        </Route>
      )}
      <Route path='/vertical'>
        <VerticalLayout>
          <DefaultRoutes layout='vertical' />
        </VerticalLayout>
      </Route>

      <Route path='/horizontal'>
        <HorizontalLayout>
          <DefaultRoutes layout='horizontal' />
        </HorizontalLayout>
      </Route>
      <Route path='*'>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default App;
