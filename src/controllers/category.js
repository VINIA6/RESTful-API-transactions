const { getCategoriesModel } = require("../models/category")

const getCategories = async (req, res) => {
    try {

        const listCategories = (await getCategoriesModel()).rows;

        return res.status(200).json(listCategories);

    } catch (error) {
        return res.status(500).json("Erro interno servidor");
    };

};

module.exports = {
    getCategories
};