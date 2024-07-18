const { Router } = require('express');
const { auth } = require('../middleware/auth'); // Importe o middleware auth
const MatriculaController = require('../controllers/MatriculaController');


const matriculaRoutes = new Router();




// Criar aluno
matriculaRoutes.post('/', auth, MatriculaController.cadastrar);



module.exports = matriculaRoutes;

