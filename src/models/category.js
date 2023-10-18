const connection = require("../config/database");

const getCategoriesModel =  () => {
    return connection.query("SELECT * FROM categorias");
};

const getCategoryById = async (id) => {
    const text = ("SELECT * FROM categorias WHERE id = $1");
    return (await connection.query(text, [id])).rows[0];
};

module.exports = {
    getCategoriesModel,
    getCategoryById
};