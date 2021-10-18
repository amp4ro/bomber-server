const express = require('express');
const ProfileDto = require('../dto/profile.dto');
const router = express.Router();
const handler = require('../handler/handler');
const injectUser = require('../middleware/injectUser');
const isAuthenticated = require('../middleware/isAuthenticated');
const injectSubscribtion = require('../middleware/injectSubscribtion');

router.use(injectUser, isAuthenticated, injectSubscribtion);
router.get('/profile', (req, res) => {
    const user = req.user;
    const subscribtion = req.subscribtion;
    const trialStarted = user.trialStarted ? user.trialStarted : user.registeredAt;
    const subscribedMonth = subscribtion.avalibleOnStartMonth ?  subscribtion.avalibleOnStartMonth : user.trialSubscribedMonth;
    const profile = new ProfileDto(user.id, user.username, subscribtion.name, trialStarted, subscribedMonth, user.isAdmin);
    profile.subscribtion = subscribtion;
    res.json(profile);
});

module.exports = router;