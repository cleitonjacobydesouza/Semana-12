const { Router } = require('express');
const Curso = require('../models/Curso');
const { auth } = require('../middleware/auth'); // Importe o middleware auth
const CursoControler = require('../controllers/CursoControler');


const cursoRoutes = new Router();


// Criar curso
cursoRoutes.post('/', auth, CursoControler.criar);

// Listar todos os cursos
cursoRoutes.get('/', auth, CursoControler.listarTodos);

// Listar um curso por ID
cursoRoutes.get('/:id', auth, CursoControler.listarPorId);

// Atualizar o curso
cursoRoutes.put('/:id', auth, CursoControler.atualizarPorId);

// Deletar um curso
cursoRoutes.delete('/:id', auth, CursoControler.deletar);
module.exports = cursoRoutes;
