const Curso = require('../models/Curso');

class CursoController {
  
  
    async criar(req, res) {
        try {
            const { nome, duracao_horas } = req.body;
    
            if (!nome) {
                return res.status(400).json({ mensagem: 'O nome do curso é obrigatório' });
            }
    
            if (!duracao_horas) {
                return res.status(400).json({ mensagem: 'A duração do curso em horas é obrigatória' });
            }
    
            if (!(duracao_horas >= 40 && duracao_horas <= 200)) {
                return res.status(400).json({ mensagem: 'Carga horária não permitida. A carga horária deve ser entre 40 e 200 horas' });
            }
    
            const curso = await Curso.create({
                nome,
                duracao_horas
            });
    
            res.status(201).json(curso);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: 'Não foi possível cadastrar o curso' });
        }
    }

    async listarTodos(req, res) {
        try {
            let params = {};
    
            if (req.query.nome) {
                params = { ...params, nome: req.query.nome };
            }
    
            const cursos = await Curso.findAll({
                where: params
            });
    
            res.json(cursos);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: 'Erro ao listar cursos' });
        }
    }

    async listarPorId(req, res) {
        try {
            const id = req.params.id;
            const curso = await Curso.findByPk(id);
    
            if (!curso) {
                return res.status(404).json({ mensagem: 'Curso não encontrado' });
            }
    
            res.json(curso);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: 'Não foi possível listar o curso específico' });
        }
    }

    async atualizarPorId(req, res) {
        const id = req.params.id;

        try {
            let curso = await Curso.findByPk(id);
    
            if (!curso) {
                return res.status(404).json({ mensagem: 'Curso não encontrado' });
            }
    
            const { nome, duracao_horas } = req.body;
    
            if (!nome) {
                return res.status(400).json({ mensagem: 'O nome do curso é obrigatório' });
            }
    
            if (!duracao_horas) {
                return res.status(400).json({ mensagem: 'A duração do curso em horas é obrigatória' });
            }
    
            if (!(duracao_horas >= 40 && duracao_horas <= 200)) {
                return res.status(400).json({ mensagem: 'Carga horária não permitida. A carga horária deve ser entre 40 e 200 horas' });
            }
    
            curso = await curso.update({
                nome,
                duracao_horas
            });
    
            res.status(200).json(curso);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: 'Erro ao atualizar curso' });
        }
    }

    async deletar(req, res) {
        const id = req.params.id;

        try {
            const curso = await Curso.findByPk(id);

            if (!curso) {
                return res.status(404).json({ mensagem: 'Curso não encontrado' });
            }

            await curso.destroy();

            res.status(204).json();
            console.log('Curso deletado com sucesso');
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: 'Erro ao deletar curso' });
        }
    }
}

module.exports = new CursoController();
