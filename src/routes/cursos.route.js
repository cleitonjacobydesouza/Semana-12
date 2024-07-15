const { Router } = require('express');
const Curso = require('../models/Curso');
const { auth } = require('../middleware/auth'); // Importe o middleware auth


const cursoRoutes = new Router();


// Criar curso
cursoRoutes.post('/', auth, async (req, res) => {
    try {
        const nome = req.body.nome;
        const duracao_horas = req.body.duracao_horas;

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
});

// Listar todos os cursos
cursoRoutes.get('/', auth, async (req, res) => {
    try {
        let params = {};  // Usar 'let' para permitir modificação

        if (req.query.nome) {  // Verificar 'req.query.nome'
            params = { ...params, nome: req.query.nome };  // Corrigir para 'req.query.nome'
        }

        const cursos = await Curso.findAll({  // Executar a busca no banco de dados
            where: params  // Usar os parâmetros corretos
        });

        res.json(cursos);  // Enviar a resposta JSON com os cursos
    } catch (error) {
        console.log(error.message);  // Logar a mensagem de erro no console
        res.status(500).json({ error: 'Erro ao listar cursos' });  // Enviar a resposta de erro ao cliente
    }
});

// Listar um curso por ID
cursoRoutes.get('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const curso = await Curso.findByPk(id);

        if (!curso) {
            return res.status(404).json({ mensagem: 'Curso não encontrado' });
        }

        res.json(curso);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Não foi possível listar o curso específico', error: error });
    }
});

// Atualizar o curso
cursoRoutes.put('/:id', auth, async (req, res) => {
    const id = req.params.id;

    try {
        // Verificar se o curso existe
        let curso = await Curso.findByPk(id);

        if (!curso) {
            return res.status(404).json({ mensagem: 'Curso não encontrado' });
        }

        // Extrair dados do corpo da requisição
        const nome = req.body.nome;
        const duracao_horas = req.body.duracao_horas;

        // Validar dados recebidos
        if (!nome) {
            return res.status(400).json({ mensagem: 'O nome do curso é obrigatório' });
        }

        if (!duracao_horas) {
            return res.status(400).json({ mensagem: 'A duração do curso em horas é obrigatória' });
        }

        if (!(duracao_horas >= 40 && duracao_horas <= 200)) {
            return res.status(400).json({ mensagem: 'Carga horária não permitida. A carga horária deve ser entre 40 e 200 horas' });
        }

        // Atualizar o curso no banco de dados
        curso = await curso.update({
            nome,
            duracao_horas
        });

        res.status(200).json(curso); // Retornar o curso atualizado
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao atualizar curso' });
    }
});

// Deletar um curso
cursoRoutes.delete('/:id', auth, async (req, res) => {
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
});
module.exports = cursoRoutes;
