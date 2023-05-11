import React, { ReactNode } from 'react';
import { Badge, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { IDoctor } from '../../../interfaces/doctor';

const columns: ColumnProps<IDoctor>[] = [
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Name',
    sorter: (a, b) => (a.name > b.name ? 1 : -1),
    render: (name) => <strong>{name}</strong>
  },
  {
    key: 'speciality',
    dataIndex: 'speciality',
    title: 'Speciality',
    sorter: (a, b) => (a.speciality > b.speciality ? 1 : -1),
    render: (speciality) => (
      <span className='nowrap' style={{ color: '#336cfb' }}>
        {speciality}
      </span>
    )
  },
  {
    key: 'aboutMe',
    dataIndex: 'aboutMe',
    title: 'About Me',
    render: (aboutMe) => (
      <span className='nowrap' style={{ color: '#a5a5a5' }}>
        {aboutMe}
      </span>
    )
  },
  {}
];

type Props = {
  data: IDoctor[];
  actions?: (doctor: IDoctor) => ReactNode;
};

const DoctorsTable = ({ data, actions }: Props) => {
  const actionColumn: ColumnProps<IDoctor> = {
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

export default DoctorsTable;
