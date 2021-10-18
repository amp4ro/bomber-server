class StartBomberEvent {
    constructor(userId, phone, minutes, smsPerMinute){
        this.userId = userId;
        this.phone = phone;
        this.date = new Date();
        this.minutes =minutes;
        this.smsPerMinute = smsPerMinute;
    }
    date;
    userId;
    phone;
    minutes;
    smsPerMinute;
}
module.exports = StartBomberEvent;