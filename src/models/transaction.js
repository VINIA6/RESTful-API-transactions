const connection = require("../config/database");

const registerTransactionModel = async ({
    tipo,
    descricao,
    valor,
    data,
    categoria_id,
    usuario_id
}) => {
    const text = `
        INSERT INTO
            transacoes (tipo, descricao, valor, data, categoria_id, usuario_id) 
            VALUES ($1, $2, $3, $4, $5, $6) returning id
        `;
    const values = [tipo, descricao, valor, data, categoria_id, usuario_id];
    return ((await connection.query(text, values)).rows[0]);
};

const getTransactionsModel = async (idUser) => {
    const text = `
    SELECT t.id, t.tipo, t.descricao,t.valor, t.data, t.usuario_id, t.categoria_id,  c.descricao AS categoria_nome
    FROM 
    transacoes t JOIN categorias c 
    on t.categoria_id = c.id WHERE t.usuario_id = $1 
    `;

    return (await connection.query(text, [idUser])).rows;

};

const getTransactionsExtractModel = async (idUser) => {

    const text = `
    SELECT id, valor, usuario_id, tipo
    FROM transacoes
    WHERE usuario_id = $1 ;
    `;

    return (await connection.query(text, [idUser])).rows;
};

const getTransactionModel = async (idTransaction, idUser) => {
    const text = `
    SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao AS categoria_nome
    FROM 
    transacoes t JOIN categorias c 
    on t.categoria_id = c.id
    WHERE t.usuario_id = $2 AND t.id = $1
    `;
    return (await connection.query(text, [idTransaction, idUser])).rows;
};

const updateTransactionModel = async ({ tipo, descricao, valor, data, categoria_id, idTransaction, idUser }) => {
    const text = `
    UPDATE transacoes 
    SET tipo = $1, descricao = $2, valor = $3, data = $4, categoria_id = $5
    WHERE id = $6 AND usuario_id = $7 returning id;
    `;
    const values = [tipo, descricao, valor, data, categoria_id, idTransaction, idUser];
    return await connection.query(text, values);
};

const deleteTransactionModel = async (idTransaction) => {
    const text = `
    DELETE FROM transacoes
    WHERE id = $1;
    `;
    return (await connection.query(text, [idTransaction]));
};

module.exports = {
    registerTransactionModel,
    getTransactionsModel,
    getTransactionModel,
    updateTransactionModel,
    deleteTransactionModel,
    getTransactionsExtractModel
};

