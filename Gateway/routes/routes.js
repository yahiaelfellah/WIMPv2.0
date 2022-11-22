
const API_PREFIX = 'api/v1'

exports.routes = [

    {
        url:`/${API_PREFIX}/auth`,
        proxy: {
            target:"http://[::1]:3001/auth",
            changeOrigin : true,
            logLevel: "debug",
            pathRewrite: {
                [`^/${API_PREFIX}/auth`]: '',
            },
        }
    },
    {
        url:`/${API_PREFIX}/refresh`,
        auth:true,
        refresh: true,
        bodyParser:true,
        logLevel: "debug",
        rateLimit:{
            windowsMs : 15*60*1000,
            max : 5
        },
        proxy: {
            target:"http://[::1]:/refresh",
            changeOrigin : true,
            timeout: 3000,
            logLevel: "debug",
            pathRewrite: {
                [`^/${API_PREFIX}/refresh`]: '',
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
    {
        url:`/${API_PREFIX}/flow`,
        auth:true, // if a user needs to be authenticated for accessing this endpoint
        proxy: {
            // contains information about the target to which the request should be redirected
            target:"http://localhost:8000/flow",
            changeOrigin : true,
            pathRewrite: {
                [`^/${API_PREFIX}/flow`]: '',
            },
        }
    },
    {
        url:`/${API_PREFIX}/flows`,
        auth:true, // if a user needs to be authenticated for accessing this endpoint
        proxy: {
            // contains information about the target to which the request should be redirected
            target:"http://localhost:8000/flows",
            changeOrigin : true,
            pathRewrite: {
                [`^/${API_PREFIX}/flows`]: '',
            },
        }
    },
]

