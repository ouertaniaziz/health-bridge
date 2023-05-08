import React from 'react';

import { useFormik } from 'formik';
import { Form, Button, Input, Select, AutoComplete, Divider } from 'antd';
import * as Yup from 'yup';

import Socials from '../../../layout/components/socials/Socials';
import ImageLoader from '../../../layout/components/patients/ImageLoader';

import { hasErrorFactory } from '../../../utils/hasError';
import { useFetch } from '../../../hooks/useFetch';
import { IUser } from '../../../interfaces/user';

const { TextArea } = Input;

type Props = {
  onSubmit: (donor: IUser) => void;
  onCancel: () => void;
};

const donorScheme = Yup.object({
      firstname: Yup.string().required(),
  lastName: Yup.string().required(),
  img: Yup.string().required(),
  donationDate: Yup.string().required(),
  description: Yup.string().required()
});

const initialValues = {
  firstname: null,
  lastName: null,
  img: null,
  donationDate: null,
  description: null,
  social: [
    {
      icon: 'icofont-instagram',
      link: '#'
    },
    {
      icon: 'icofont-facebook',
      link: '#'
    },
    {
      icon: 'icofont-twitter',
      link: '#'
    }
  ]
};

const DonorForm = ({ onSubmit, onCancel }: Props) => {
  const { setFieldTouched, handleChange, handleBlur, values, setValues, isValid, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: donorScheme,
      validateOnMount: true,
      initialErrors: { firstname: null },
      onSubmit: (values) => {
        onSubmit(values);
      }
    });


  const handleImgLoad = (img) => {
    setValues({ ...values, img });
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleSubmit = () => {
    if (!isValid) return;

    onSubmit(values);
    onCancel();
  };

  const hasError = hasErrorFactory(touched, errors);

  return (
    <>
      <Form>
        <div className='form-group'>
          <ImageLoader onLoad={handleImgLoad} src={values.img} />
        </div>

        <div className='form-group'>
          <Input
            name='firstname'
            type='text'
            placeholder='First name'
            onChange={handleChange}
            onBlur={handleBlur}
            defaultValue={values.firstname}
            className={hasError('firstname')}
          />
        </div>

        <div className='form-group'>
          <Input
            type='text'
            name='lastName'
            placeholder='Last name'
            onChange={handleChange}
            onBlur={handleBlur}
            defaultValue={values.lastName}
            className={hasError('lastName')}
          />
        </div>

        <TextArea
          rows={3}
          name='donationDate'
          placeholder='donationDate'
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values.donationDate}
          className={hasError('donationDate')}
        />
        
        <TextArea
          rows={3}
          name='address'
          placeholder='Address'
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values.description}
          className={hasError('description')}
        />

        <Divider />

        <Socials links={values.social} />

        <div className='d-flex justify-content-between buttons-list settings-actions mt-4'>
          <Button danger onClick={handleCancel}>
            Cancel
          </Button>

          <Button disabled={!isValid} onClick={handleSubmit} htmlType='submit' type='primary'>
            Add Donor
          </Button>
        </div>
      </Form>
    </>
  );
};

export default DonorForm;
