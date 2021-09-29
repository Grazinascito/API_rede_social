const jwt = require('jsonwebtoken');
const jwt_secret = require('../jwt_secret');
const conect = require('../conection_db');

const postRegister = async(req, res) => {
    const {texto, token} = req.body;

    if(!texto){
        return res.status(400).json('O campo texto é obrigatório');
    }
    if(!token){
        return res.status(400).json('O campo token é obrigatório');
    }

    try{

        const { id } = jwt.verify(token, jwt_secret);

        const query = 'select * from usuarios where id = $1';
        const {rows, rowCount} = await conect.query(query, [id]);

        if(rowCount === 0){
            return res.status(404).json('Usuario não encontrado');
        }

        const userPost = rows[0];

        const queryPost = 'insert into postagens (usuario_id, texto) values ($1, $2)';
        const post = await conect.query(queryPost, [userPost.id, texto]);

        if(post.rowCount === 0){
            return res.status(400).json('Postagem não cadastrada');
        }

        return res.status(200).json('Postagem feita com sucesso');

    }catch(error){
        return res.status(400).json(error.message);
    }
}

const updatePost = async (req, res) => {
    const {texto, token} = req.body;
    const { id: idPost } = req.params;

    if(!texto){
        return res.status(400).json('O campo texto é obrigatório');
    }
    if(!token){
        return res.status(400).json('O campo token é obrigatório');
    }

    try{

        const { id } = jwt.verify(token, jwt_secret);
        const query = 'select * from usuarios where id = $1';
        
        const {rows, rowCount} = await conect.query(query, [id]);
        
        if(rowCount === 0){
            return res.status(404).json('Usuario não encontrado');
        }
        
        const userPost = rows[0];
        const queryPostExisting = 'select * from postagens where id = $1 and usuario_id = $2';

        const postExisting = await conect.query(queryPostExisting,[idPost, userPost.id]);

        if(postExisting.rowCount === 0){
            return res.status(404).json('Postagem não encontrada');
        }

        const queryPost = 'update postagens set texto = $1 where id = $2 and usuario_id = $3';
        const post = await conect.query(queryPost, [texto, idPost, userPost.id]);

        if(post.rowCount === 0){
            return res.status(400).json('Postagem não cadastrada');
        }

        return res.status(200).json('Postagem feita com sucesso');

    }catch(error){
        return res.status(400).json(error.message);
    }
}

module.exports = {
    postRegister,
    updatePost
}