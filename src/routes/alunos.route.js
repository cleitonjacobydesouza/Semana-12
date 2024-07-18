const { Router } = require('express');
const Aluno = require('../models/Aluno');
const { auth } = require('../middleware/auth'); // Importe o middleware auth
const AlunoController = require('../controllers/AlunoController');


const alunoRoutes = new Router();




// Criar aluno
alunoRoutes.post('/', AlunoController.cadastrar);

// Listar todos os alunos
alunoRoutes.get('/', auth, AlunoController.listarTodos);

// Listar um aluno por ID
alunoRoutes.get('/:id', auth, AlunoController.listarPorId);



module.exports = alunoRoutes;

