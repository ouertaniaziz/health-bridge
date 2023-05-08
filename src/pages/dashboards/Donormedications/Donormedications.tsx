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

  const handleConfirmDelete = () => {
    if (deletingMedication) {
      //handleDelete(deletingMedication);
      setDeletingMedication(null);
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
          onClick={() => {
            setDeletingMedication(medication);
          }}
          shape='circle'
          danger
        >
          <span className='icofont icofont-ui-delete' />
        </Button>
      </Popconfirm>
      
        <Button

          shape='circle'
          danger
          onClick={()=>{
            handleopen(medication)
          }}
        >
        
          <span className='icofont icofont-ui-add' />
        </Button>
      
    </div>
  );

  usePageData(pageData);
  const onEditPatient = () => null

  return (
    <>
      <Medicationtable data={medications} actions={medicationActions} openit={openmodal} selected={selecteddonation} />
     
       
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