class User {
    constructor(username, email, password){
        this.username = username;
        this.email = email;
        this.password = password;
        this.registeredAt = new Date();
        this.isAdmin = false;
        this.trialName = null;
        this.trialStarted = null;
        this.trialSubscribedMonth = 0;
    }
    registeredAt;
    username;
    email;
    password;
    isAdmin;
    trialName;
    trialStarted;
    trialSubscribedMonth;
}
module.exports = User;