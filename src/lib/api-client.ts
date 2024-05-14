import Axios from "axios";
// import { setAlert } from 'src/reducers/alert';
// import { setEnoughPermission, setSessionExpired } from 'src/reducers/auth';

// import { store } from './create-store';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  withCredentials: true,
});

// // A function that calls '/api/csrf-cookie' to set the CSRF cookies. The
// // default is 'sanctum/csrf-cookie' but you can configure it to be anything.
// const setCSRFToken = () => {
//   return axios.get('/api/csrf-cookie');
// };

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("pg-token")}`;
  return config;
});

export default async function API(method = "get", url = "", data = {}) {
  try {
    const response = await axios[method](url, data);
    if (!response) {
      throw false;
    }
    return await response;
  } catch (error) {
    throw error.response;
  }
}
