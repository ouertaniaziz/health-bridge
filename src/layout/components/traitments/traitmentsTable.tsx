import React, { ReactNode } from 'react';
import { Badge, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { ITraitement } from '../../../interfaces/traitement';

const columns: ColumnProps<ITraitement>[] = [
  {
    key: 'medicationName',
    dataIndex: 'medicationName',
    title: 'Medication Name',
    sorter: (a, b) => (a.medicationName > b.medicationName ? 1 : -1),
    render: (medicationName) => <strong>{medicationName}</strong>
  },
  {
    key: 'manufacturer',
    dataIndex: 'manufacturer',
    title: 'Manufacturer',
    sorter: (a, b) => (a.manufacturer > b.manufacturer ? 1 : -1)
  },
  {
    key: 'dosageForm',
    dataIndex: 'dosageForm',
    title: 'Dosage Form',
    sorter: (a, b) => (a.dosageForm > b.dosageForm ? 1 : -1)
  },
  {
    key: 'dosageStrength',
    dataIndex: 'dosageStrength',
    title: 'Dosage Strength',
    sorter: (a, b) => (a.dosageStrength > b.dosageStrength ? 1 : -1)
  },
  {
    key: 'validationPeriod',
    dataIndex: 'validationPeriod',
    title: 'Validation Period',
    sorter: (a, b) =>
      Date.parse(a.validationPeriod.toString()) - Date.parse(b.validationPeriod.toString()),
    render: (validationPeriod) => (
      <span>{new Date(validationPeriod.toString()).toLocaleDateString()}</span>
    )
  },
  {
    key: 'expirationDate',
    dataIndex: 'expirationDate',
    title: 'Expiration Date',
    sorter: (a, b) =>
      Date.parse(a.expirationDate.toString()) - Date.parse(b.expirationDate.toString()),
    render: (expirationDate) => (
      <span>{new Date(expirationDate.toString()).toLocaleDateString()}</span>
    )
  },
  {
    key: 'prescriptionRequired',
    dataIndex: 'prescriptionRequired',
    title: 'Prescription Required',
    sorter: (a, b) => (a.prescriptionRequired ? 1 : -1),
    render: (prescriptionRequired) => (
      <Badge
        status={prescriptionRequired ? 'success' : 'error'}
        text={prescriptionRequired ? 'Yes' : 'No'}
      />
    )
  },
  {
    key: 'numPackets',
    dataIndex: 'numPackets',
    title: 'Num Packets',
    sorter: (a, b) => a.numPackets - b.numPackets
  },
  {
    key: 'description',
    dataIndex: 'description',
    title: 'Description'
  },
  {}
];

type Props = {
  data: ITraitement[];
  actions?: (traitement: ITraitement) => ReactNode;
};

const TraitementTable = ({ data, actions }: Props) => {
  const actionColumn: ColumnProps<ITraitement> = {
    key: 'actions',
    title: 'Actions',
    render: actions
  };

  const displayedColumns = actions ? [...columns, actionColumn] : columns;

  return (
    <Table
      rowKey='id'
      dataSource={data}
      columns={displayedColumns}
      pagination={{ hideOnSinglePage: true }}
    />
  );
};

export default TraitementTable;
