const axios = require('axios')

const USER_URL = process.env.USER_URL

exports.update = async (req,res) => {
    try{
        const res = await axios.put(USER_URL)
    }catch(e){

    }
}