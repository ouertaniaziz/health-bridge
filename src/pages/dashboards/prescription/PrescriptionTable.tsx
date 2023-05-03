import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { ColumnProps } from 'antd/es/table';
import { Avatar, Table, Button, Modal, Tag } from 'antd';

import { IPrescription } from '../../../interfaces/prescription';

type Props = {
  prescriptions: IPrescription[];
  onDeletePrescription?: (id: string) => void;
};

const PrescriptionTable = ({ prescriptions, onDeletePrescription = () => null }: Props) => {
  const history = useHistory();

  const [prescription, setPrescription] = useState(null);
  const [visibility, setVisibility] = useState(false);

  const closeModal = () => setVisibility(false);

  const handleShowInfo = () => history.push('/vertical/patient-profile');
  const handleDeletePrescription = (id: string) => {
    onDeletePrescription(id);
  };
  const handleEditPrescription = (prescription: IPrescription) => {
    setPrescription(prescription);
    setVisibility(true);
  };

  const columns: ColumnProps<IPrescription>[] = [
    {
      key: '_id',
      dataIndex: '_id',
      title: 'Prescription ID'
    },
    {
      key: 'patient',
      dataIndex: 'patient',
      title: 'Patient Name',
      sorter: (a, b) => a.patient.name.localeCompare(b.patient.name),
      render: (patient) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          {patient.name}
        </span>
      )
    },
    {
      key: 'doctor',
      dataIndex: 'doctor',
      title: 'Doctor Name',
      sorter: (a, b) => a.doctor.name.localeCompare(b.doctor.name),
      render: (doctor) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          {doctor.name}
        </span>
      )
    },
    {
      key: 'date',
      dataIndex: 'date',
      title: 'Prescription Date',
      sorter: (a, b) => a.date.getTime() - b.date.getTime(),
      render: (date) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          {date.toLocaleDateString()}
        </span>
      )
    },
    {
      key: 'verified',
      dataIndex: 'verified',
      title: 'Verified',
      sorter: (a, b) => (a.verified ? 1 : 0) - (b.verified ? 1 : 0),
      render: (verified) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          {verified ? 'Yes' : 'No'}
        </span>
      )
    },
    {
      key: 'qrCodeVerif',
      dataIndex: 'qrCodeVerif',
      title: 'QR Code Verification',
      sorter: (a, b) => a.qrCodeVerif.localeCompare(b.qrCodeVerif),
      render: (qrCodeVerif) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          {qrCodeVerif}
        </span>
      )
    },
    {
      key: 'img',
      dataIndex: 'img',
      title: 'Prescription Image',
      render: (img) => <img src={img} alt='prescription' style={{ maxWidth: 100 }} />
    },
    {
      key: 'traitement',
      dataIndex: 'traitement',
      title: 'Treatment',
      render: (traitement) => (
        <ul>
          {traitement.map((treatment) => (
            <li key={treatment._id}>{treatment.name}</li>
          ))}
        </ul>
      )
    },
    {
      key: 'delete',
      dataIndex: '_id',
      title: 'Delete',
      render: (id) => (
        <Button type='link' danger onClick={() => handleDeletePrescription(id)}>
          Delete
        </Button>
      )
    }
  ];

  const pagination = prescriptions.length <= 10 ? false : {};

  return (
    <>
      <Table
        pagination={pagination}
        className='accent-header'
        rowKey='_id'
        dataSource={prescriptions}
        columns={columns}
      />

      <Modal
        visible={visibility}
        footer={null}
        onCancel={closeModal}
        title={<h3 className='title'>Add prescription</h3>}
      >
        {/* Add prescription form goes here */}
      </Modal>
    </>
  );
};

export default PrescriptionTable;
