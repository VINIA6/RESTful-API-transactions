const { compare } = require("bcrypt")
const { findEmail, findUserByEmail } = require("../models/user")

const register = async (req, res, next) => {

    const { nome, email, senha } = req.body;
    const checkEmptyData = !(nome && email && senha);
    
    if (checkEmptyData) {
        return res.status(400).json({ mensagem: "Preencha todos os campos" });
    }

    try {
        const { rowCount: emailExist } = await findEmail(email);

        if (emailExist) {
            return res.status(400).json({ mensagem: "Já existe usuário cadastrado com o e-mail informado."});
        }
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno servidor" });
    }

    next();

};

const login = async (req, res, next) => {

    const { email, senha } = req.body;

    const checkEmptyData = !(email && senha);

    if (checkEmptyData) {
        return res.status(400).json({ mensagem: "Preencha todos os campos" });
    }

    try {

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)." });
        }

        const passwordIsValid = await compare(senha, user.senha);
        if (!passwordIsValid) {
            return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)." });
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(500).json({ mensagem: "Erro interno servidor" });
    }

};

const update = async (req, res, next) => {
    const { nome, email, senha } = req.body;
    const checkEmptyData = !(nome && email && senha);
    if (checkEmptyData) {
        return res.status(400).json({ mensagem: "Preencha todos os campos" });
    };

    try {

        const userFound = await findUserByEmail(email);

        if (userFound && userFound.id !== req.user.id) {
            return res.status(400).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário."});
        };

        req.user = {
            id: req.user.id,
            nome,
            email,
        };

        next();

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno servidor" });
    };

};

module.exports = {
    register,
    login,
    update
};