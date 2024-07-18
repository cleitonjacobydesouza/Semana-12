const Aluno = require("../models/Aluno");
const Curso = require("../models/Curso");
const Matricula = require("../models/Matricula");

class MatriculaController {
    async cadastrar(req, res) {
        try {
            const { aluno_id, curso_id } = req.body;
            if (!curso_id || !aluno_id) {
                return res.status(400).json({ mensagem: 'O id do aluno e o id do curso são obrigatórios' });
            }

            // Verificar se o aluno existe
            const alunoExistente = await Aluno.findByPk(aluno_id);
            if (!alunoExistente) {
                return res.status(400).json({ mensagem: 'O aluno não existe' });
            }

            // Verificar se o curso existe
            const cursoExistente = await Curso.findByPk(curso_id);
            if (!cursoExistente) {
                return res.status(400).json({ mensagem: 'O curso não existe' });
            }

            // Verificar se o aluno já está matriculado no curso
            const matriculaExistente = await Matricula.findOne({
                where: {
                    aluno_id,
                    curso_id
                }
            });
            if (matriculaExistente) {
                return res.status(400).json({ mensagem: 'O aluno já está matriculado neste curso' });
            }

            // Criar a matrícula
            const matricula = await Matricula.create({
                aluno_id,
                curso_id
            });

            res.status(201).json(matricula);
        } catch (error) {
            console.error(error.message); // Logue o erro para depuração
            res.status(500).json({ mensagem: 'Houve um erro ao tentar cadastrar a matrícula' });
        }
    }
}

module.exports = new MatriculaController();
