const handler = require('../handler/handler');
const { Unauthorized } = require('../exceptions/user.exceptions');

module.exports = async function (req, res, next){
    try {
        if(!req.user) throw new Unauthorized();
        next();
    }
    catch(exception){
        return handler.handleError(res, exception);
    }
}