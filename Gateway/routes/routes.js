
const API_PREFIX = 'api/v1'

exports.routes = [

    {
        url:`/${API_PREFIX}/auth`,
        auth:false, 
        proxy: {
            target:"http://localhost:3001/auth",
            changeOrigin : true,
            pathRewrite: {
                [`^/${API_PREFIX}/auth`]: '',
            },
        }
    },
    {
        url:`/${API_PREFIX}/auth/refresh`,
        auth:true,
        refresh: true,
        creditCheck : true, 
        rateLimit:{
            windowsMs : 15*60*1000,
            max : 5
        },
        proxy: {
            target:"http://localhost:3001/auth/refresh",
            changeOrigin : true,
            pathRewrite: {
                [`^/${API_PREFIX}/auth/refresh`]: '',
            },
        }
    },
    {
        url:`/${API_PREFIX}/users`,
        auth:true, // if a user needs to be authenticated for accessing this endpoint
        proxy: {
            // contains information about the target to which the request should be redirected
            target:"http://localhost:3001/users",
            changeOrigin : true,
            pathRewrite: {
                [`^/${API_PREFIX}/users`]: '',
            },
        }
    },
]

