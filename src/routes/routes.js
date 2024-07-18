const { Router } = require("express");
const alunoRoutes = require("./alunos.route");
const loginRoutes = require("./login.route");
const cursoRoutes = require("./cursos.route");
const matriculaRoutes = require("./matriculas.route");

const routes = Router()

routes.use('/alunos', alunoRoutes)
routes.use('/curso', cursoRoutes)
routes.use('/login', loginRoutes)
routes.use('/matriculas', matriculaRoutes) 

module.exports = routes