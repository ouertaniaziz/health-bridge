import React, { ReactNode } from 'react';

import { Badge, Table } from 'antd';

import { ColumnProps } from 'antd/es/table';
import { IMedication } from '../../../interfaces/patient';
const columns: ColumnProps<IMedication>[] = [
  {
    key: 'name',
    dataIndex: 'medicationName',
    title: 'Name',
    sorter: (a, b) => (a.medicationName > b.medicationName ? 1 : -1),
    render: (medicationName) => <strong>{medicationName}</strong>
  },
  {
    key: 'dosage form',
    dataIndex: 'dosageForm',
    title: 'dosage form',
    sorter: (a, b) => (a.dosageForm > b.dosageForm ? 1 : -1),
    render: (dosageForm) => (
      <span className='nowrap' style={{ color: '#336cfb' }}>
        {dosageForm}
      </span>
    )
  },
  {
    key: 'dosage Strength',
    dataIndex: 'dosageStrength',
    title: 'dosage strength',
    sorter: (a, b) => (a.dosageStrength > b.dosageStrength ? 1 : -1),
    render: (dosageStrength) => (
      <span className='nowrap' style={{ color: '#336cfb' }}>
        {dosageStrength}
      </span>
    )
  },
  {
    key: 'validation Date',
    dataIndex: 'validationPeriod',
    title: 'Validation Date',
    render: (validationPeriod) => (
      <span className='nowrap' style={{ color: '#a5a5a5' }}>
        {validationPeriod}
      </span>
    )
  },
  {
    key: 'expirationDate',
    dataIndex: 'expirationDate',
    title: 'Expiration Date',
    render: (expirationDate) => (
      <span className='nowrap' style={{ color: '#a5a5a5' }}>
        {expirationDate}
      </span>
    )
  },
  {
    key: 'prescriptionRequired',
    dataIndex: 'prescriptionRequired',
    title: 'prescription Required',
    render: (prescriptionRequired) => (
      <span
        className='d-flex align-baseline nowrap'
        style={{
          color: '#blue',
          alignContent: 'center',
          paddingLeft: '40px'
        }}
      >
        {prescriptionRequired ? (
          <Badge color='green' text='Yes' />
        ) : (
          <Badge color='red' text='No' />
        )}
      </span>
    )
  },
  {}
];
type Props = {
  data: IMedication[];
  actions?: (prescription: IMedication) => ReactNode;
};
const PrescriptionTable = ({ data, actions }: Props) => {
  const actionColumn: ColumnProps<IMedication> = {
    key: 'actions',
    title: 'Actions',
    render: actions
  };

  const displayedColumns = actions ? [...columns, actionColumn] : columns;

  return (
    <Table
      rowKey='number'
      dataSource={data}
      columns={displayedColumns}
      pagination={{ hideOnSinglePage: true }}
    />
  );
};
export default PrescriptionTable;
