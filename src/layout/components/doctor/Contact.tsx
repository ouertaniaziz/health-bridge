import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

import { IDoctor } from '../../../interfaces/doctor';

import './Contact.scss';

type OwnProps = {
  className?: string;
};

type Props = IDoctor & OwnProps;

const Contact = ({ user, name, speciality, _id, className }: Props) => {
  const history = useHistory();

  const handleGoToProfile = () => {
    const layout = history.location.pathname.split('/')[1];
    history.push(`/${layout}/appoimentsCalendar/${_id}`);
  };

  return (
    <div className={`contact ${className}`}>
      <div className='img-box'>
        <img width='400' src={'content/doctor-400-1.jpg' as string} height='400' alt='avatar' />
      </div>

      <div className='info-box'>
        <h4 className='name'>{name}</h4>

        <p className='role'>{speciality}</p>

        <p className='address'>{user.city}</p>

        <div className='button-box'>
          <Button type='primary' onClick={handleGoToProfile}>
            book appointments
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
