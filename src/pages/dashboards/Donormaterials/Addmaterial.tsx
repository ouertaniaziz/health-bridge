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
import { IMaterial} from '../../../interfaces/material';
import axiosInstance from '../../../config/axios';

const pageData: IPageData = {
  title: 'material',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Donor',
      route: 'dashboard-donor'
    },
    {
      title: 'Material'
    }
  ]
};

const Item = Form.Item;

const materialScheme = Yup.object({
 materialname: Yup.string().required(),
 quantity: Yup.number().required(),
  state: Yup.string().required(),
  
});

const handleAdd =  (data) => {
    console.log(data);
    axiosInstance.post('/donation/addMaterial', data)
    .then((res) => {
      console.log('approved triggered');
      //setselectedp(null);
    })
    .catch((error) => {
      console.log(error.message);
      //setOpen(false);
    });
}

const AddMaterialForm = ({ onSubmit, onClose }) => {
  const { handleSubmit, handleChange, isValid, errors, touched, handleBlur } = useFormik<any>({
    initialValues: {
        materialname: '',
        quantity: 0,
        state: '',
    },
    initialErrors: { empty: null },
    validationSchema: materialScheme,
    onSubmit: (values) => {
        console.log("handleSubmit", values);
       let material= {
        materialname: values.materialname,
        quantity: values.quantity,
        state: values.state,
       }
     handleAdd(material);
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
            name='materialname'
            placeholder='Material Name'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('Material Name')}
          />
        </Item>

        <Item>
          <Input
            type='number'
            name='quantity'
            placeholder='quantity'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('quantity')}
          />
        </Item>

        <Item>
          <Input
            name='state'
            placeholder='state'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('state')}
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


const Addmaterial = (props) => {
    type Props = {
        materials: IMaterial[];
        actions?: (material: IMaterial) => ReactNode;
        openit:boolean;
        selected:IMaterial,
        type?: string;
        pagination?: {
          hideOnSinglePage?: boolean;
        };
      };
      
  const [visible, setVisibility] = useState<boolean>(false);
  const [billings, setBillings] = useGetPayments();
  usePageData(pageData);

  const handleSubmit = (material) => {
    setBillings([material, ...billings]);
  };

  const handleClose = () => setVisibility(false);

  return (
    <>
      <PageAction onClick={() => setVisibility(true)} icon='icofont-plus' type='primary' />

      <Modal
        title={<h5 className='m-0'>Add Material</h5>}
        onCancel={handleClose}
        open={visible}
        destroyOnClose
        footer={null}
      >
        <AddMaterialForm onSubmit={handleSubmit} onClose={handleClose} />
      </Modal>
    </>
  );
};

export default Addmaterial;
