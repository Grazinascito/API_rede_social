const conect = require('../conection_db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = require('../jwt_secret');

const userLogin = async (req, res) => {
    const {email, senha} = req.body;

    if(!email || !senha){
        return res.status(404).json('Email e senha são obrigatórios');
    }

    try{
        const qyVerifyEmail = 'select * from usuarios where email = $1';
        const {rows, rowCount} = await conect.query(qyVerifyEmail, [email]);

        if(rowCount === 0){
            return res.status(404).json('Esse email é invalido');
        }

        const usuario = rows[0];
        const verifiedPassword = await bcrypt.compare(senha, usuario.senha);

        if(!verifiedPassword){
            return res.status(400).json('Email ou senha incorretos');
        }

        const token = jwt.sign({id: usuario.id}, jwt_secret, {expiresIn: '1d'});

        const {senha: senhaUsuario, ...dataUser} = usuario;

        return res.status(200).json({
            dataUser,
            token
        });
    }catch(error){
        return res.status(400).json(error.message);
    }
}

module.exports = {
    userLogin
}
