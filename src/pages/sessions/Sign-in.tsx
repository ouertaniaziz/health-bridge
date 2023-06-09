import React, { useState } from 'react';

import { Button, Form, Input, Switch } from 'antd';
import { LoginOutlined } from '@ant-design/icons/lib';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AuthService from '../../redux/login/auth.Service';
import PublicLayout from '../../layout/public/Public';
import { useForm } from 'antd/es/form/Form';
import {
  useNavigateDoctor,
  useNavigateHome,
  useNavigatePatient,
  useNavigateDonor,
  useNavigatePolyclinic, 
  useNavigatePharmacist 
} from '../../utils/use-navigate-home';
import authService from '../../redux/login/auth.Service';
import { Modal } from 'antd';
import WebcamCapture from './sigin_face/face-login';

const { Item } = Form;

const SignIn = () => {
  //face auth
  const [modalstatus, setmodalstatus] = useState(false);
  const openModal = () => setmodalstatus(true);
  const [postdata, setPostData] = useState([]);
  //
  const [form] = useForm();
  const navigateHome = useNavigateHome();
  const navigateDoctor = useNavigateDoctor();
  const navigatePatient = useNavigatePatient();
  const navigatePharmacist = useNavigatePharmacist();
  const NavigateDonor = useNavigateDonor();
  const navigatePolyclinic = useNavigatePolyclinic();
  const dispatch = useDispatch();

  const login = () => {
    form
      .validateFields()
      .then((result) => {
        console.log(result);
        AuthService.login(result.login, result.password)
          .then((currentUser) => {
            if (currentUser) {
              console.log(currentUser);
              if (currentUser.role.includes('doctor')) {
                navigateDoctor();
              } else if (currentUser.role.includes('patient')) {
                navigatePatient();
              } else if (currentUser.role.includes('pharmacist')) {
                navigatePharmacist();
              } else if (currentUser.role.includes('donor')) {
                NavigateDonor();
              } else if (currentUser.role.includes('adminpolyclinic')) {
                navigatePolyclinic();
              }
            }
          })
          .catch((err) => console.log(err));
        //
      })
      .catch(() => null);
  };

  return (
    <PublicLayout bgImg={`${window.origin}/content/login-page.jpg`}>
      <h4 className='mt-0 mb-1'>Login form</h4>

      <p className='text-color-200'>Login to access your Account</p>

      <Form form={form} layout='vertical' className='mb-4'>
        <Item name='login' rules={[{ required: true, message: <></> }]}>
          <Input placeholder='Login' />
        </Item>
        <Item name='password' rules={[{ required: true, message: <></> }]}>
          <Input placeholder='Password' type='password' />
        </Item>

        <div className='d-flex align-items-center mb-4'>
          <Switch defaultChecked /> <span className='ml-2'>Remember me</span>
        </div>

        <Button
          block={false}
          type='primary'
          onClick={login}
          htmlType='submit'
          icon={<LoginOutlined style={{ fontSize: '1.3rem' }} />}
        >
          Login
        </Button>
      </Form>
      <br />
      <p className='mb-1'>
        <a href='#'>Forgot password?</a>
      </p>

      <p>
        Don't have an account? <Link to='sign-up'>Sign up!</Link>
      </p>
      <Button
        block={false}
        type='primary'
        //onClick={login}
        htmlType='submit'
        icon={<LoginOutlined style={{ fontSize: '1.3rem' }} />}
        onClick={openModal}
      >
        Face Authentification
      </Button>
      <Modal
        open={modalstatus}
        closable={false}
        onCancel={() => setmodalstatus(false)}
        title={
          <h3 className='title' style={{ textAlign: 'center' }}>
            Face Authentification
          </h3>
        }
        destroyOnClose
        footer={null}
        width={800}
      >
        <WebcamCapture />
      </Modal>
    </PublicLayout>
  );
};

export default SignIn;
