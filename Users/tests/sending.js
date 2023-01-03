const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env' )});
const { sender , consumer } = require("../messaging/user.messaging");

function RandonSend(){



        const number = Math.floor(Math.random() * 10);
        setTimeout(()=> {
            sender({
                action : 'patch_flow',
                data : {
                    id : "636bd093b04c87acc09ec39a",
                    body : {
                        "flows":[
                        "test",
                        "test1"
                    ]
                }
            }
            })
            console.info('sending data')

        }, number*1000)

}

RandonSend()