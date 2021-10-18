const User = require('../models/user');
const supabase = require('./access');

class UserRepository {
    collection = 'users';
    constructor(){}

    async insert(user){
        if(user instanceof User){ 
            const { data, error } = await supabase.from(this.collection).insert([ user ]);
            if(error) throw error;
            return data.length ? data[0] : null;
        }
        else throw new Error('Invalid user.');
    }
    async findOneById(id){
        const { data, error } = await supabase.from(this.collection)
        .select().match({ id });
        if(error) throw error;
        return data.length ? data[0] : null;
    }
    async findOneByEmail(email){
        const { data, error } = await supabase.from(this.collection)
        .select().match({ email });
        if(error) throw error;
        return data.length ? data[0] : null;
    }
}
module.exports = new UserRepository();