const subscribtionRepository = require('../database/subscribtion.repository');
const HttpException = require('../exceptions/exception');
const Subscribtion = require('../models/subscribtion');


class SubscribtionService {
    constructor(){}

    async getAll(){
        return await subscribtionRepository.findAll();
    }
}
module.exports = new SubscribtionService();