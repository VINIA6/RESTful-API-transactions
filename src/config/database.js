const { hostBd, databaseBd, userBd, passwordBd, portBd } = require("../../sensitiveData");
const { Pool } = require("pg");

const connection = new Pool({
    host: hostBd,
    port: portBd,
    user: userBd,
    password: passwordBd,
    database: databaseBd
});

async function testarConexao() {
    try {
        const client = await connection.connect();

        const resultado = await client.query("SELECT * FROM usuarios ");

        console.log("Conexão bem-sucedida!");
        console.log("Resultado da consulta de teste:", resultado.rows[0]);

        client.release();
    } catch (erro) {
        console.error("Erro ao conectar ao banco de dados:", erro);
    } finally {
        connection.end();
    };
};

// testarConexao();

module.exports = connection;