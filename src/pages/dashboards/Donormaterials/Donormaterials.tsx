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
import axiosInstance from '../../../config/axios';
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

  const handleConfirmDelete = async (material) => {
    console.log(deletingMaterial)
    if (deletingMaterial) {
      try {
       const response = await axiosInstance.delete(`/donation/material/${deletingMaterial._id}`);
        //console.log(response.data);       
         setDeletingMaterial(null);
      } catch (error) {
        console.error(error);
      }
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
          className="ant-btn css-dev-only-do-not-override-yp8pcc ant-btn-circle ant-btn-primary"

          onClick={()=>{
            handleopen(material)
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
      <Materialtable data={materials} actions={materialActions} openit={openmodal} selected={selecteddonation}  cancelit={cancelmodal}/>
     
       

        
      
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