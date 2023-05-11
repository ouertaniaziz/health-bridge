import React, { useState, useEffect, PropsWithChildren } from 'react';
import { Button, Popconfirm, notification } from 'antd';
import { useFetchPageData, usePageData } from '../../../../hooks/usePage';

import { IPageData } from '../../../../interfaces/page';
import { SendOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import usePost from '../../../../hooks/usePost';
import { IPrescription } from '../../../../interfaces/prescription';
import axiosInstance from '../../../../config/axios';
import PrescriptionPharmacistTable from './Prescriptionspharmacisttable';
import { set } from 'mongoose';
const pharmacistid=JSON.parse(localStorage.getItem('user'))?.id;
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
interface PharmacistWithKey extends IPrescription {

  key:number
  
    }
interface PrescriptionTablePolyclinicProps {
  data:Partial <PharmacistWithKey>[];
  actions: (prescription: IPrescription) => JSX.Element;
}
const PrescriptionPharmacist = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [opendecline, setOpendecline] = useState(false);
  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  
  const [selectedp, setselectedp] = useState<PharmacistWithKey>();
  const[selectedkey,setkey]=useState<number>();
  const [api, contextHolder] = notification.useNotification();
  const [Prescription, setPrescription] = useFetchPageData<IPrescription[]>(`/pharmacist/getallprescriptions/${pharmacistid}`);
  const [testdata,settestdata]=useState<Partial<PharmacistWithKey>[]>();
  var alldata:Partial<PharmacistWithKey>[]=Prescription?.map((prescription,index)=>{
    return{
        key:index,
        _id:prescription._id,
        doctor:prescription.doctor,
        patient:prescription.patient,
        traitement:prescription.traitement,
        date:prescription.date
    }
  })
  useEffect(()=>{
    settestdata(alldata);

  },[])
  const Notificationwithfail = (type: NotificationType) => {
    api[type]({
      message: `an Error has been occured `,
      description:
        'an Error has been occured ,please try again later!'
    });
  };
  const Notificationwithsuccess = (type: NotificationType, text: String) => {
    api[type]({
      message: `Your ${text} has been Updated `,
      description:
        'The selected prescription has been updated in our database and we will inform others about this about your update'
    });
  };
  const handleselec = (Prescription) => {
    //console.log(Prescription)
      console.log(Prescription)
      setOpen(true);
      setkey(Prescription.key)    

    setselectedp(Prescription);
  };
  
  const handleOK = () => {
//     axiosInstance
//       .post('/pharmacist/addprescriptiontoPharmacist', { user:pharmacistid,prescription:selectedp._id })
//       .then((res) => {
// setTimeout(() => {
//           Notificationwithsuccess('success', 'Approval');
  
// }, 1000);
//          setselectedp(null);
//         setkey(null)
//         setOpen(false);
//         // find the index of the item with key "c"


//         Notificationwithsuccess('success', 'Approval');
//         console.log('approved triggered');
       
//       })
//       .catch((error) => {
//         console.log(error.message);
//           setselectedp(null);
//         setkey(null)
//         setOpen(false);
//         Notificationwithfail('error');
      
//       });
let index = testdata.findIndex(item => item._id === selectedp._id);
console.log(index)
// extract a portion of the array starting at that index
     settestdata(alldata.splice(index, 1));
        setOpen(false)
        console.log(testdata)
  };
 

const handlecancel=()=>{
  setOpen(false);
  setkey(null)
}
  usePageData(pageData);

  
  
  
  const prescriptionActions = (Prescription) => (
    <div className='buttons-list nowrap' style={{ width: '120px' }}>
      {contextHolder}
      <div>
        <Popconfirm
          title='Title'
          description='Open Popconfirm with async logic'
          open={ open === true &&Prescription.key===selectedkey}
          onConfirm={handleOK}
          onCancel={handlecancel}
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
      {/* <div>
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
      </div> */}
    </div>
  );

  const PrescriptionTableWithActions = ({ data, actions }: PrescriptionTablePolyclinicProps) => {
    return <PrescriptionPharmacistTable data={alldata} actions={actions} />;
  };
 
  const PrescriptionTableWithRemoveActions: React.FC<
    PropsWithChildren<PrescriptionTablePolyclinicProps>
  > = ({ children, data, actions }) => {
    return (
      <>
        {contextHolder}
        <PrescriptionPharmacistTable data={alldata} actions={actions}></PrescriptionPharmacistTable>
      </>

    );
  };

  return (
    <>
      {contextHolder}
      <PrescriptionTableWithActions data={testdata} actions={prescriptionActions} />
    </>
  );
};

export default PrescriptionPharmacist;