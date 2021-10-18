const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const handler = require('../handler/handler');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await userService.login(email, password);
        return res.json(token);
    }
    catch(exception){
        return handler.handleError(res, exception);
    }
});
router.post('/register', async (req, res) => {
    const { username, email, password, passwordConfirm } = req.body;
    try {
        const token = await userService.register(username, email, password, passwordConfirm);
        return res.json(token);
    }
    catch(exception){
        return handler.handleError(res, exception);
    }
});

module.exports = router;