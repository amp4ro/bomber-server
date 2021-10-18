const jwt = require('jsonwebtoken');
const { jwtConstants } = require('../constants');
class JwtService {
    constructor(){}

    sign(object){
        return jwt.sign(object, jwtConstants.secret);
    }
    verify(token){
        try {
            return jwt.verify(token, jwtConstants.secret);
        }
        catch(exception){ return false; }
    }
}

module.exports = new JwtService();