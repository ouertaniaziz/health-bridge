import React, { useState } from 'react';
import { Button, Form, Input, Modal, Popconfirm } from 'antd';
import Medicationtable from './Medicationtable';
import { useFetchPageData, usePageData } from '../../../hooks/usePage';
import {IMedicationModel } from '../../../interfaces/medication';
import { IPageData } from '../../../interfaces/page';
import PageAction from '../../../layout/components/page-action/PageAction';
import AddMedication from './Addmedication';
import MedicationForm from './MedicationForm';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { hasErrorFactory } from '../../../utils/hasError';
import Item from 'antd/es/list/Item';
import axiosInstance from '../../../config/axios';
//FOrm///////////////////



/////////////////////////////////
const pageData: IPageData = {
  title: 'Medications',
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Donor',
      route: 'dashboard-donor',
    },
    {
      title: 'Medications',
    },
  ],
};

const MedicationPage = () => {
  const [medications, setMedications] = useFetchPageData<IMedicationModel[]>('./donation/getallmedications', []);
  const [deletingMedication, setDeletingMedication] = useState<IMedicationModel | null>(null);
const [openmodal,setmodal]=useState<boolean>(false);
const [selecteddonation,setdonation]=useState<IMedicationModel>();


const handleopen=(medication:IMedicationModel)=>{
  setmodal(true)
  console.log('f',medication)
  setdonation(medication)
  console.log('fffffffffffff',selecteddonation)
}
//
  const handleCancelDelete = () => {
    setDeletingMedication(null);
  };

  const handleConfirmDelete = async (medication) => {
    console.log(deletingMedication)
    if (deletingMedication) {
      try {
       const response = await axiosInstance.delete(`/donation/medication/${deletingMedication._id}`);
        //console.log(response.data);       
         setDeletingMedication(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const medicationActions = (medication: IMedicationModel) => (
    <div className='buttons-list nowrap'>
      <Popconfirm
        title='Are you sure you want to delete this medication?'
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        
       // visible={!!deletingMedication && deletingMedication._id === medication._id}
      >
        <Button
          onClick={(medcation) => {
            setDeletingMedication(medication);
           // console.log(medication)
          }}
          shape='circle'
          danger
        >
          <span className='icofont icofont-ui-delete' />
        </Button>
      </Popconfirm>
      
        <Button

          shape='circle'
          className="ant-btn css-dev-only-do-not-override-yp8pcc ant-btn-circle ant-btn-primary"

          onClick={()=>{
            handleopen(medication)
          }}
        >
        
          <span className='icofont icofont-edit-alt' />
        </Button>
      
    </div>
  );

  usePageData(pageData);
  const onEditPatient = () => null
  const cancelmodal=()=>{
    setmodal(false);
  }

  return (
    <>
      <Medicationtable data={medications} actions={medicationActions} openit={openmodal} selected={selecteddonation} cancelit={cancelmodal}/>
     
       
      <Popconfirm
        title='Are you sure you want to delete this medication?'
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        visible={!!deletingMedication}
      ></Popconfirm>
    </>
  );
};

export default MedicationPage;