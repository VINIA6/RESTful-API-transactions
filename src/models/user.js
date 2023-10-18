const connection = require("../config/database");


const registerUserModel = async ({ nome, email, senha }) => {
    const text = "INSERT INTO usuarios(nome, email, senha) VALUES($1, $2, $3) returning id, email, nome";
    return await connection.query(text, [nome, email, senha]);
};

const findEmail = async (email) => {
    const text = "SELECT email FROM usuarios WHERE email = $1";
    return await connection.query(text, [email]);
};

const findUserByEmail = async (email) => {
    const text = "SELECT * FROM usuarios WHERE email = $1";
    return (await connection.query(text, [email])).rows[0];
};

const findUserById = async (id) => {
    const text = "SELECT * FROM usuarios WHERE id = $1";
    return await connection.query(text, [id]);
};

const updateUserModel = async ({ id, nome, email, senha }) => {
    const text = "UPDATE usuarios SET nome = $2, email = $3, senha = $4 WHERE id = $1";
    return await connection.query(text, [id, nome, email, senha]);
};


module.exports = {
    registerUserModel,
    findEmail,
    findUserByEmail,
    findUserById,
    updateUserModel
};