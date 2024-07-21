const Aluno = require('../models/Aluno'); // Certifique-se de que o caminho esteja correto
class AlunoController {
    async cadastrar(req, res) {
        try {
            const { email, password, nome, data_nascimento, celular } = req.body;

            if (!nome) {
                return res.status(400).json({ mensagem: 'O nome é obrigatório' });
            }
            if (!data_nascimento) {
                return res.status(400).json({ mensagem: 'A data de nascimento é obrigatória' });
            }
            if (!email) {
                return res.status(400).json({ mensagem: 'O email é obrigatório' });
            }
            if (!password) {
                return res.status(400).json({ mensagem: 'O password é obrigatório' });
            }
            if (!celular) {
                return res.status(400).json({ mensagem: 'O celular é obrigatório' });
            }

            // Validar formato da data de nascimento
            if (!data_nascimento.match(/^\d{4}-\d{2}-\d{2}$/)) {
                return res.status(400).json({ mensagem: 'A data de nascimento não está no formato correto (****-**-**)' });
            }
            

            const aluno = await Aluno.create({
                email,
                password,
                nome,
                data_nascimento,
                celular
            });

            res.status(201).json(aluno);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: 'Não foi possível cadastrar o aluno' });
        }
    }

    async listarTodos(req, res) {
        try {
            const alunos = await Aluno.findAll();
            res.json(alunos);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: 'Erro ao listar alunos' });
        }
    }
    async listarPorId(req, res) {
        try {
            const id = req.params.id;
            const aluno = await Aluno.findByPk(id);
    
            if (!aluno) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
    
            res.json(aluno);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: 'Não foi possível listar o aluno específico', error: error });
        }
    }
}

module.exports = new AlunoController();
