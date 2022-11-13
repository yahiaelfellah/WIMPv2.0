import axios from 'axios'

const API_URL = 'http://localhost:3000/api/v1';

class AuthService{
   parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }
  login(user) {
        return axios
          .post(API_URL + '/auth', {
            username: user.username,
            password: user.password
          })
          .then(response => {
            if (response.data && response.data.accessToken) {
              // const userInfo = this.parseJwt(response.data.accessToken);
              // userInfo.accessToken = response.data.accessToken;
              localStorage.setItem("user",JSON.stringify(response.data));
              localStorage.setItem("refreshToken",response.data.refreshToken)
            }
    
            return response.data;
          });
        }
    logout(){
        localStorage.removeItem("user");
        localStorage.removeItem("refreshToken");
    }
}
export default new AuthService();