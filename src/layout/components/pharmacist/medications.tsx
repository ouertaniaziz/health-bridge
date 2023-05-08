import React, { useRef, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { ColumnProps } from 'antd/es/table';
import { Avatar, Table, Button, Modal, Tag } from 'antd';

import { IPatient } from '../../../interfaces/patient';

import PatientForm from '../../../layout/components/patients/PatientForm';
import { usePatients } from '../../../hooks/usePatients';
import { IStoragemed } from '../../../interfaces/Istoragemed';
import { useFetchPageData } from '../../../hooks/usePage';
import PageAction from '../page-action/PageAction';
import Webcam from 'react-webcam';

type Props = {
  patients: IPatient[];
  onEditPatient?: (patient: IPatient) => void;
  onDeletePatient?: (id: string) => void;
};


const actions = (patient: IPatient) => (
    <div className='buttons-list nowrap'>
      
      <Button shape='circle' type='primary'>
        <span className='icofont icofont-edit-alt' />
      </Button>
     
    </div>
  );


interface storage{
    storage: IStoragemed[];
}
const Medications = ({
  onEditPatient = () => null,
  onDeletePatient = () => null
}: Props) => {
    const [storagemeds,setstoragemeds] = useFetchPageData<storage>('/pharmacist/getallmedicationsinstorage');
    const { patients, editPatient, deletePatient } = usePatients();
    const videoConstraints = {
        width: 720,
        height: 500,
        facingMode: 'user'
      };
    
  const history = useHistory();

  const [patient, setPatient] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const webref = useRef(null);

  const closeModal = () => setVisibility(false);

  const handleShowInfo = () => history.push('/vertical/patient-profile');
  const handleDeletePatient = (id) => onDeletePatient(id);
  const handleEditPatient = (patient: IPatient) => {
    setPatient(patient);
    setVisibility(true);
  };

//request
const capture = React.useCallback(() => {
    const imageSrc = webref.current.getScreenshot();
  }, [webref]);
  const handleimage = async () => {
    const video = webref.current.video;

    // console.log(webref.current.getScreenshot());
    let formData = new FormData();
    //console.log('rr');
    formData.append('image', webref.current.getScreenshot());
    
    //console.log('image', formData.get('image'));
    //const res = await axios.post('http://localhost:5000/face-recognition/num-faces', formData);
    console.log('res',webref.current.getScreenshot());
    video.pause();

    //setimg(webref.current.getScreenshot());
  };
//

  const columns: ColumnProps<IPatient>[] = [
    {
      key: 'medicationname',
      title: 'Medication Name',
      dataIndex: 'medicationname',
      render: (medicationName) => <strong>{medicationName}</strong>
    },
    {
      key: 'Dosage',
      dataIndex: 'Dosage',
      title: 'Dosage',
      sorter: (a, b) => (a.name > b.name ? 1 : -1),
      render: (name) => <strong>{name}</strong>
    },
    {
      key: 'Dateofmanufacture',
      dataIndex: 'Dateofmanufacture',
      title: 'Date of manufacture',
      sorter: (a, b) => (a.id > b.id ? 1 : -1),
      render: (id) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          {id}
        </span>
      )
    },{
        key: 'Dateofmanufacture',
        dataIndex: 'Dateofmanufacture',
        title: 'Date of manufacture',
        sorter: (a, b) => (a.id > b.id ? 1 : -1),
        render: (id) => (
          <span className='nowrap' style={{ color: '#a5a5a5' }}>
            {id}
          </span>
        )
      },
    
    {
      key: 'numPackets',
      dataIndex: 'numPackets',
      title: 'number of Packets',
      sorter: (a, b) => a.age - b.age,
      render: (age) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          {age}
        </span>
      )
    },
    {
        key: 'actions',
        title: 'Actions',
        render: actions
      }
    // {
    //   key: 'status',
    //   dataIndex: 'status',
    //   title: 'Status',
    //   render: (status) => (
    //     <Tag style={{ borderRadius: 20 }} color={status === 'Approved' ? '#b7ce63' : '#cec759'}>
    //       {status}
    //     </Tag>
    //   ),
    //   sorter: (a, b) => (a.status > b.status ? 1 : -1)
    // },
   
  ];

  const pagination = storagemeds?.storage.length <= 10 ? false : {};

  return (
    <>
          <PageAction onClick={() => setVisibility(true)} icon='icofont-plus' type='primary' />

      <Table
        pagination={pagination}
        className='accent-header'
        rowKey='id'
        dataSource={storagemeds?.storage}
        columns={columns}
      />

      <Modal
        open={visibility}
        footer={null}
        onCancel={closeModal}
        title={<h3 className='title'>Add Medicament</h3>}
        width='900px'
        
        
      >
         <Webcam ref={webref} screenshotFormat='image/jpeg' videoConstraints={videoConstraints} />
      <Button onClick={handleimage}>Snap !</Button>
      {/* {alert && (
        <Alert
          message='Success Tips'
          type={'success'}
          description='This is success alert'
          showIcon
        />
      )} */}
      {/* <img src={img}></img> */}
      </Modal>
    </>
  );
};

export default Medications;
