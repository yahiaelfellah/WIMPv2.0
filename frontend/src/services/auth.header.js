import { AuthenticationService } from './auth.service';


export const requestOptions = {
    /// This where we put the security tokens and other header if needed
    header(){
        return {
            ...headers() 
        }
    }
}

function headers() {
    let _currentTokens = AuthenticationService.currentTokensValue || {};
    const authHeader = _currentTokens.accessToken ? { 'Authorization': 'Bearer ' + _currentTokens.accessToken } : {}
    return {
        headers: {
            ...authHeader,
            'Content-Type': 'application/json'
        }
    }
}