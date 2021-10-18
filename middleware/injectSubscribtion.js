
const subscribtionRepository = require('../database/subscribtion.repository');
const handler = require('../handler/handler');

module.exports = async function (req, res, next){
    try {
        const subscribtionName = req.user.trialName;
        const subscribtion = await subscribtionRepository.findOneByName(subscribtionName);
        req.subscribtion = subscribtion;
        next();
    }
    catch(exception){
        return handler.handleError(res, exception);
    }
}