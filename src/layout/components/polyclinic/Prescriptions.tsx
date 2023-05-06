import React, { useState, useEffect, PropsWithChildren } from 'react';
import { Button } from 'antd';
import { useFetchPageData, usePageData } from '../../../hooks/usePage';

import PrescriptionTable from '../../../layout/components/prescription/PrescriptionTable';
import { IMedication, PrescriptionTableProps } from '../../../interfaces/patient';
import { IPageData } from '../../../interfaces/page';
import { SendOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import usePost from '../../../hooks/usePost';
import PrescriptionTablePolyclinic from './PrescriptiontablePolyclinic';
import { IPrescription } from '../../../interfaces/prescription';
const pageData: IPageData = {
  title: 'Prescription',
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Polyclinic',
      route: 'default-dashboard'
    },
    {
      title: 'Prescription'
    },
    {
      title: 'Prescription'
    }
  ]
};
interface PrescriptionTablePolyclinicProps {
  data: IPrescription[];
  actions: (prescription: IPrescription) => JSX.Element;
}
const PrescriptionPolyclinic = () => {
  const history = useHistory();

  //const doctorId = JSON.parse(localStorage.getItem('user'))?.id;

  usePageData(pageData);

  const [Prescription, setPrescription] = useFetchPageData<IPrescription[]>(
    `/polyclinics/prescriptions`,
    []
  );

  const prescriptionActions = (Prescription: IPrescription) => (
    <div className='buttons-list nowrap'>
      <Button shape='circle' type='primary'>
        <span className='icofont icofont-ui-add' />
      </Button>
    </div>
  );

  const PrescriptionTableWithActions = ({ data, actions }: PrescriptionTablePolyclinicProps) => {
    return <PrescriptionTablePolyclinic data={data} actions={actions} />;
  };

  const PrescriptionTableWithRemoveActions: React.FC<
    PropsWithChildren<PrescriptionTablePolyclinicProps>
  > = ({ children, data, actions }) => {
    return (
      <PrescriptionTablePolyclinic data={data} actions={actions}></PrescriptionTablePolyclinic>
    );
  };
  return (
    <>
      <PrescriptionTableWithActions data={Prescription} actions={prescriptionActions} />
    </>
  );
};

export default PrescriptionPolyclinic;
