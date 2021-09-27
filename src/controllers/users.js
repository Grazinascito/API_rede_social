const conect = require('../conection_db');
const bcrypt = require('bcrypt');

const userRegister = async (req, res) => {
    const {nome, email, senha} = req.body;

    if(!nome){
        return res.status(404).json('O campo nome é obrigatório');
    };
    if(!email){
        return res.status(404).json('O campo email é obrigatório');
    };
    if(!senha){
        return res.status(404).json('O campo senha é obrigatório');
    };

    try{
        const queryEmail = 'select * from usuarios where email = $1';
        const {rowCount: emailExists} = await conect.query(queryEmail, [email]);

        if(emailExists > 0){
            return res.status(400).json('Esse email já existe');
        };

        const passwordEncrypted = await bcrypt.hash(senha, 10);
        
        const query = 'insert into usuarios(nome, email, senha) values($1, $2, $3)';
        const userRegistered = await conect.query(query, [nome, email, passwordEncrypted]);

        if(userRegistered.rowCount === 0){
            return res.status(400).json('Não foi possível registrar o usuário');
        };

       return res.status(200).json(userRegistered.rows[0]);

    }catch(error){
        return res.status(400).json(error.message);
    };

};

module.exports = {
    userRegister
};