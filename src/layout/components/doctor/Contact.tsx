import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

import { IUser } from '../../../interfaces/user';

import './Contact.scss';

type OwnProps = {
  className?: string;
};

type Props = IUser & OwnProps;

const Contact = ({ city, img, firstname, role, social, className }: Props) => {
  const history = useHistory();

  const handleGoToProfile = () => {
    const layout = history.location.pathname.split('/')[1];
    history.push(`/${layout}/doctor-profile`);
  };

  return (
    <div className={`contact ${className}`}>
      <div className='img-box'>
        <img width='400' src={img as string} height='400' alt='avatar' />
      </div>

      <div className='info-box'>
        <h4 className='name'>{firstname}</h4>

        <p className='role'>{role}</p>

        <div className='social'>
          {social &&
            social.map((item, index) => (
              <a key={index} href={item.link} className={`link ${item.icon}`} />
            ))}
        </div>

        <p className='address'>{city}</p>

        <div className='button-box'>
          <Button type='primary' onClick={handleGoToProfile}>
            View profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
