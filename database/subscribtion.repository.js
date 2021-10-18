const Subscribtion = require('../models/subscribtion');
const supabase = require('./access');

class SubscribtionRepository {
    collection = 'subscribtions';
    constructor(){}

    
    async findAll(){
        const { data, error } = await supabase.from(this.collection)
        .select().match({ });
        if(error) throw error;
        return data;
    }
    async findOneByName(name){
        if(!name){
            return await this.findFreeTrial();
        } else {
            const { data, error } = await supabase.from(this.collection)
            .select().match({ name });
            if(error) throw error;
            return data.length ? data[0] : null;
        }
    }
    async findFreeTrial(){
        const { data, error } = await supabase.from(this.collection)
        .select().match({ costPerMonthUSD: 0 });
        if(error) throw error;
        return data.length ? data[0] : null;
    }
}
module.exports = new SubscribtionRepository();