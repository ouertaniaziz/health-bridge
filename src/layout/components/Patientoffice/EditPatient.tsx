import React, { ChangeEvent, useState, useContext } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Divider, Form, Input, Select } from 'antd';

import ImageLoader from '../../../layout/components/patients/ImageLoader';

import { usePageData } from '../../..//hooks/usePage';
import { useGetUser } from '../../../hooks/useGetUser';

import { IPageData } from '../../../interfaces/page';
import { IPatient } from '../../../interfaces/patient';
import { hasErrorFactory } from '../../../utils/hasError';
import { Patientcontext, Patientcontextype } from './provider/PatientProvider';
import { IPatientModel } from '../../../interfaces/patientmodel';
import { updatepatient } from './service/patientservice';

const pageData: IPageData = {
  title: 'Edit account',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Apps',
      route: 'default-dashboard'
    },
    {
      title: 'Service Pages ',
      route: 'default-dashboard'
    },
    {
      title: 'Edit Account'
    }
  ]
};

const FormItem = Form.Item;
const Option = Select.Option;

const AccountForm = ({ user }) => {
  const [submitted, setSubmitted] = useState({});
  const patient = useContext<Patientcontextype>(Patientcontext);
  const emptyPatient: IPatientModel = {
    firstname: patient.user.firstname,
    lastname: patient.user.lastname,
    phone: patient.user.phone,
    email: patient.user.email,
    city: patient.user.city,
    postal_code: patient.user.postal_code,
    gender: patient.user.gender,
    state: patient.user.state
  };
  const { values, setValues, handleSubmit } = useFormik<IPatientModel>({
    onSubmit: (values) => {
      //setSubmitted(values);
      console.log(values);
      updatepatient({ ...values, _id: patient.user._id });
    },
    initialValues: emptyPatient
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name) => (value) => {
    setValues({ ...values, [name]: value });
  };

  const hasChanged = Object.keys(values).some((key) => values[key] !== submitted[key]);

  return (
    <Form layout='vertical'>
      {/* <div className={`avatar-wrapper mt-0`} style={{ paddingBottom: '10px' }}>
        <ImageLoader src={`data:image/png;base64,${values.image}`} size={100} />
      </div> */}
      <FormItem
        label='First Name'
        rules={[{ required: true }, { min: 3, message: '3' }]}
        style={{ paddingBottom: '15px' }}
        name='firstname'
      >
        <Input
          name='firstname'
          onChange={handleChange}
          placeholder='First Name'
          defaultValue={values.firstname}
        />
      </FormItem>

      <FormItem
        label='Last Name'
        rules={[{ required: true }, { min: 3 }]}
        style={{ paddingBottom: '15px' }}
        name='lastname'
      >
        <Input
          name='lastname'
          onChange={handleChange}
          defaultValue={values.lastname}
          placeholder='Last Name'
        />
      </FormItem>

      <FormItem
        label='Phone'
        rules={[{ required: true }, { min: 3 }]}
        style={{ paddingBottom: '15px' }}
        name='phone'
      >
        <Input
          type='number'
          name='phone'
          onChange={handleChange}
          defaultValue={values.phone}
          placeholder='phone'
        />
      </FormItem>

      <FormItem
        label='Phone number'
        rules={[{ required: true }, { min: 3 }]}
        style={{ paddingBottom: '15px' }}
        name='email'
      >
        <Input
          type='email'
          name='email'
          onChange={handleChange}
          defaultValue={values.email}
          placeholder='Phone number'
        />
      </FormItem>
      <FormItem label='Gender'>
        <Select
          onChange={handleSelectChange('gender')}
          defaultValue={values.gender}
          placeholder='Gender'
        >
          <Option value='Male'>Male</Option>
          <Option value='Female'>Female</Option>
        </Select>
      </FormItem>

      <FormItem
        label='City'
        rules={[{ required: true }, { min: 3 }]}
        style={{ paddingBottom: '15px' }}
        name='city'
      >
        <Input
          name='city'
          onChange={handleChange}
          defaultValue={values.city}
          placeholder='Address'
        />
      </FormItem>
      <FormItem
        label='State'
        rules={[{ required: true }, { min: 3 }]}
        style={{ paddingBottom: '15px' }}
        name='state'
      >
        <Input
          name='state'
          onChange={handleChange}
          defaultValue={values.state}
          //placeholder='state'
        />
      </FormItem>
      <FormItem
        label='postal code'
        rules={[{ required: true }, { min: 3 }]}
        style={{ paddingBottom: '15px' }}
        name='postal_code'
      >
        <Input
          type='number'
          name='postal_code'
          onChange={handleChange}
          defaultValue={values.postal_code}
          placeholder='Phone number'
        />
      </FormItem>

      <div className='elem-list justify-content-between'>
        <Button disabled={!hasChanged} className='bg-color-success' onClick={() => handleSubmit()}>
          <span className='text-color-500'>Save changes</span>
        </Button>

        <Button ghost danger className='ml-auto'>
          Delete account
        </Button>
      </div>
    </Form>
  );
};

const PasswordForm = () => {
  return (
    <Form layout='vertical'>
      <FormItem label='Current password'>
        <Input.Password placeholder='Current Password' />
      </FormItem>

      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <FormItem
            name='password'
            label='New Password'
            rules={[{ required: true, message: 'Please enter new password' }]}
          >
            <Input.Password placeholder='New Password' />
          </FormItem>
        </div>

        <div className='col-md-6 col-sm-12'>
          <FormItem
            name='confirmPassword'
            label='Confirm Password'
            rules={[
              {
                required: true,
                message: 'Please confirm your password!'
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                }
              })
            ]}
          >
            <Input.Password placeholder='Confirm Password' />
          </FormItem>
        </div>
      </div>

      <Button type='primary'>Change password</Button>
    </Form>
  );
};

const EditPatient = () => {
  const user = useGetUser();
  usePageData(pageData);
  return (
    <div className='stack' style={{ maxWidth: 690, margin: '0 auto' }}>
      <AccountForm user={user} />

      <Divider />

      {/* <PasswordForm /> */}
    </div>
  );
};

export default EditPatient;
