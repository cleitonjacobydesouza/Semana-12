const { verify } = require('jsonwebtoken')

async function auth(req, res, next) {
    try {
        console.log("Entramos no middleware")

        const { authorization } = req.headers

        console.log(authorization)

        req['payload'] = verify(authorization, process.env.SECRET_JWT)

        next()
 
    } catch (error) {
        return res.status(401).json({
            mensagen: "Autenticação falhou!",
            cause: error.message
        })
        
    }
}

module.exports = { auth }