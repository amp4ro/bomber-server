const axios = require("axios");

require('dotenv').config();
class BomberIntegration {
    async start(phone, smsPerSecond, minutes){
        try {
            await axios.post(process.env.BOMBER_API_URL + '/start/' + process.env.BOMBER_API_KEY,
            {
                phone, smsPerSecond, minutes
            });
        } catch(ex){
            throw ex;
        }
    }

    async stop(phone){
        try {
            await axios.post(process.env.BOMBER_API_URL + '/stop/' + process.env.BOMBER_API_KEY,
            {
                phone
            });
        } catch(ex){
            throw ex;
        }
    }
}

module.exports = new BomberIntegration();