import axios from 'axios';
import { requestOptions } from './auth.header';
import { handleErrorResponse } from '../helpers/handle-response';
const API_URL = process.env.VUE_APP_API_URL;

export const userService = {
    getAll,
    getById
};
/// define the interceptor for axios 
axios.interceptors.response.use(response => { 
  return response
},handleErrorResponse)  


function getAll() {
    return axios.get(`${API_URL}/users`, requestOptions.header())
}

function getById(id) {
    return axios.get(`${API_URL}/users/${id}`, requestOptions.header())
}

// class UserService {
//   getAllUsers() {
//     return axios.get(API_URL + 'all');
//   }

//   getUserBoard() {
//     return axios.get(API_URL + 'user', { headers: authHeader() });
//   }

//   getModeratorBoard() {
//     return axios.get(API_URL + 'mod', { headers: authHeader() });
//   }

//   getAdminBoard() {
//     return axios.get(API_URL + 'admin', { headers: authHeader() });
//   }
// }

// export default new UserService();