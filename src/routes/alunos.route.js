const { Router } = require('express');
const Aluno = require('../models/Aluno');
const { auth } = require('../middleware/auth'); // Importe o middleware auth


const alunoRoutes = new Router();

// Função para validar data de nascimento no formato YYYY-MM-DD
function validarDataNascimento(data) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(data);
}



// Criar aluno
alunoRoutes.post('/', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const nome = req.body.nome;
        const data_nascimento = req.body.data_nascimento;
        const celular = req.body.celular;

        if (!nome) {
            return res.status(400).json({ mensagem: 'O nome é obrigatório' });
        }

        if (!data_nascimento) {
            return res.status(400).json({ mensagem: 'A data de nascimento é obrigatória' });
        }

        // Validar formato da data de nascimento
        if (!validarDataNascimento(data_nascimento)) {
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
});

// Listar todos os alunos
alunoRoutes.get('/', auth, async (req, res) => {
    try {
        const alunos = await Aluno.findAll();
        res.json(alunos);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar alunos' });
    }
});

// Listar um aluno por ID
alunoRoutes.get('/:id', auth, async (req, res) => {
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
});
// Listar um aluno por nome

alunoRoutes.get('/nome/:nome', auth, async (req, res) => {
    try {
        const nome = req.params.nome;
        const aluno = await Aluno.findOne({ where: { nome } });

        if (!aluno) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.json(aluno);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Não foi possível listar o aluno específico', error: error });
    }
});
module.exports = alunoRoutes;
