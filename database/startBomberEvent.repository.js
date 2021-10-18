const StartBomberEvent = require('../models/startBomberEvent');
const supabase = require('./access');

class StartBomberEventRepository {
    collection = 'startBomberEvents';
    constructor(){}

    async insert(event){
        if(event instanceof StartBomberEvent){ 
            const { data, error } = await supabase.from(this.collection).insert([ event ]);
            if(error) throw error;
            return data.length ? data[0] : null;
        }
        else throw new Error('Invalid event.');
    }
    async findOneById(id){
        const { data, error } = await supabase.from(this.collection)
        .select().match({ id });
        if(error) throw error;
        return data.length ? data[0] : null;
    }
    async findByUserId(userId){
        const { data, error } = await supabase.from(this.collection)
        .select().match({ userId });
        if(error) throw error;
        return data;
    }
    async findOneByUserIdAndPhone(userId, phone){
        const { data, error } = await supabase.from(this.collection)
        .select().match({ userId, phone });
        if(error) throw error;
        return data.length ? data[0] : null;
    }
    async findOneByPhone(phone){
        const { data, error } = await supabase.from(this.collection)
        .select().match({ phone });
        if(error) throw error;
        return data.length ? data[0] : null;
    }
    async deleteAll(){
        const { data, error } = await supabase
        .from(this.collection)
        .delete()
        .match({});
        if(error) throw error;
        return data;
    }
    async deleteById(id){
        const { data, error } = await supabase
        .from(this.collection)
        .delete()
        .match({ id });
        if(error) throw error;
        return data;
    }
}
module.exports = new StartBomberEventRepository();