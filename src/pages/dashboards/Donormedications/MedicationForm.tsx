import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IDonor } from '../../../interfaces/donor'

import { hasErrorFactory } from '../../../utils/hasError';

import { IMedicationModel } from '../../../interfaces/medication';
import IMedicationsTable from './Addmedication';
import PageAction from '../../../layout/components/page-action/PageAction';

type Props = {
  submitText?: string;
  medication:IMedicationModel;
  medications: IMedicationModel[]; 
};

const defaultSubmitText = 'Add Medication';

const emptyMedication: IMedicationModel = {    
  medicationname :' ',
  validationperiod: 0,
  packetsname:'',
  description: "",
  quantity: 0
};

const medicationSchema = Yup.object().shape({
  donor: Yup.string().required(),
  medicationname: Yup.string().required(),
  validationperiod: Yup.number().required(),
  packetsname: Yup.string().required(),
  description: Yup.string().required(),
  quantity: Yup.number().required()
});

const MedicationForm = ({
  submitText = defaultSubmitText,
  medication:IMedicationModel,
  medications,
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
  } = useFormik<IMedicationModel>({
    validationSchema: medicationSchema,
    initialValues: emptyMedication,
    onSubmit: (form) => {
      resetForm();
    }
  });

  const hasError = hasErrorFactory(touched, errors);

    function setVisibility(arg0: boolean): void {
        throw new Error('Function not implemented.');
    }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <Input
            name='donor'
            placeholder='Donor'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.donor.user.firstname}
            className={hasError('donor')}
          />
        </div>

        <div className='form-group'>
          <Input
            defaultValue={values.medicationname}
            placeholder='Medication Name'
            onBlur={handleBlur}
            name='medicationname'
            onChange={handleChange}
            className={hasError('medicationname')}
          />
        </div>

        <div className='form-group'>
          <Input
            defaultValue={values.validationperiod}
            type='number'
            placeholder='Validation Period'
            onBlur={handleBlur}
            name='validationperiod'
            onChange={handleChange}
            className={hasError('validationperiod')}
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
            defaultValue={values.packetsname}
            placeholder='Packets Name'
            onBlur={handleBlur}
            name='packetsname'
            onChange={handleChange}
            className={hasError('packetsname')}
          />
        </div>
    <div className='form-group'>
      <Input.TextArea
        defaultValue={values.description}
        placeholder='Description'
        onBlur={handleBlur}
        name='description'
        onChange={handleChange}
        className={hasError('description')}
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

export default MedicationForm;
