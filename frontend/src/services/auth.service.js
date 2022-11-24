import axios from 'axios'
import { BehaviorSubject } from 'rxjs';
import * as jwt from 'jsonwebtoken';


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


async function login (user) {
  const response = await axios
    .post(API_URL + '/auth', {
      username: user.username,
      password: user.password
    });
  if (response.data && response.data.accessToken) {
    // save the authentication token that will be used to get information about the user
    localStorage.setItem("currentTokens", JSON.stringify(response.data));
    currentAuthTokens.next(response.data);
    // save the user data 
    const userInfo = jwt.decode(response.data.accessToken)
    localStorage.setItem('currentUser',JSON.stringify(userInfo))
    currentUserSubject.next(userInfo)
  }
  return response.data;
  }

  function logout(){
    localStorage.removeItem("currentTokens");
    currentUserSubject.next(null);
    currentAuthTokens.next(null);
}

//export default new AuthService();