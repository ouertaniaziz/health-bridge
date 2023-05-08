import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IDonor } from '../../../interfaces/donor'

import { hasErrorFactory } from '../../../utils/hasError';

import { IMaterial } from '../../../interfaces/material';
type Props = {
  //onSubmit: (medication: IMedicationModel) => void;
  onCancel: () => void;
  submitText?: string;
  material:IMaterial
};

const defaultSubmitText = 'Add Medication';

const emptyMaterial: IMaterial = {
    
  
    materialname :' ',
    quantity: 0,
    state:'',
  
};

const materialSchema = Yup.object().shape({
  donor: Yup.string().required(),
  materialname: Yup.string().required(),
  quantity: Yup.number().required(),
  state: Yup.string().required(),
 
});

const MaterialForm = ({
  submitText = defaultSubmitText,
//   onSubmit,
//   onCancel,
  material:IMaterial
}: Props) => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    isValid,
    errors,
    touched,
    resetForm
  } = useFormik<IMaterial>({
    validationSchema: materialSchema,
    initialValues: emptyMaterial,
    onSubmit: (form) => {
    //   onSubmit(form);
      resetForm();
    }
  });

  const hasError = hasErrorFactory(touched, errors);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <div className='form-group'>
          <Input
          
            name='donor'
            placeholder='Donor'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.donor.user.firstname}
            className={hasError('donor')}
          />
        </div> */}

        <div className='form-group'>
          <Input
            defaultValue={values.materialname}
            placeholder='Material Name'
            onBlur={handleBlur}
            name='materialname'
            onChange={handleChange}
            className={hasError('materialname')}
          />
        </div>

        <div className='form-group'>
<Input
defaultValue={values.quantity}
type='number'
placeholder='quantity'
onBlur={handleBlur}
name='quantity'
onChange={handleChange}
className={hasError('quantity')}
/>
</div>
<div className='form-group'>
      <Input
        defaultValue={values.state}
        placeholder='state'
        onBlur={handleBlur}
        name='state'
        onChange={handleChange}
        className={hasError('state')}
      />
    </div>

    

    <div className='form-group'>
      <Button
        type='primary'
        htmlType='submit'
        disabled={!isValid}
        loading={false}
      >
        {submitText}
      </Button>
      <Button >Cancel</Button>
    </div>
  </form>
</>
);
};

export default MaterialForm;
