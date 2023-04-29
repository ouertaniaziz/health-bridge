import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL;
const patientURL = process.env.REACT_APP_BACKEND_URL_PATIENT;
let headers = {};

if (localStorage.token) {
  headers.authorization = `${localStorage.token}`;
  console.log(headers, 'rrrrr');
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers,
});

export default axiosInstance;
