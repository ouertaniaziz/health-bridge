import React, { ReactNode, useEffect } from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { IMaterial } from '../../../interfaces/material';
import { Button, Form, Input, Modal } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { hasErrorFactory } from '../../../utils/hasError';
import axiosInstance from '../../../config/axios';
import PageAction from '../../../layout/components/page-action/PageAction';

import IMaterialTable from './Addmaterial';

const Item = Form.Item;

type Props = {
  data: IMaterial[];
  actions?: (material: IMaterial) => ReactNode;
  openit:boolean;
  selected:IMaterial
};
//////////////////////Form
const  materialSchema = Yup.object().shape({
  donor: Yup.string().required('requried'),
  materialnname: Yup.string().required(),
  quantity: Yup.number().required(),
  state: Yup.string().required(),
 
});





const handleClose=()=>{
  
}

//

const defaultSubmitText = 'Edit Material';



//////////////////
const MaterialTable = ({ data, actions ,openit,selected}: Props) => {
useEffect(()=>{
  console.log('lena',selected)
},[selected])

  const emptyD: IMaterial= {
    materialname : selected?.materialname ,
    quantity:selected?.quantity,
    state:selected?.state,
   
    

  };



  //form
  const  materialSchema = Yup.object().shape({
    donor: Yup.string().required('requried'),
    materialname: Yup.string().required(),
    quantiy: Yup.number().required(),
    state: Yup.string().required()
    });
  
 
  const DonationForm = ({  onClose,selected }) => {
    const {values,setValues, handleSubmit, handleChange, isValid, errors, touched, handleBlur } = useFormik<any>({
      initialValues: emptyD,
      validationSchema: materialSchema,
      onSubmit: (values) => {
        console.log(values)
        console.log('belehy')
        onClose();
      }
    });
  
  const handlesubmitdonation=(values)=>{
    console.log(values)

    axiosInstance.put(`/donation/material/${selected._id}`, values)
    .then((response) => {
      // Gérer la réponse du serveur
      console.log(response.data);
    })
    .catch((error) => {
      // Gérer les erreurs
      console.log(error);
    });
    
  }
  
  
    const hasError = hasErrorFactory(touched, errors);
  
    const handleClose = () => {
      onClose();
    };
  
    return (
      <>
        <Form layout='vertical'>
         
  
          <Item 
          rules={[{ required: true ,}, { min: 3,  message: 'Please enter material name' }]}
          name='materialname'
          label='New Name'
  >
            <Input
              name='materialname'
              defaultValue={values.materialname}
              onChange={handleChange}

              
            />
  
          </Item>
          <Item 
          label='quantity'
          >
            <Input
            
              type='number'
             
              name='quantity'
              placeholder='quantity'
              onBlur={handleBlur}
              onChange={handleChange}
              className={hasError('billNo')}
              defaultValue={values.quantity}
            />
          </Item>
  
  
  
  
  
          
  
          <Item 
          rules={[{ required: true ,}, { min: 3, message: '3' }]}
          name='state'
          label='state'
  >
            <Input
              name='state'
              defaultValue={values.state}
              onChange={handleChange}

            />
  
          </Item>
          
        </Form>
  
        <div className='modal-footer d-flex justify-content-between mt-3'>
          <Button danger onClick={handleClose}>
            Cancel
          </Button>
  
          <Button htmlType='submit'  type='primary'  onClick={() => handlesubmitdonation(values)}>
            Add
          </Button>
        </div>
      </>
    );
  };
  //
  const columns: ColumnProps<IMaterial>[] = [
    {
      key: 'materialname',
      dataIndex: 'materialname',
      title: 'Material Name',
      sorter: (a, b) => (a.materialname > b.materialname ? 1 : -1),
      render: (materialname) => <strong>{materialname}</strong>,
    },
    {
      key: 'quantity',
      dataIndex: 'quantity',
      title: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      key: 'state',
      dataIndex: 'state',
      title: 'state',
      sorter: (a, b) => (a.state > b.state ? 1 : -1),
    }
  ];

  if (actions) {
    columns.push({
      key: 'actions',
      title: 'Actions',
      render: actions,
    });
  }

  function setVisibility(arg0: boolean): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
    <Table
      rowKey='_id'
      dataSource={data}
      columns={columns}
      pagination={{ hideOnSinglePage: true }}
    />
    <Modal
        title={<h5 className='m-0'>Edit Material</h5>}
        //onCancel={()=>}
        open={openit}
        destroyOnClose
        footer={null}
      >
        <DonationForm  onClose={handleClose} selected={selected} />
      </Modal>

      <IMaterialTable title={<h5 className='m-0'>Add Medication</h5>} medications={data} type='none' pagination={{ hideOnSinglePage: true }}/> 

      <Button>

    <PageAction onClick={() => setVisibility(true)} icon='icofont-plus' type='primary' />
    </Button>

    </>
  );
};

export default MaterialTable;