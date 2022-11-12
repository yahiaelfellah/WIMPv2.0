import axios from 'axios'

const API_URL = process.env.API_URL;
class AuthService{
    login(user) {
        return axios
          .post(API_URL + '/auth', {
            username: user.username,
            password: user.password
          })
          .then(response => {
            if (response.data.accessToken) {
              localStorage.setItem('accessToken', response.data.accessToken);
              localStorage.setItem("refreshToken",response.data.refreshToken)
            }
    
            return response.data;
          });
        }
    logout(){
        localStorage.removeItem("user");
    }
}
export default AuthService;