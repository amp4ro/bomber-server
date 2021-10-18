const express = require('express');
const router = express.Router();
const handler = require('../handler/handler');
const injectUser = require('../middleware/injectUser');
const isAuthenticated = require('../middleware/isAuthenticated');
const startBomberEventService = require('../services/startBomberEvent.service');
const startBomberEventRepository = require('../database/startBomberEvent.repository');
const injectSubscribtion = require('../middleware/injectSubscribtion');
const HttpException = require('../exceptions/exception');
const PhoneValidator = require('../validators/phone.validator');
router.use(injectUser, isAuthenticated, injectSubscribtion);
router.get('/start/:phone/:minutes', async (req, res) => {
    try {
        const subscribtion = req.subscribtion;
        if(isNaN(Number(req.params.minutes))) throw new HttpException("Invalid minutes", 400);
        const minutes = Number(req.params.minutes);
        const phone = req.params.phone;
        try {
            const phoneValidator = new PhoneValidator(phone);
        } catch(error){
            throw error;
        }
        const event = await startBomberEventService.startBomber(req.user.id, phone, subscribtion, minutes, subscribtion.smsPerMinute);
        res.json(event);
    } catch(exception){
        return handler.handleError(res, exception);
    }
});
router.get('/activations', async (req, res) => {
    try {
        const events = await startBomberEventService.allBomberActivations(req.user.id);
        res.json(events);
    } catch(exception){
        return handler.handleError(res, exception);
    }
});
router.get('/off/:id', async (req, res) => {
    try {
        if(isNaN(Number(req.params.id))) throw new HttpException("Invalid id", 400);
        const id = req.params.id;
        const result = await startBomberEventService.stopBomber(req.user.id, id);
        return res.json(result);
    } catch(exception){
        return handler.handleError(res, exception);
    }
});

module.exports = router;