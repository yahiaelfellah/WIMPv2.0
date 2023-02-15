import { AuthenticationService } from '../services/auth.service';


export function handleErrorResponse(error) {   

                if ([401,403,504].indexOf(error.response.status) !== -1) {
                        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                        AuthenticationService.logout();
                        this.$router.push("/")
                }else { 
                    //const error = (error && error.response.message) || ( error.response&& error.response.status);
                    return Promise.reject(error);
                }

}