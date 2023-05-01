import axiosInstance from '../../../../config/axios';
export const getpatient = (usernam) => {
  console.log('username:', usernam);

  return axiosInstance
    .post('/patient/getpatient', {
      username: usernam
    })
    .then((response) => {
      console.log('response', response.data);
      return response.data;
    });
};
export const getPrescription = (patientId) => {
  return axiosInstance.get(`/prescription/${patientId}/patients`).then((response) => {
    console.log('response', response.data);
    return response.data;
  });
};
export const getPrescriptionById = (prescriptionId) => {
  return axiosInstance.get(`/prescription/${prescriptionId}`).then((response) => {
    console.log('response', response.data);
    return response.data;
  });
};

export const updatepatient = (user) => {
  console.log('triggered', user);
  return axiosInstance
    .put('patient/updatepatient', {
      user
    })
    .then((response) => {
      const status = response.status;
      console.log('response', response.data);
      return status;
    });
};

export const verifycin = (form) => {
  return axiosInstance.post('/patient/cin', form).then((response) => {
    console.log(response.data);

    return response.data.status;
  });
};
export const uploadfilespatient = (form) => {
  return axiosInstance.post('/patient/addfiles', form).then((response) => {
    console.log(response.data);
    return response.data;
  });
};
export const addAppoiment = (data) => {
  console.log(data);
  return axiosInstance.post('/appointments/add', data).then((response) => {
    console.log(response.data);

    return response.data.status;
  });
};
export const getAllDoctors = () => {
  try {
    const response = axiosInstance.get('/doctor/all');
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const patientservice = {
  getpatient,
  verifycin,
  uploadfilespatient
};
export default patientservice;
