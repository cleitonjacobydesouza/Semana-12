const { Router } = require('express');
const Aluno = require('../models/Aluno');
const { sign } = require('jsonwebtoken');


const loginRoutes = Router();


loginRoutes.post('/', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email) {
            return res.status(400).json({ mensagem: 'O email é obrigatório' });
        }

        if (!password) {
            return res.status(400).json({ mensagem: 'O password é obrigatório' });
        }

        const aluno = await Aluno.findOne({
            where: { email: email, password: password }
        });

        if (!aluno) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        // Aqui você gera o token JWT e o retorna
        const payload = { sub: aluno.id, email: aluno.email, nome: aluno.nome };
        
        // Atualizado para usar process.env.SECRET_JWT
        const token = sign(payload, process.env.SECRET_JWT);

        res.status(200).json({ token: token });
        console.log(process.env.SECRET_JWT)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error, mensagem: 'Erro ao tentar fazer login' });
    }
});


module.exports = loginRoutes;
