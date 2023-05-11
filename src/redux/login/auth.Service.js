import axiosInstance from '../../config/axios';
export const addUser = (data) => {
  console.log(data);
  axiosInstance.post('/signup', data).then(
    (res) => {
      console.log('first');
      return res;
    },
    (error) => {
      console.log(error);
      return error;
    }
  );
};

const login = (email, password) => {
  console.log('username:', email);

  return axiosInstance
    .post('/login', {
      email: email,
      password: password
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', JSON.stringify(response.data.accessToken));
      }

      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

//getDoctor
export const getDoctor = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return axiosInstance
    .post('/doctor/profile', {
      userId: user.id
    })
    .then((response) => {
      if (response.data) {
      }

      return response.data;
    });
};

// getPharmacist
export const getPharmacist = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return axiosInstance
    .post('/pharmacist/profile', {
      userId: user.id
    })
    .then((response) => {
      if (response.data) {
      }

      return response.data;
    });
};

//face
const loginwithface = (usernam) => {
  console.log('username:', usernam);

  return axiosInstance
    .post('/facelogin', {
      username: usernam
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', JSON.stringify(response.data.accessToken));
      }

      return response.data;
    });
};
const authService = {
  addUser,
  login,
  logout,
  getDoctor,
  getPharmacist,
  loginwithface
};
export default authService;
