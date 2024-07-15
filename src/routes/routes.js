const { Router } = require("express");
const alunoRoutes = require("./alunos.route");
const loginRoutes = require("./login.route.js");
const cursoRoutes = require("./cursos.route");

const routes = Router()

routes.use('/alunos', alunoRoutes)
routes.use('/curso', cursoRoutes)
routes.use('/login', loginRoutes)
 

module.exports = routes