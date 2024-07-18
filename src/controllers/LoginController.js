const Aluno = require('../models/Aluno'); // Certifique-se de que o caminho esteja correto
const { sign } = require('jsonwebtoken');

class LoginController {
    async login(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;
    
            if (!email) {
                return res.status(400).json({ mensagem: 'O email é obrigatório' });
            }
    
            if (!password) {
                return res.status(400).json({ mensagem: 'A senha é obrigatória' });
            }
    
            const aluno = await Aluno.findOne({
                where: { email: email, password: password }
            });
    
            if (!aluno) {
                return res.status(404).json({ mensagem: 'Aluno não encontrado' });
            }
    
            // Aqui você gera o token JWT e o retorna
            const payload = { sub: aluno.id, email: aluno.email, nome: aluno.nome };
            const token = sign(payload, process.env.SECRET_JWT, { expiresIn: '2h' });
    
            res.status(200).json({ token: token });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: error.message, mensagem: 'Erro ao tentar fazer login' });
        }
    }
}

module.exports = new LoginController();
