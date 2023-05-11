import Button from 'antd/lib/button';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import axiosInstance from '../../../config/axios';
import authService from '../../../redux/login/auth.Service';
import { useNavigateDoctor, useNavigatePatient } from '../../../utils/use-navigate-home';
import { Alert } from 'antd';
const WebcamCapture = () => {
  const navigateDoctor = useNavigateDoctor();
  const navigatePatient = useNavigatePatient();
  type Ale = {
    type: string;
    description: string;
  };
  const [alert, setalert] = useState<Ale>();
  const [img, setimg] = useState();
  const webref = useRef(null);
  const [formData, setFormData] = useState(new FormData());
  const videoConstraints = {
    width: 720,
    height: 500,
    facingMode: 'user'
  };
  const capture = React.useCallback(() => {
    const imageSrc = webref.current.getScreenshot();
  }, [webref]);
  const handleimage = async () => {
    const video = webref.current.video;

    // console.log(webref.current.getScreenshot());
    let formData = new FormData();
    //console.log('rr');
    formData.append('image', webref.current.getScreenshot());
    //console.log('image', formData.get('image'));
    const res = await axios.post('http://localhost:5000/face-recognition/num-faces', formData);

    video.pause();
    if (res.data) {
      console.log('ttt', res.data);
      await authService.loginwithface(res.data).then((currentUser) => {
        if (currentUser) {
          console.log(currentUser);
          if (currentUser.role.includes('doctor')) {
            setalert({ type: 'success', description: 'Authentificated avec success' });
            navigateDoctor();
          } else if (currentUser.role.includes('patient')) {
            setalert({ type: 'success', description: 'Authentificated avec success' });

            navigatePatient();
          } else if (currentUser.role.includes('pharmacist')) {
            console.log('first');
          }
        }
      });
      // await axiosInstance.post('/facelogin',{username:res.data}).then((res) => console.log(res.data));
    } else {
      setalert({ type: 'success', description: 'Authentificated avec success' });
    }
    //setimg(webref.current.getScreenshot());
  };
  return (
    <>
      <Webcam ref={webref} screenshotFormat='image/jpeg' videoConstraints={videoConstraints} />
      <Button onClick={handleimage}>Snap !</Button>
      {alert && (
        <Alert
          message='Success Tips'
          type={'success'}
          description='This is success alert'
          showIcon
        />
      )}
      {/* <img src={img}></img> */}
    </>
  );
};

export default WebcamCapture;
