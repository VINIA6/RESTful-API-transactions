CREATE DATABASE dindin;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(60) NOT NULL UNIQUE,
    senha TEXT NOT NULL
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL
);

CREATE TABLE transacoes (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    valor INTEGER NOT NULL,
    data TIMESTAMPTZ NOT NULL,
    categoria_id INTEGER REFERENCES categorias(id) NOT NULL,
    usuario_id INTEGER REFERENCES usuarios(id) NOT NULL,
    tipo TEXT NOT NULL
);

INSERT INTO categorias (descricao) 
VALUES ('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas');

