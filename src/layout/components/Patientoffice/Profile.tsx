import React, { useContext, useEffect, useState } from 'react';
import { usePageData } from '../../../hooks/usePage';
import { Avatar, Button, Card, Rate, Tag, Timeline, Modal } from 'antd';
import { IPageData } from '../../../interfaces/page';
import PatientForm from '../../../layout/components/patients/PatientForm';
import { IPatient } from '../../../interfaces/patient';
import { useHistory } from 'react-router-dom';
import { getpatient } from './service/patientservice';
import { Patientcontext } from './provider/PatientProvider';
import { useHideLoader } from '../../../hooks/useHideLoader';
import { IPatientModel } from '../../../interfaces/patientmodel';
import { IRecord } from '../../../interfaces/Record';
const pageData: IPageData = {
  title: 'Patient profile',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Patient',
      route: 'default-dashboard'
    },

    {
      title: 'User profile'
    }
  ]
};

const ContactInfo = (props: { Contact: IPatientModel }) => {
  return (
    <Card title='Contact information' className='mb-md-0 with-shadow'>
      <div className='row align-items-center mb-3'>
        <div className='col col-auto'>
          <span className='icofont-ui-touch-phone' style={{ fontSize: 30, color: '#8f8f90' }} />
        </div>
        <div className='col'>
          <div></div>
          {props.Contact.phone}
        </div>
      </div>

      <div className='row align-items-center mb-3'>
        <div className='col col-auto'>
          <span className='icofont-slack' style={{ fontSize: 30, color: '#8f8f90' }} />
        </div>
        <div className='col'>
          <div>Email</div>
          {props.Contact.email}
        </div>
      </div>

      <div className='row align-items-center mb-3'>
        <div className='col col-auto'>
          <span className='icofont-location-pin' style={{ fontSize: 30, color: '#8f8f90' }} />
        </div>
        <div className='col'>
          <div>Current Address</div>
          {props.Contact.city}, {props.Contact.state},{props.Contact.postal_code}
        </div>
      </div>
    </Card>
  );
};

const Skills = (props: { records: IRecord[] }) => {
  return (
    <Card
      title='Medical records'
      className='with-shadow mb-0'
      style={{ marginTop: '30px', height: '200px' }}
    >
      <div className='elem-list skills-list'>
        {props.records.map((record, i) => (
          <Tag
            key={i}
            color='#336cfb'
            style={{
              backgroundColor: 'transparent',
              borderColor: '#336cfb',
              borderRadius: 500,
              color: '#336cfb',
              fontSize: 12
            }}
          >
            {record.filename}
          </Tag>
        ))}
      </div>
    </Card>
  );
};
type Props = {
  patients: IPatient[];
  onEditPatient?: (patient: IPatient) => void;
};

const Profile = ({ onEditPatient = () => null }: Props) => {
  usePageData(pageData);
  const [patient, setPatient] = useState({
    img: '/content/user-400-3.jpg',
    name: 'Liam Jouns',
    gender: 'female',
    age: 25,
    number: '0126596578',
    address: '71 Pilgrim Avenue Chevy Chase, MD 20815',
    lastVisit: '18 Dec 2018',
    status: 'approved',
    id: '10021'
  });

  const user = useContext(Patientcontext);

  //const [visibility, setVisibility] = useState(false);
  //const closeModal = () => setVisibility(false);
  const userCover = `${window.origin}/content/user-profile.jpg`; //photo
  const userAvatar = `data:image/png;base64,${user.user.image}`; //profile pic
  const backup = `${window.origin}/content/user-400-1.jpg`;
  //   const handleEditPatient = (patient: IPatient) => {
  //     //setPatient(patient);
  //     setVisibility(true);
  //   };
  const history = useHistory();
  const handleShowInfo = () => history.push('/vertical/edit-account');
  return (
    <div className='row'>
      <div className='col-md-6 col-sm-12'>
        <Card
          cover={<img src={userCover} alt='user-cover' />} //cover photo
          className='personal-info-card with-shadow'
        >
          <div
            className='d-flex align-items-center justify-content-between'
            style={{ marginTop: '-50px' }}
          >
            <Avatar src={!user.user.image ? userAvatar : userAvatar} size={100} />

            <Button
              style={{
                backgroundColor: '#e91e63',
                borderRadius: 500,
                color: '#fff',
                border: 'none',
                marginTop: '10px'
              }}
              onClick={handleShowInfo}
            >
              Edit
            </Button>
          </div>

          <div className='d-flex align-items-center justify-content-between'>
            <h5 className='mb-0 mt-0 mr-1'>
              {user.user.firstname} {user.user.lastname}
            </h5>
          </div>

          <p style={{ color: '#8f8f90' }}>UI/UX Designer</p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore enim, nemo
            nihil non omnis temporibus? Blanditiis culpa labore velit.Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Dicta, provident?
          </p>
        </Card>
      </div>

      <div className='col-md-6 col-sm-12'>
        <ContactInfo Contact={user.user} />

        <Skills records={user.records} />
      </div>
      {/* <Modal
        open={visibility}
        footer={null}
        onCancel={closeModal}
        title={<h3 className='title'>Edit patient</h3>}
      >
        <PatientForm
          submitText='Update patient'
          onCancel={closeModal}
          onSubmit={()=>console.log(patient)}
          patient={patient}
        />
      </Modal> */}
    </div>
  );
};

export default Profile;
