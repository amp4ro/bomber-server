const HttpException = require("../exceptions/exception")

class Handler {
    handleError(response, exception){
        if(exception instanceof HttpException){
            return response.send(exception.message).status(exception.status);
        } else {
            console.log(exception);
            return response.sendStatus(500);
        }
    }
}
module.exports = new Handler();