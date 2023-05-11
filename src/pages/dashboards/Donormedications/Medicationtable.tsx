import React, { ReactNode, useEffect, useState } from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { IMedicationModel } from '../../../interfaces/medication';
import { Button, Form, Input, Modal } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { hasErrorFactory } from '../../../utils/hasError';
import axiosInstance from '../../../config/axios';
import IMedicationsTable from './Addmedication';
import PageAction from '../../../layout/components/page-action/PageAction';
 

const Item = Form.Item;

type Props = {
  data: IMedicationModel[];
  actions?: (medication: IMedicationModel) => ReactNode;
  openit:boolean;
  selected:IMedicationModel,
  cancelit:  ()=>void
  
};
//////////////////////Form
const  medicationSchema = Yup.object().shape({
  donor: Yup.string().required('requried'),
  medicationname: Yup.string().required(),
  validationperiod: Yup.number().required(),
  packetsname: Yup.string().required(),
  description: Yup.string().required(),
  quantity: Yup.number().required(),

});





const handleClose=()=>{
  
}

//

const defaultSubmitText = 'Add Medication';



//////////////////
const MedicationTable = ({ data, actions ,openit,selected,cancelit}: Props) => {
useEffect(()=>{
  console.log('lena',selected)
},[selected])

  const emptyD: IMedicationModel= {
    medicationname : selected?.medicationname,
    validationperiod:selected?.validationperiod,
    packetsname:selected?.packetsname,
    description:selected?.description,
    quantity:selected?.quantity,
    
  };



  //form
  const  medicationSchema = Yup.object().shape({
    donor: Yup.string().required('requried'),
    medicationname: Yup.string().required(),
    validationperiod: Yup.number().required(),
    packetsname: Yup.string().required(),
    description: Yup.string().required(),
    quantity: Yup.number().required()
  });
  
 
  const DonationForm = ({  onClose,selected }) => {
    const {values,setValues, handleSubmit, handleChange, isValid, errors, touched, handleBlur } = useFormik<any>({
      initialValues: emptyD,
      validationSchema: medicationSchema,
      onSubmit: (values) => {
        console.log(values)
        console.log('belehy')
        onClose();
      }
    });
  
  const handlesubmitdonation=(values)=>{
    console.log(values)

    axiosInstance.put(`/donation/medication/${selected._id}`, values)
    .then((response) => {
      // Gérer la réponse du serveur
      console.log(response.data);
      cancelit()
      
    })
    .catch((error) => {
      // Gérer les erreurs
      console.log(error);
    });
    
  }
  
  
    const hasError = hasErrorFactory(touched, errors);
  
    const handleClose = () => {
      cancelit();
    };
  
    return (
      <>
        <Form layout='vertical'>
         
  
          <Item 
          rules={[{ required: true ,}, { min: 3,  message: 'Please enter medicationname' }]}
          name='medicationname'
          label='New Name'
  >
            <Input
              name='medicationname'
              defaultValue={values.medicationname}
              onChange={handleChange}

              
            />
  
          </Item>
          <Item 
          label='validationperiod'
          >
            <Input
            
              type='number'
             
              name='validationperiod'
              placeholder='validationperiod'
              onBlur={handleBlur}
              onChange={handleChange}
              className={hasError('billNo')}
              defaultValue={values.validationperiod}
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
          name='packetsname'
          label='packetsname'
  >
            <Input
              name='packetsname'
              defaultValue={values.packetsname}
              onChange={handleChange}

            />
  
          </Item>
          <Item 
          rules={[{ required: true ,}, { min: 3, message: '3' }]}
          name='description'
          label='description'
  >
            <Input
              name='description'
              defaultValue={values.description}
              onChange={handleChange}

            />
  
          </Item>
        </Form>
  
        <div className='modal-footer d-flex justify-content-between mt-3'>
          <Button danger onClick={handleClose}>
            Cancel
          </Button>
  
          <Button htmlType='submit'  type='primary'  onClick={() => handlesubmitdonation(values)}>
          Edit
          </Button>
        </div>
      </>
    );
  };
  //
  const columns: ColumnProps<IMedicationModel>[] = [
    {
      key: 'medicationname',
      dataIndex: 'medicationname',
      title: 'Medication Name',
      sorter: (a, b) => (a.medicationname > b.medicationname ? 1 : -1),
      render: (medicationname) => <strong>{medicationname}</strong>,
    },
    {
      key: 'validationperiod',
      dataIndex: 'validationperiod',
      title: 'validation period',
      sorter: (a, b) => a.validationperiod - b.validationperiod,
    },
    {
      key: 'quantity',
      dataIndex: 'quantity',
      title: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      key: 'packetsname',
      dataIndex: 'packetsname',
      title: 'packets name',
      sorter: (a, b) => (a.packetsname > b.packetsname ? 1 : -1),
    },
    {
        key: 'description',
        dataIndex: 'description',
        title: 'Description',
        sorter: (a, b) => (a.description > b.description ? 1 : -1),
      },
  ];

  if (actions) {
    columns.push({
      key: 'actions',
      title: 'Actions',
      render: actions,
    });
  }

 
  const [visible, setVisibility] = useState<boolean>(false);


  return (
    <>
    <Table
      rowKey='_id'
      dataSource={data}
      columns={columns}
      pagination={{ hideOnSinglePage: true }}
    />
    <Modal
        title={<h5 className='m-0'>Edit Medication</h5>}
        //onCancel={()=>}
        open={openit}
        destroyOnClose
        footer={null}
      >
        <DonationForm  onClose={handleClose} selected={selected} />
      </Modal>
      <IMedicationsTable title={<h5 className='m-0'>Add Medication</h5>} medications={data} type='none' pagination={{ hideOnSinglePage: true }}/> 

      <Button>

    <PageAction onClick={() => setVisibility(true)} icon='icofont-plus' type='primary' />
    </Button>

    </>
  );
};

export default MedicationTable;