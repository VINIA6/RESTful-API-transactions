const { Router } = require("express");
const { registerUser, loginUser, getUser, updateUser  } = require("./controllers/user");
const validUser = require("./middleware/validUser");
const autentication = require("./middleware/autentication");
const { getCategories } = require("./controllers/category");
const { registerTransaction, getTransactions, getTransaction, updateTransaction, deleteTransaction, extractTransaction } = require("./controllers/transaction");
const validTransaction = require("./middleware/validTransaction");

const route = Router();

// usuario
route.post("/usuario", validUser.register, registerUser);
route.post("/login",validUser.login, loginUser);

route.use(autentication);

route.get("/usuario", getUser);
route.put("/usuario",validUser.update, updateUser);

//categoria
route.get("/categoria", getCategories);


//Transação
route.post("/transacao",validTransaction.register, registerTransaction);

//Extrato
route.get("/transacao/extrato",extractTransaction);

route.get("/transacao", getTransactions);
route.get("/transacao/:id", getTransaction);
route.put("/transacao/:id",validTransaction.update, updateTransaction);

route.delete("/transacao/:id",validTransaction.isDelete, deleteTransaction);
module.exports = route;