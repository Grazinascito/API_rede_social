const jwt = require('jsonwebtoken');
const jwt_secret = require('../jwt_secret');
const conect = require('../conection_db');


const listPosts = async (req, res) => {
    try{
        const posts = await conect.query('select * from postagens');
        return res.status(200).json(posts.rows);
    }catch(error){
        return res.status(400).json(error.message);
    }
}



const userPost = async (req, res) => {

    const {usuario} = req;
    try{
        const posts = await conect.query('select * from postagens where usuario_id = $1', [usuario]);
        return res.status(200).json(posts.rows);
    }catch(error){
        return res.status(400).json(error.message);
    }
}
const postRegister = async(req, res) => {
    const {texto} = req.body;
    const {usuario} = req;

    if(!texto){
        return res.status(400).json('O campo texto é obrigatório');
    }

    try{

        const queryPost = 'insert into postagens (usuario_id, texto) values ($1, $2)';
        const post = await conect.query(queryPost, [usuario.id, texto]);

        if(post.rowCount === 0){
            return res.status(400).json('Postagem não cadastrada');
        }

        return res.status(200).json('Postagem feita com sucesso');

    }catch(error){
        return res.status(400).json(error.message);
    }
}

const updatePost = async (req, res) => {
    const {texto} = req.body;
    const {usuario} = req;
    const { id: idPost } = req.params;

    if(!texto){
        return res.status(400).json('O campo texto é obrigatório');
    }

    try{
        const queryPostExisting = 'select * from postagens where id = $1 and usuario_id = $2';

        const postExisting = await conect.query(queryPostExisting,[idPost, usuario.id]);

        if(postExisting.rowCount === 0){
            return res.status(404).json('Postagem não encontrada');
        }

        const queryPost = 'update postagens set texto = $1 where id = $2 and usuario_id = $3';
        const post = await conect.query(queryPost, [texto, idPost, usuario.id]);

        if(post.rowCount === 0){
            return res.status(400).json('Postagem não cadastrada');
        }

        return res.status(200).json('Postagem feita com sucesso');

    }catch(error){
        return res.status(400).json(error.message);
    }
}

const deletePost = async (req, res) => {
    const {usuario} = req;
    const { id } = req.params;

    try{
        const queryPostExisting = 'select * from postagens where id = $1 and usuario_id = $2';

        const postExisting = await conect.query(queryPostExisting,[id, usuario.id]);

        if(postExisting.rowCount === 0){
            return res.status(404).json('Postagem não encontrada');
        }

        const { rowCount } = await conect.query('delete from postagens where id = $1');

        if(rowCount === 0){
            return res.status(400).json('Não foi possível excluir a postagem');
        }

        return res.status(200).json('Postagem excluída com sucesso');

    }catch(error){
        return res.status(400).json(error.message);
    }
}

module.exports = {
    postRegister,
    updatePost,
    deletePost,
    listPosts,
    userPost
}