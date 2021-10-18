class ProfileDto {
    constructor(id, username, trialName, trialStarted, trialSubscribedMonth, isAdmin){
        this.username = username;
        this.id = id;
        this.trialName = trialName;
        this.trialStarted = trialStarted;
        this.trialSubscribedMonth = trialSubscribedMonth;
        this.isAdmin = isAdmin;
    }
    id;
    username;
    trialName;
    trialStarted;
    trialSubscribedMonth;
    subscribtion;
    isAdmin;
}
module.exports = ProfileDto;