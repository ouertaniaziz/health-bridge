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
  onSubmit: (adminpolyclinic: IUser) => void;
  onCancel: () => void;
};

const polyclinicScheme = Yup.object({
  location: Yup.string().required()
});

const initialValues = {
  location: null,
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

const PolyclinicForm = ({ onSubmit, onCancel }: Props) => {
  const [roles] = useFetch<{ value: string }[]>('./data/polyclinic-specialists.json', []);
  const { setFieldTouched, handleChange, handleBlur, values, setValues, isValid, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: polyclinicScheme,
      validateOnMount: true,
      initialErrors: { location: null },
      onSubmit: (values) => {
        onSubmit(values);
      }
    });

  const locations = [
    { label: 'Tunis Polyclinic', value: 'Tunis Polyclinic' },
    { label: 'Sousse Polyclinic', value: 'Sousse Polyclinic' },
    { label: 'Sfax Polyclinic', value: 'Sfax Polyclinic' }
  ];

  const handleLocationSelect = (location) => {
    setValues({ ...values, location });
  };

  const handleSubmit = () => {
    if (!isValid) return;

    onSubmit(values);
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  const hasError = hasErrorFactory(touched, errors);

  return (
    <>
      <Form>
        <div className='form-group'>
          {/* <ImageLoader onLoad={handleImgLoad} src={values.img} /> */}
        </div>

        <div className='row'>
          <div className='col-sm-6 col-12'>
            <div className='form-group'>
              <AutoComplete
                filterOption
                options={locations}
                placeholder='Location'
                onSelect={handleLocationSelect}
                onBlur={handleBlur}
                className={hasError('location')}
              />
            </div>
          </div>
        </div>

        <Divider />

        <Socials links={values.social} />

        <div className='d-flex justify-content-between buttons-list settings-actions mt-4'>
          <Button danger onClick={handleCancel}>
            Cancel
          </Button>

          <Button disabled={!isValid} onClick={handleSubmit} htmlType='submit' type='primary'>
            Add Polyclinic
          </Button>
        </div>
      </Form>
    </>
  );
};

export default PolyclinicForm;
