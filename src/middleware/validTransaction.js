const { getTransaction } = require("../controllers/transaction")
const { getCategoryById } = require("../models/category")
const { getTransactionModel, getTransactionsModel } = require("../models/transaction")

const register = async (req, res, next) => {
    const { tipo, descricao, valor, data, categoria_id } = req.body
    const checkEmptyData = !(tipo && descricao && valor && data && categoria_id)
    if (checkEmptyData) {
        return res.status(400).json({ mensagem: "Todos os campos obrigatórios devem ser informados." })
    }

    if (!(tipo === "entrada" || tipo === "saida")) {
        return res.json({ mensagem: "tipo de transação inválida" })
    }

    try {
        const category = await getCategoryById(categoria_id)
        if (!category) {
            return res.status(400).json({ mensagem: "Categoria não cadastrada" })
        }

        req.category_name = category.descricao
        next()


    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno servidor" })
    }

}

const update = async (req, res, next) => {
    const { tipo, descricao, valor, data, categoria_id } = req.body
    const checkEmptyData = !(tipo && descricao && valor && data && categoria_id)
    if (checkEmptyData) {
        return res.status(400).json({ mensagem: "Todos os campos obrigatórios devem ser informados." })
    }

    if (!(tipo === "entrada" || tipo === "saida")) {
        return res.json({ mensagem: "tipo de transação inválida" })
    }

    try {
        const category = await getCategoryById(categoria_id)
        if (!category) {
            return res.status(400).json({ mensagem: "Categoria não cadastrada" })
        }

        next()

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno servidor" })
    }
}

const isDelete = async (req, res, next) => {
    const { id } = req.params;
    try {
        const transaction = await getTransactionModel(id, req.user.id);
        if (transaction.length === 0) {
            return res.status(404).json({ mensagem: "Transação não encontrada." });
        }
        next();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno servidor" });
    }
}

const extract = async (req, res) => {   
    try {
        const transaction = await getTransactionsModel(req.user.id);

        if (transaction.length === 0) {
            return res.status(404).json({ mensagem: "Transação não encontrada." });
        }
        
        next();

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno servidor" });
    };
};

module.exports = {
    register,
    update,
    isDelete,
    extract
};