const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database:'rede_social_02',
    password: 'coxinha123',
    port: 5432
});

const query = (text, param) => {
    return pool.query(text,param);
}

module.exports = {
    query
}