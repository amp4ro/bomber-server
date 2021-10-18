const emailPatern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const { EmptyFields, InvalidEmail } = require('../exceptions/user.exceptions');

class UserValidator {
    constructor(){}

    validateUsername(username){
        if(!username) throw new EmptyFields();
    }

    validatePass(pass){
        if(!pass) throw new EmptyFields();
    }
        
    validateEmail(email){
        if(!email) throw new EmptyFields();
        if(typeof email != 'string' || !emailPatern.test(email)) throw new InvalidEmail();
    }
}

module.exports = new UserValidator();