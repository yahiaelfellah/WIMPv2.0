const {sender} = require("../messaging/sender")

function RandonSend(){



        const number = Math.floor(Math.random() * 10);
        setTimeout(()=> {
            console.info('sending data')
            sender({
                data : 'random data sent'
            })
            
        }, number*1000)

}

RandonSend()