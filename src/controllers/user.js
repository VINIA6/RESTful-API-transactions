const { registerUserModel, updateUserModel } = require("../models/user")
const { passwordToken } = require("../../sensitiveData")
const { hash } = require('bcrypt')
const { sign } = require("jsonwebtoken")

const registerUser = async (req, res) => {
    const passwordHash = await hash(req.body.senha, 10);

    try {
        const { rows: userRegistered } = await registerUserModel({
            ...req.body,
            senha: passwordHash
        });
        return res.status(201).json(userRegistered[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: "Error interno servidor" });
    };
};

const loginUser = (req, res) => {

    try {
        const token = sign({ id: req.user.id }, passwordToken, { expiresIn: "10d" });
        delete req.user.senha;

        return res.status(200).json({
            usuario: req.user,
            token
        });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno servidor" });
    };
};

const getUser = (req, res) => {

    try {
        delete req.user.senha;
        return res.json(req.user);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno servidor" });
    };
};

const updateUser = async (req, res) => {

    try {
        
        const passwordHash = await hash(req.body.senha, 10);

        updateUserModel({
            ...req.user,
            senha: passwordHash
        });

        return res.status(204).json();

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno servidor" });
    };
};




module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
};



