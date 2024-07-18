const { Router } = require('express');
const LoginController = require('../controllers/LoginController.js'); // Ajuste o caminho conforme necessário

const loginRoutes = new Router();

loginRoutes.post('/', LoginController.login);

module.exports = loginRoutes;
