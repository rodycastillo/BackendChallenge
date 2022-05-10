const auth = require("express").Router();
const { login, register, updateUser } = require('../controllers/Auth.controller');
const verify = require("../middlewares/verifyToken");

auth.post("/login", login);

auth.post('/register', register);

auth.put('/user/:id', verify, updateUser);

module.exports = auth;
