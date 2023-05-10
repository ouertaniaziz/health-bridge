import React, { useState, useEffect, PropsWithChildren } from 'react';
import { Button, Popconfirm, notification } from 'antd';
import { useFetchPageData, usePageData } from '../../../hooks/usePage';

import PrescriptionTable from '../../../layout/components/prescription/PrescriptionTable';
import { IMedication, PrescriptionTableProps } from '../../../interfaces/patient';
import { IPageData } from '../../../interfaces/page';
import { SendOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import usePost from '../../../hooks/usePost';
import PrescriptionTablePolyclinic from './PrescriptiontablePolyclinic';
import { IPrescription } from '../../../interfaces/prescription';
import axiosInstance from '../../../config/axios';
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
  const [open, setOpen] = useState(false);
  const [opendecline, setOpendecline] = useState(false);
  type NotificationType = 'success' | 'info' | 'warning' | 'error';

  const [selectedp, setselectedp] = useState<IPrescription | null>();
  const [api, contextHolder] = notification.useNotification();
  const Notificationwithfail = (type: NotificationType) => {
    api[type]({
      message: `an Error has been occured `,
      description:
        'This is maybe because someone else has already approved this prescription and you did not update your page yet , thank you for your understanding'
    });
  };
  const Notificationwithsuccess = (type: NotificationType, text: String) => {
    api[type]({
      message: `Your ${text} has been Updated `,
      description:
        'The selected prescription has been updated in our database and we will inform others about this about your decision'
    });
  };
  const handleselec = (Prescription: IPrescription) => {
    if (opendecline === false) {
      setOpen(true);
    }

    setselectedp(Prescription);
    
  };
  const handleselecdeclined = (Prescription: IPrescription) => {
    if (open === false) {
      setOpendecline(true);
    }
    setselectedp(Prescription);
   
  };
  const handleOK = () => {
    axiosInstance
      .post('/polyclinics/approveprescription', { _id: selectedp._id })
      .then((res) => {
        Notificationwithsuccess('success', 'Approval');
        console.log('approved triggered');
      })
      .catch((error) => {
        console.log(error.message);
        Notificationwithfail('error');
      });
  };
  const handledeclined = () => {
    axiosInstance
      .post('/polyclinics/declineprescription', { _id: selectedp._id })
      .then((res) => {
        Notificationwithsuccess('success', 'Decline');
       
      })
      .catch((error) => {
        Notificationwithfail('error');
        console.log(error.message);
      });
  };



  usePageData(pageData);

  const [Prescription, setPrescription] = useFetchPageData<IPrescription[]>(
    `/polyclinics/prescriptions`,
    []
  );

  const prescriptionActions = (Prescription: IPrescription) => (
    <div className='buttons-list nowrap' style={{ width: '120px' }}>
      {contextHolder}
      <div>
        <Popconfirm
          title='Title'
          description='Open Popconfirm with async logic'
          open={selectedp === Prescription && open === true}
          onConfirm={handleOK}
          onCancel={() => setOpen(false)}
        >
          <Button
            shape='round'
            type='ghost'
            style={{ backgroundColor: '#a0d911' }}
            onClick={() => handleselec(Prescription)}
          >
            <span className='icofont icofont-checked' />
            Approve
          </Button>
        </Popconfirm>
      </div>
      <div>
        <Popconfirm
          title='Title'
          description='Open Popconfirm with async logic'
          open={selectedp === Prescription && opendecline === true}
          onConfirm={handledeclined}
          onCancel={() => setOpendecline(false)}
        ></Popconfirm>
        <Button
          shape='round'
          type='ghost'
          style={{ backgroundColor: '#f5222d' }}
          onClick={() => handleselecdeclined(Prescription)}
        >
          <span className='icofont icofont-close-squared-alt' />
          Decline
        </Button>
      </div>
    </div>
  );

  const PrescriptionTableWithActions = ({ data, actions }: PrescriptionTablePolyclinicProps) => {
    return <PrescriptionTablePolyclinic data={data} actions={actions} />;
  };

  const PrescriptionTableWithRemoveActions: React.FC<
    PropsWithChildren<PrescriptionTablePolyclinicProps>
  > = ({ children, data, actions }) => {
    return (
      <>
        {contextHolder}
        <PrescriptionTablePolyclinic data={data} actions={actions}></PrescriptionTablePolyclinic>
      </>
    );
  };
  return (
    <>
      {contextHolder}
      <PrescriptionTableWithActions data={Prescription} actions={prescriptionActions} />
    </>
  );
};

export default PrescriptionPolyclinic;
