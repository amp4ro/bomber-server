const {phone} = require('phone');
const HttpException = require('../exceptions/exception');

class PhoneValidator {
    constructor(phoneNum){
        const data = phone(phoneNum);
        // console.log(data);
        if(!data.isValid) throw new HttpException("Invalid phone.", 400);
    }
}

module.exports = PhoneValidator;