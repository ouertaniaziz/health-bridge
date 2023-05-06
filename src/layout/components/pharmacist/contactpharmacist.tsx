import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

import { IUser } from '../../../interfaces/user';

import './../doctor/Contact.scss';
import { IPharmacist } from '../../../interfaces/pharmacist';

type OwnProps = {
  className?: string;
};

type Props = {
    data:IPharmacist
} & OwnProps;


const ContactPharmacist = ({ data,className }: Props) => {
  const history = useHistory();
  const userAvatar = `data:image/png;base64,${data.image}`; //profile pic

  const handleGoToProfile = () => {
    const layout = history.location.pathname.split('/')[1];
    history.push(`/${layout}/pharmacist-profile`);
  };

  return (
    <div className={`contact ${className}`}>
      <div className='img-box'>
        <img width='400' src={userAvatar} height='400' alt='avatar' />
      </div>

      <div className='info-box'>
        <h4 className='username'>{data.username}</h4>

        <p className='role'>{data.role}</p>
       
        {/* <div className='social'>
          {social &&
            social.map((item, index) => (
              <a key={index} href={item.link} className={`link ${item.icon}`} />
            ))}
        </div> */}

        <p className='email'>{data.email}</p>
        <p className='phone'>{data.phone}</p>

        <div className='button-box'>
          <Button type='primary' onClick={()=>console.log(data)}>
            View profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactPharmacist;
