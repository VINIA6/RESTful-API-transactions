const { verify } = require("jsonwebtoken");
const { passwordToken } = require("../../sensitiveData");
const { findUserById } = require("../models/user");

const autentication = async (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    };

    try {

        const token = req.headers.authorization.split(" ")[1];
        
        const { id: idUser } = verify(token, passwordToken);

        const { rowCount: userExist, rows } = await findUserById(idUser);
        if (!userExist) {
            return res.status(401).json({ mensagem: "usuário não autorizado" });
        }

        req.user = rows[0];

        next();
    } catch (error) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    };
};

module.exports = autentication;