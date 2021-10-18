const bcrypt = require('bcrypt');
const salt = 10;

class BcryptService {
    constructor(){}

    async hash(string){
        return await bcrypt.hash(string, salt);
    }
    async compare(string, hash){
        return await bcrypt.compare(string, hash);
    }
}

module.exports = new BcryptService();