const jwt = require('jsonwebtoken');
const jwt_secret = require('../jwt_secret');
const conect = require('../conection_db');


const verifyLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(404).json('Token não informado');
    }

    try{
        const token = authorization.replace('Bearer', '').trim();

        const { id } = jwt.verify(token, jwt_secret);

        const query = 'select * from usuarios where id = $1';
        const {rows, rowCount} = await conect.query(query, [id]);

        if(rowCount === 0){
            return res.status(404).json('Usuario não encontrado');
        }

        const {senha, ...usuario} = rows[0];

        req.usuario = usuario;

        next();

    }catch(error){
        return res.status(400).json(error.message)
    }

}

module.exports = verifyLogin;