import React, { useContext, useEffect, useState } from 'react';
import { usePageData } from '../../../hooks/usePage';
import { Avatar, Button, Card, Rate, Tag, Timeline, Modal, Form, Upload, Input } from 'antd';
import { IPageData } from '../../../interfaces/page';
import PatientForm from '../../../layout/components/patients/PatientForm';
import { IPatient } from '../../../interfaces/patient';
import { useHistory } from 'react-router-dom';
import { getpatient } from './service/patientservice';
import { Patientcontext, Patientcontextype } from './provider/PatientProvider';
import { useHideLoader } from '../../../hooks/useHideLoader';
import { IPatientModel } from '../../../interfaces/patientmodel';
import { IRecord } from '../../../interfaces/Record';
import { Hideloaderpatient } from '../../../hooks/hideloaderpatient';
import { DownloadOutlined, InboxOutlined, UploadOutlined } from '@ant-design/icons';
import axiosInstance from '../../../config/axios';

const pageData: IPageData = {
  title: 'Patient profile',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Patient',
      route: 'Patient-dashboard'
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
          <div>Phone</div>
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

type Props = {
  patients: IPatient[];
  onEditPatient?: (patient: IPatient) => void;
};

const Profile = ({ onEditPatient = () => null }: Props) => {
  const [opened, setOpened] = useState('');

  function isOpened(modalName: string) {
    return modalName === opened;
  }

  function closeModal() {
    setOpened(null);
  }

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
  const [selectedFile, setSelectedFile] = useState(null);

  const user = useContext<Patientcontextype | null>(Patientcontext);
  const { records, setrecords } = useContext<Patientcontextype | null>(Patientcontext);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedFile);
    let formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('username', user.user.username);
    await axiosInstance
      .post('/patient/addfiles', formData)
      .then((res) => setrecords([...records, res.data.record]));
  };
  const modals = {
    withDefaultOverlay: 'withDefaultOverlay'
  };
  const [selectedrecord, setselectedrecord] = useState<IRecord | null>();

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
  const handleShowInfo = () => history.push('/patient/edit-patient');

  const handleclick = (event) => {
    //openModal(modals.withOverlayWithoutClose);
    //setOpened(modalName);
    setOpened('withDefaultOverlay');
    //console.log(event);
    setselectedrecord(event);
    console.log(selectedrecord);
    //console.log(selectedrecord)
  };

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
            <Avatar src={!user.user.image ? backup : userAvatar} size={100} />

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

          <p style={{ color: '#8f8f90' }}>Username : {user.user.username}</p>

          <p>Health Bridge Patient</p>
        </Card>
        <Card
          title='Add Medical records'
          className='with-shadow mb-0'
          style={{ height: '120px', marginTop: '-15px' }}
        >
          <div className=''>
            <input type='file' onChange={handleFileChange} style={{ backgroundColor: 'white' }} />
            <Button onClick={handleSubmit}>Upload</Button>
          </div>
        </Card>
      </div>

      <div className='col-md-6 col-sm-12'>
        <ContactInfo Contact={user.user} />

        <Card
          title='Medical records'
          className='with-shadow mb-0'
          style={{ marginTop: '30px', height: '200px' }}
        >
          <div className='elem-list skills-list'>
            {user.records.map((record, i) => (
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
                onClick={(event) => handleclick(record)}
              >
                {record.filename.split('.')[0]}
              </Tag>
            ))}
          </div>
        </Card>
      </div>
      <Modal
        open={isOpened(modals.withDefaultOverlay)}
        closable={false}
        maskClosable={true}
        title={<h3 className='m-0'>Patient Record</h3>}
        onCancel={closeModal}
        footer={null}
      >
        <img
          src={selectedrecord ? `data:image/png;base64,${selectedrecord.file}` : 'none'}
          alt={selectedrecord ? selectedrecord.filename : 'none'}
        ></img>
        <Button
          type='primary'
          style={{ backgroundColor: '#52c41a', color: 'white', borderColor: 'white' }}
          icon={<DownloadOutlined />}
          href={selectedrecord ? `data:image/png;base64,${selectedrecord.file}` : 'none'}
          download={selectedrecord ? selectedrecord.filename : 'none'}
        >
          {' '}
          Download
        </Button>
      </Modal>
    </div>
  );
};

export default Profile;
