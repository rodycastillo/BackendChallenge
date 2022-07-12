const { addMessage, getMessages } = require("../controllers/Message.controller");
const message =  require('express').Router();


message.post('/addMsg/', addMessage)

message.post('/getMsg/', getMessages);

module.exports = message;