import axios from 'axios'
import { BehaviorSubject } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { handleErrorResponse } from '../helpers/handle-response';


const API_URL = 'http://localhost:3000/api/v1';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')))
const currentAuthTokens = new BehaviorSubject(JSON.parse(localStorage.getItem('currentTokens')))

export const AuthenticationService = {
  login,
  logout,
  currentUserSubject: currentUserSubject.asObservable(),
  currentAuthTokensSubject : currentAuthTokens.asObservable(),
  get currentUserValue() { return currentUserSubject.value},
  get currentTokensValue() { return currentAuthTokens.value}

}
axios.interceptors.response.use(response => { 
  return response
},handleErrorResponse)  

async function login (user) {
  const response = await axios
    .post(API_URL + '/auth', {
      username: user.username,
      password: user.password
    });
  if (response.data) {
    // save the authentication token that will be used to get information about the user
    currentAuthTokens.next(response.data);
    currentUserSubject.next(jwt.decode(response.data.accessToken))
    // saving in the localStorage
    // save the user data 
    localStorage.setItem("currentTokens", JSON.stringify(currentAuthTokens.value));
    localStorage.setItem('currentUser',JSON.stringify(currentUserSubject.value));
  }
  return response.data;
  }

  function logout(){
    localStorage.removeItem('currentTokens');
    localStorage.removeItem('currentUser')
    currentUserSubject.next(null);
    currentAuthTokens.next(null);
}

//export default new AuthService();