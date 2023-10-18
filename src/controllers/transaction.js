const { registerTransactionModel, getTransactionsModel, getTransactionModel, updateTransactionModel, deleteTransactionModel, getTransactionsExtractModel } = require("../models/transaction");
const { filterTransiction, sumValorTransiction } = require("../utils/transaction");

const registerTransaction = async (req, res) => {

    try {

        const { id: idTransaction } = await registerTransactionModel({
            ...req.body,
            usuario_id: req.user.id,
        });


        return res.status(201).json({
            id: idTransaction,
            ...req.body,
            usuario_id: req.user.id,
            categoria_nome: req.category_name
        });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno servidor" });
    };

};

const getTransactions = async (req, res) => {
    try {

        const categorias = req.query.filter;
        const transactions = await getTransactionsModel(req.user.id, categorias);

        if (categorias) {
            const transacoesFiltradas = transactions.filter(transaction => categorias.includes(transaction.categoria_nome));
            return res.status(200).json(transacoesFiltradas);
        }

        return res.status(200).json(transactions);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno servidor" });
    };
};

const getTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await getTransactionModel(id, req.user.id);
        if (transaction.length === 0) {
            return res.status(404).json({ mensagem: "Transação não encontrada." });
        }
        return res.status(200).json(transaction);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno servidor" });
    };
};

const updateTransaction = async (req, res) => {
    const { id: idTransaction } = req.params;
    const { id: idUser } = req.user;
    const { rowCount: transactionFound } = await updateTransactionModel({
        idUser,
        idTransaction,
        ...req.body
    });

    if (!transactionFound) {
        return res.status(404).json({ mensagem: "Transação não encontrada." })
    };
    return res.status(204).json();
};

const deleteTransaction = async (req, res) => {
    const { id } = req.params;

    try {
        deleteTransactionModel(id);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno servidor" });
    };
};

const extractTransaction = async (req, res) => {

    try {
        const transactions = await getTransactionsExtractModel(req.user.id);

        const transactionsEntrada = filterTransiction(transactions, 'entrada');
        const transactionsSaida = filterTransiction(transactions, 'saida');

        const sumValorSaida = sumValorTransiction(transactionsSaida);
        const sumValorEntrada = sumValorTransiction(transactionsEntrada);

        const jsonExtrato = {
            "entrada": sumValorEntrada,
            "saida": sumValorSaida
        };

        return res.status(200).json(jsonExtrato);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno servidor" });
    }
}

module.exports = {
    registerTransaction,
    getTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction,
    extractTransaction
};

