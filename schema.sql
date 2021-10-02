CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS postagens(
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    texto TEXT NOT NULL.
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
);