const knex = require('../bancodedados/conexao');
const schemaMovimentacoes = require('../validacoes/schemaMovimentacoes');
const jwt = require('jsonwebtoken');
const jwt_secret = require('../jwt_secret');

const criarMovimentacao = async (req, res) => {
    const { descricao, tipo, valor, data } = req.body;
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer', '').trim();
    const { id } = jwt.verify(token, jwt_secret);

    try {
        await schemaMovimentacoes.schemaCriarMovimentacao.validate(req.body);

        const perfilUsuario = await knex('usuarios').where({ id }).first();

        if (!perfilUsuario) {
            return res.status(404).json('Usuário não encontrado.');
        }

        const novaMovimentacao = await knex('movimentacoes').insert({ descricao, tipo, valor, data, usuario_id: id });

        if (!novaMovimentacao) {
            return res.status(400).json('Não foi possível criar a movimentação.');
        }

        return res.status(200).json('Movimentação criada com sucesso!');

    } catch (error) {
        return res.status(400).json(error.message);
    }

};

const listarMovimentacoes = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer', '').trim();
    const { id } = jwt.verify(token, jwt_secret);

    try {
        const movimentacoes = await knex('movimentacoes').where({ usuario_id: id }).offset(0).limit(10);

        if (!movimentacoes) {
            return res.status(404).json('Não há movimentações cadastradas');
        };
        return res.status(200).json(movimentacoes);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const atualizarMovimentacao = async (req, res) => {
    const { descricao, tipo, valor, data } = req.body;
    const { id } = req.params;
    const { usuario } = req;
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer', '').trim();
    const { usuario_id } = jwt.verify(token, jwt_secret);

    if (!usuario) {
        return res.status(401).json('Usuário não autenticado!');
    }

    try {

        const buscarMovimentacao = await knex('movimentacoes').where({ id }).first();

        if (!buscarMovimentacao) {
            return res.status(400).json('Não foi possível localizar a movimentação a ser atualizada');
        }

        await schemaMovimentacoes.schemaAtualizarMovimentacao.validate(req.body);

        const movimentacaoAtualizada = await knex('movimentacoes').update({ descricao, tipo, valor, data, usuario_id }).where({ id });

        if (!movimentacaoAtualizada) {
            return res.status(400).json('Não foi possível atualizar a movimentação!');
        }

        return res.status(200).json('Movimentação atualizada com sucesso!');
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const excluirMovimentacao = async (req, res) => {
    const { id } = req.params;

    try {
        const movimentacao = await knex('movimentacoes').where({ id }).first();

        if (!movimentacao) {
            return res.status(404).json('Movimentação não encontrada.');
        }

        const movimentacaoExcluida = await knex('movimentacoes').where({ id }).del();

        if (!movimentacaoExcluida) {
            return res.status(404).json('Não foi possível excluir movimentação.');
        };

        return res.status(202).json('Movimentação excluída com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    };
};

const exibirSaldo = async (req, res) => {
    try {
        const despesasUsuarios = await knex('movimentacoes').where({ tipo: 'despesa' }).sum('valor');

        const receitasUsuarios = await knex('movimentacoes').where({ tipo: 'receita' }).sum('valor');

        let despesas = despesasUsuarios[0];
        let receitas = receitasUsuarios[0];

        if (!despesas.sum) {
            despesas = 0;
            return res.status(200).json({ despesas: despesas, receitas: receitas.sum });
        }

        if (!receitas.sum) {
            receitas = 0;
            return res.status(200).json({ despesas: despesas.sum, receitas: receitas });
        }

        const saldo = Number(receitas - despesas);

        return res.status(200).json(saldo);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    criarMovimentacao,
    listarMovimentacoes,
    atualizarMovimentacao,
    excluirMovimentacao,
    exibirSaldo
}