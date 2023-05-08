import React, { ReactNode, useEffect, useState } from 'react';

import { Badge, Table, Alert, Button, Space ,Dropdown,Menu} from 'antd';

import { ColumnProps } from 'antd/es/table';
import { IMedication } from '../../../../interfaces/patient';
import { IPrescription } from '../../../../interfaces/prescription';
import { relative } from 'path';
import Popconfirm from 'antd/lib/popconfirm';
import { DownOutlined } from '@ant-design/icons';
const menu = (
    <Menu>
      <Menu.Item>Action 1</Menu.Item>
      <Menu.Item>Action 2</Menu.Item>
    </Menu>
  );

const columns: ColumnProps<IPrescription>[] = [
  {
    key: 'name',
    dataIndex: 'doctor',
    title: 'Doctor Name',
    //sorter: (a, b) => (a.medicationName > b.medicationName ? 1 : -1),
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
    //sorter: (a, b) => (a.dosageForm > b.dosageForm ? 1 : -1),
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
    //sorter: (a, b) => (a.dosageStrength > b.dosageStrength ? 1 : -1),
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
    //sorter: (a, b) => (a.dosageStrength > b.dosageStrength ? 1 : -1),
    render: (date) => (
      <span className='nowrap' style={{ color: '#336cfb' }}>
        {date.slice(0, 10)}
      </span>
    )
  },
  
];
interface PharmacistWithKey extends IPrescription {

  key:number
  
    }
type Props = {
  data: Partial<PharmacistWithKey>[];
  actions?: (prescription: IPrescription) => ReactNode;
};
const PrescriptionPharmacistTable = ({ data, actions }: Props) => {
    //new table
    const [expandedRowKeys, setExpandedRowKeys] = useState<IPrescription>();

    const expandedRowRender = (Prescription,key) => {
          //  if(Prescription.date===expandedRowKeys.date){
        const columns = [
          { title: 'medication Name', dataIndex: 'medicationName', key: 'medicationName' },
          { title: 'dosage Form', dataIndex: 'dosageForm', key: 'dosageForm' },
         ,{
            title: 'validation Period',dataIndex:'validationPeriod',key:'validationPeriod'
    
         },{
            title:'expiration Date',dataIndex:'expirationDate',key:'expirationDate'
         },
          { title: 'Number of packets ', dataIndex: 'numPackets', key: 'numPackets' },
         
      
        ];
    
        const dataplus=Prescription.traitement  
         const new_data:any=Prescription.traitement.map((medication,index)=>{
            return{
                key:index,
                medicationName:medication.medicationName,
                dosageForm:medication.dosageForm,
                validationPeriod:medication.validationPeriod.slice(0, 10),
                expirationDate:medication.expirationDate.slice(0, 10),
                numPackets:medication.numPackets
            }
         })
         {}
        return <Table columns={columns} dataSource={new_data} pagination={false} />;
            // }
            // else{
            //     return null;
            // }
      };

    /////////////
  const actionColumn: ColumnProps<IPrescription> = {
    key: 'actions',
    title: 'Actions',
    render: actions
  };
 
  
  const displayedColumns = actions ? [...columns, actionColumn] : columns;

  return (
    <>
      <Table
        dataSource={data}
        className='components-table-demo-nested'
        columns={displayedColumns}
        expandedRowRender={expandedRowRender}
        onexpand={(expanded, record) => {
           // setExpandedRowKeys(record)
           console.log("hia",record,'ex',expanded)
        }}
        
        pagination={{ hideOnSinglePage: true }}
      />
    
    </>
  );
};
export default PrescriptionPharmacistTable;