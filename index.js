const express = require("express");
const router = require('router');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const EventEmitter = require('events');

global.eventEmitter = new EventEmitter();
const startBomberEventRepository = require('./database/startBomberEvent.repository');

require('dotenv').config();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/bomber', require('./routes/bomber'));
app.use('/subscribtion', require('./routes/subscribtion'));

http.listen(port, async () => {
    console.log(`Server started on port ${port}`);
    try {
        await startBomberEventRepository.deleteAll();
        console.log("Deleted all bomber activations.");
    } catch(err){
        console.error(err);
    }
});