const jwtService = require('../lib/jwt');
const userRepository = require('../database/user.repository');
const handler = require('../handler/handler');

module.exports = async function (req, res, next){
    try {
        const token = req.headers['accesstoken'];
        const data = jwtService.verify(token);
        if(data){
            const user = await userRepository.findOneById(data.id);
            req.user = user;
        }
        next();
    }
    catch(exception){
        return handler.handleError(res, exception);
    }
}