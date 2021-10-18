const startBomberEventRepository = require('../database/startBomberEvent.repository');
const HttpException = require('../exceptions/exception');
const StartBomberEvent = require('../models/startBomberEvent');
const bomberIntegration = require("./bomber-api-integration");
const minutesScale = [1, 3, 5, 10, 20, 30];
class StartBomberEventService {
    constructor(){}

    async startBomber(userId, phone, subscribtion, minutes, smsPerMinute){
        try {
            const events = await startBomberEventRepository.findByUserId(userId);
            if(events.length >=  subscribtion.maxPhones) throw new HttpException("Unable to activate bomber to one more phone.", 400);
            if(minutes > subscribtion.maxBomberTimeMinutes) throw new HttpException("Too big time range.", 400);
            if(minutesScale.indexOf(minutes) == -1) throw new HttpException("Invalid time range.", 400);
            const event = new StartBomberEvent(userId, phone, minutes, smsPerMinute);
            const foundEvent = await startBomberEventRepository.findOneByPhone(phone);
            if(foundEvent) throw new HttpException("Bomber on this phone already started", 400);
            const created = await startBomberEventRepository.insert(event);
            try {
                await bomberIntegration.start(phone, smsPerMinute/60, minutes);
            } catch(ex){
                throw ex;
            }
            return created;
        } catch(err){
            throw err;
        }
    }
    async stopBomber(userId, id){
        try {
            const event = await startBomberEventRepository.findOneById(id);    
            if(!event) throw new HttpException("Not found.", 400);
            if(event.userId != userId) throw new HttpException("No permission.", 400);
            try {
                await bomberIntegration.stop(event.phone);
            } catch(ex){
                throw ex;
            }
            await startBomberEventRepository.deleteById(id);
            return true;
        } catch(err){
            throw err;
        }
    }
    async allBomberActivations(userId) {
        try {
            const events = await startBomberEventRepository.findByUserId(userId);
            return events;
        } catch(err){
            throw err;
        }
    }
}
module.exports = new StartBomberEventService();