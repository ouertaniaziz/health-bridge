import React, { useState, useEffect } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import VerticalLayout from './layout/vertical/Vertical';
import HorizontalLayout from './layout/horizontal/Horizontal';

import NotFound from './pages/sessions/404';
import { defaultRoutes, sessionRoutes, doctorRoutes, patientRoutes ,donorRoutes} from './routing';

import './App.less';
import './App.scss';
import { useHideLoader } from './hooks/useHideLoader';
import { PatientProvider } from './layout/components/Patientoffice/provider/PatientProvider';

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
const DonorRoutes = ({ layout }) => <Routes routes={donorRoutes} layout={layout} />;

const SessionRoutes = () => <Routes routes={sessionRoutes} layout='public' />;

const App = () => {
  const [doctor, setdoctor] = useState(true);
  const [patient, setpatient] = useState(true);
  const [donor, setdonor] = useState(true);
  

  useEffect(() => {
    if (localStorage.getItem('user')) {
      if (JSON.parse(localStorage.getItem('user')).role === 'patient') {
        setpatient(false);
      } else if (JSON.parse(localStorage.getItem('user')).role === 'doctor') {
        setdoctor(false);
      }
      else if (JSON.parse(localStorage.getItem('user')).role === 'donor') {
        setdonor(false);
      }
      
    }
  }, []);

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
            <PatientRoutes layout='patient' />
          </VerticalLayout>
        </PatientProvider>
      </Route>
      <Route path='/donor'>
          <VerticalLayout>
            <DonorRoutes layout='donor' />
          </VerticalLayout>
      </Route>


      <Route path='/' exact>
        <Redirect to='/public/sign-in' />
      </Route>
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
