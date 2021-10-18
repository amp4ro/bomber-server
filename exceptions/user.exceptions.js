const HttpException = require('./exception');
class UserNotFound extends HttpException {
    constructor(){
        super('User not found.', 404);
    }
}
class IncorrectPassword extends HttpException {
    constructor(){
        super('Incorrect password.', 400);
    }
}
class UnconfirmedPassword extends HttpException {
    constructor(){
        super('Unconfirmed password.', 400);
    }
}
class EmailAlreadyExists extends HttpException {
    constructor(){
        super('Email already exists.', 400);
    }
}
class Unauthorized extends HttpException {
    constructor(){
        super('Unauthorized.', 403);
    }
}
class EmptyFields extends HttpException {
    constructor(){
        super('Empty fields.', 400);
    }
}
class InvalidEmail extends HttpException {
    constructor(){
        super('Invalid email.', 400);
    }
}
module.exports = { UserNotFound, IncorrectPassword, UnconfirmedPassword, EmailAlreadyExists, Unauthorized, EmptyFields, InvalidEmail };