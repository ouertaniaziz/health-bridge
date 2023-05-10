import React, { useState, useEffect } from 'react';

import { Button } from 'antd';
import { HomeFilled } from '@ant-design/icons/lib';

import BaseErrorPage from './BaseErrorPage';
import { useNavigateHome } from '../../utils/use-navigate-home';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const navigateHome = useNavigateHome();
  const [doctor, setdoctor] = useState(false);
  const [patient, setpatient] = useState(false);
  const [NotLogged, setNotLogged] = useState(false);
  const history = useHistory();

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
  return (
    <BaseErrorPage
      subTitle={
        <h6 className='text-md text-center'>Sorry! The page you were looking for doesn't exist.</h6>
      }
      bg={`${window.origin}/content/404-page.jpg`}
      action={
        <Button
          type='primary'
          onClick={() => {
            if (doctor || patient || !localStorage.getItem('user')) {
              if (doctor) {
                history.replace(`/doctor/default-dashboard`);
              } else if (patient) {
                history.replace(`/patient/Patient-dashboard`);
              } else {
                history.replace(`/`);
              }
            }
          }}
          style={{ width: 'auto' }}
          icon={<HomeFilled className='ml-0 mr-2' style={{ fontSize: '1em' }} />}
        >
          Back to home
        </Button>
      }
      title={
        <h1 style={{ fontSize: '6rem' }} className='text-color-300 text-center mb-2'>
          <i className='icofont-radio-active color-error mr-2' style={{ opacity: 0.5 }} />
          404
        </h1>
      }
    />
  );
};

export default NotFound;
