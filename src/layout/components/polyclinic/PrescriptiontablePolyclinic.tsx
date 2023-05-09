import React, { ReactNode, useEffect, useState } from 'react';

import { Badge, Table, Alert, Button, Space } from 'antd';

import { ColumnProps } from 'antd/es/table';
import { IMedication } from '../../../interfaces/patient';
import { IPrescription } from '../../../interfaces/prescription';
import { relative } from 'path';
import Popconfirm from 'antd/lib/popconfirm';
const columns: ColumnProps<IPrescription>[] = [
  {
    key: 'name',
    dataIndex: 'doctor',
    title: 'Doctor Name',
    render: (doctor) => (
      <strong>
        {doctor.firstname + ' '}
        {doctor.lastname}
      </strong>
    )
  },
  {
    key: 'patient',
    dataIndex: 'patient',
    title: 'Patient ',
    render: (patient) => (
      <span className='nowrap' style={{ color: '#336cfb' }}>
        {patient.firstname}
        {patient.lastname}
      </span>
    )
  },
  {
    key: 'traitement',
    dataIndex: 'traitement',
    title: 'Traitements',
    render: (traitement) => (
      <span className='nowrap' style={{ color: '#336cfb' }}>
        {traitement.length} Traitements
      </span>
    )
  },

  {
    key: 'date',
    dataIndex: 'date',
    title: 'Date of Creation',
    render: (date) => (
      <span className='nowrap' style={{ color: '#336cfb' }}>
        {date.slice(0, 10)}
      </span>
    )
  },
  {}
];
type Props = {
  data: IPrescription[];
  actions?: (prescription: IPrescription) => ReactNode;
};
const PrescriptionTablePolyclinic = ({ data, actions }: Props) => {
  const actionColumn: ColumnProps<IPrescription> = {
    key: 'actions',
    title: 'Actions',
    render: actions
  };
 
  const displayedColumns = actions ? [...columns, actionColumn] : columns;

  return (
    <>
      <Table
        rowKey='number'
        dataSource={data}
        columns={displayedColumns}
        pagination={{ hideOnSinglePage: true }}
      />
    
    </>
  );
};
export default PrescriptionTablePolyclinic;
