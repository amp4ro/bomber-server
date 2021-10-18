const subscribtionRepository = require('../database/subscribtion.repository');
const userValidator = require('../validators/user.validator');
const userRepository = require('../database/user.repository');
const bcryptService = require('../lib/bcrypt');
const jwtService = require('../lib/jwt');
const User = require('../models/user');
const HttpException = require('../exceptions/exception');
const { UserNotFound, IncorrectPassword, UnconfirmedPassword, EmailAlreadyExists } = require('../exceptions/user.exceptions');


class UserService {
    constructor(){}

    async login(email, password){
        try {
            const user = await userRepository.findOneByEmail(email);
            if(!user) throw new UserNotFound();
            const isCorrectPass = await bcryptService.compare(password, user.password);
            if(!isCorrectPass) throw new IncorrectPassword();
            return this.getUserAccessToken(user.id);
        } catch(exception){
            throw exception;
        }
    }
    async register(username, email, password, passwordConfirm){
        if(password != passwordConfirm) throw new UnconfirmedPassword();
        const user = await userRepository.findOneByEmail(email);
        const freeTrial = await subscribtionRepository.findFreeTrial();
        
        if(user) throw new EmailAlreadyExists();
        try {
            userValidator.validateUsername(username);
            userValidator.validateEmail(email);
            userValidator.validatePass(password);

            const hash = await bcryptService.hash(password);
            const user = new User(username, email, hash);
            user.trialName = freeTrial.name;
            const saved = await userRepository.insert(user);
            return this.getUserAccessToken(saved.id);
        } catch(exception){
            throw exception;
        }      
    }
    getUserAccessToken(id){
        return jwtService.sign({ id });
    }
}
module.exports = new UserService();