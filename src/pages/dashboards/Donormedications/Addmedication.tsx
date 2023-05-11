import React, { ReactNode, useState } from 'react';

import { Button, Form, Input, Modal } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import BillingTable from '../../medic/components/BillingTable';
import PageAction from '../../../layout/components/page-action/PageAction';

import { hasErrorFactory } from '../../../utils/hasError';
import { useGetPayments } from '../../../hooks/useGetBillings';
import { usePageData } from '../../../hooks/usePage';

import { IPageData } from '../../../interfaces/page';
import { IMedicationModel } from '../../../interfaces/medication';
import axiosInstance from '../../../config/axios';

const pageData: IPageData = {
  title: 'medication',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Donor',
      route: 'dashboard-donor'
    },
    {
      title: 'Medication'
    }
  ]
};

const Item = Form.Item;

const medicationScheme = Yup.object({
  medicationname: Yup.string().required(),
  validationperiod: Yup.number().required(),
  packetsname: Yup.string().required(),
  description: Yup.string().required(),
  quantity: Yup.number().required()
});

const handleAdd = (data) => {
    console.log(data);
    axiosInstance
      .post('/donation/addMedication', data)
      .then((res) => {
        console.log('approved triggered');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

const AddMedicationForm = ({ onSubmit, onClose }) => {
  const { handleSubmit, handleChange, isValid, errors, touched, handleBlur } = useFormik<any>({
    initialValues: {
        medicationname: '',
        validationperiod: 0,
        packetsname: '',
        description: '',
        quantity: 0
    },
   
   


    initialErrors: { empty: null },
    validationSchema: medicationScheme,
    onSubmit: (values) => {
        console.log("handleSubmit", values);
       let medication= {
        medicationname: values.medicationname,
        validationperiod: values.validationperiode,
        packetsname: values.packetname,
        description: values.description,
        quantity: values.quantity
       }
     handleAdd(medication);
      onSubmit(values);
      onClose();
    }
  });

  console.log({handleSubmit});


  const hasError = hasErrorFactory(touched, errors);

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Form layout='vertical'>

      <Item>
          <Input
            name='medicationname'
            placeholder='Medication Name'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('Medication Name')}
          />
        </Item>

        <Item>
          <Input
            type='number'
            name='validationperiode'
            placeholder='Validation Periode'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('Validation Periode')}
          />
        </Item>

        <Item>
          <Input
            name='packetsname'
            placeholder='Packets Name'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('Packets Name')}
          />
        </Item>
        
        <Item>
          <Input
            type='number'
            name='quantity'
            placeholder='Quantity'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('quantity')}
          />
        </Item>

        <Item>
          <Input
            name='description'
            placeholder='Description'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('description')}
          />
        </Item>

       
      </Form>

      <div className='modal-footer d-flex justify-content-between mt-3'>
        <Button danger onClick={handleClose}>
          Cancel
        </Button>

        <Button htmlType='submit' disabled={!isValid} type='primary' onClick={() => handleSubmit()}>
          Add
        </Button>
      </div>
    </>
  );
};


const Addmedication = (props) => {
    type Props = {
        medications: IMedicationModel[];
        actions?: (medication: IMedicationModel) => ReactNode;
        openit:boolean;
        selected:IMedicationModel,
        type?: string;
        pagination?: {
          hideOnSinglePage?: boolean;
        };
      };
      
  const [visible, setVisibility] = useState<boolean>(false);
  const [billings, setBillings] = useGetPayments();
  usePageData(pageData);

  const handleSubmit = (medication) => {
    setBillings([medication, ...billings]);
  };

  const handleClose = () => setVisibility(false);

  return (
    <>
      <PageAction onClick={() => setVisibility(true)} icon='icofont-plus' type='primary' />

      <Modal
        title={<h5 className='m-0'>Add Medication</h5>}
        onCancel={handleClose}
        open={visible}
        destroyOnClose
        footer={null}
      >
        <AddMedicationForm onSubmit={handleSubmit} onClose={handleClose} />
      </Modal>
    </>
  );
};

export default Addmedication;
