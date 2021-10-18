const express = require('express');
const router = express.Router();
const subscribtionService = require('../services/subscribtion.service');
const handler = require('../handler/handler');
const HttpException = require('../exceptions/exception');
const injectUser = require('../middleware/injectUser');
const isAuthenticated = require('../middleware/isAuthenticated');
const injectSubscribtion = require('../middleware/injectSubscribtion');
const subscribtionRepository = require('../database/subscribtion.repository');
router.get('/all', async (req, res) => {
    try {
        const all = await subscribtionService.getAll();
        return res.json(all);
    }
    catch(exception){
        return handler.handleError(res, exception);
    }
});
router.get('/:name', async (req, res) => {
    try {
        const sub = await subscribtionRepository.findOneByName(req.params.name);
        return res.json(sub);
    }
    catch(exception){
        return handler.handleError(res, exception);
    }
});
router.post('/buy/:name/:month', injectUser, isAuthenticated, injectSubscribtion, async (req, res) => {
    try {
        const cardDetails = req.body;
        const sub = req.subscribtion;
        const user = req.user;
        const name = req.params.name;
        const month = Number(req.params.month);
        if(isNaN(month)) throw new HttpException("Invalid minutes", 400);
        console.log("User with id "+user.id+" bought "+name+ " sub for "+month+" month.");
        console.log(cardDetails);
        return res.json(true);
    }
    catch(exception){
        return handler.handleError(res, exception);
    }
});

module.exports = router;