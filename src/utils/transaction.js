
const filterTransiction = (array,dado) => {
    return array.filter((transacao) => transacao.tipo === dado);
};

const sumValorTransiction = (array) => {
    let cont = 0;
    array.forEach((transacoes) => { cont = transacoes.valor + cont; });

    return cont;
};

module.exports = {
    filterTransiction,
    sumValorTransiction
};