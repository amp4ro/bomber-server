class HttpException {
    message;
    code;
    constructor(message, code){
        if(typeof message === 'string') this.message = message;
        if(typeof code === 'number') this.code = code;
    }
}
module.exports = HttpException;