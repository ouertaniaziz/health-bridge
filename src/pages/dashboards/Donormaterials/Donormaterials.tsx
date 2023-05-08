import React, { useState } from 'react';
import { Button, Form, Input, Modal, Popconfirm } from 'antd';
import Materialtable from './Materialtable';
import { useFetchPageData, usePageData } from '../../../hooks/usePage';
import {IMaterial } from '../../../interfaces/material';
import { IPageData } from '../../../interfaces/page';
import PageAction from '../../../layout/components/page-action/PageAction';
// import AddMedication from './Addmedication';
import MaterialForm from './MaterialForm';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { hasErrorFactory } from '../../../utils/hasError';
import Item from 'antd/es/list/Item';
//FOrm///////////////////



/////////////////////////////////
const pageData: IPageData = {
  title: 'Materials',
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Donor',
      route: 'dashboard-donor',
    },
    {
      title: 'Materials',
    },
  ],
};

const MaterialPage = () => {
  const [materials, setMaterials] = useFetchPageData<IMaterial[]>('./donation/getmaterials', []);
  const [deletingMaterial, setDeletingMaterial] = useState<IMaterial | null>(null);
const [openmodal,setmodal]=useState<boolean>(false);
const [selecteddonation,setdonation]=useState<IMaterial>();

const handleopen=(material:IMaterial)=>{
  setmodal(true)
  console.log('f',material)
  setdonation(material)
  console.log('fffffffffffff',selecteddonation)
}
//
  const handleCancelDelete = () => {
    setDeletingMaterial(null);
  };

  const handleConfirmDelete = () => {
    if (deletingMaterial) {
      //handleDelete(deletingMedication);
      setDeletingMaterial(null);
    }
  };

  const materialActions = (material: IMaterial) => (
    <div className='buttons-list nowrap'>
      <Popconfirm
        title='Are you sure you want to delete this medication?'
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
       // visible={!!deletingMedication && deletingMedication._id === medication._id}
      >
        <Button
          onClick={() => {
            setDeletingMaterial(material);
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
            handleopen(material)
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
      <Materialtable data={materials} actions={materialActions} openit={openmodal} selected={selecteddonation} />
     
       

        
        {/* <PatientForm
          submitText='Update patient'
          onCancel={closeModal}
          onSubmit={onEditPatient}
          patient={patient}
        /> */}
        {/* <Form 
        submitText='Update patient'
          //onCancel={()=>setmodal(false)}
          //onSubmit={onEditPatient}

          medication={selecteddonation}>

        </MedicationForm> */}
      {/* </Modal>
      <PageAction
        icon='icofont-plus'
        type={'primary'}
        onClick={() => {
          // add code for adding a new medication here
        }}
      /> */}

      <Popconfirm
        title='Are you sure you want to delete this medication?'
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        visible={!!deletingMaterial}
      ></Popconfirm>
    </>
  );
};

export default MaterialPage;