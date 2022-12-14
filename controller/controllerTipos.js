/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autora: Isabelle e Lidia
 * Data Criacao: 23/11/2022
 * Versao: 1.0
 * 
 *****************************************************************************************************************/



const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')

const listarTiposPizza = async () => {

    let tiposJSON = {}

    const { selectAllTiposPizza, addTipoBebida } = require('../model/DAO/tipos.js')

    const dados = await selectAllTiposPizza()

    if(dados){
        
        tiposJSON.message = dados
        tiposJSON.status = 200

    } else{
        tiposJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        tiposJSON.status = 404
    }

    return tiposJSON
}

const listarTiposBebidas = async () => {

    let tiposJSON = {}

    const { selectAllTiposBebidas } = require('../model/DAO/tipos.js')

    const dados = await selectAllTiposBebidas()

    if(dados){
        
        tiposJSON.message = dados
        tiposJSON.status = 200

    } else{
        tiposJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        tiposJSON.status = 404
    }

    return tiposJSON
}

const inserirTipoPizza = async (tipo) => {

    if (tipo.nome == undefined || tipo.nome == '') {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }

    const { addTipoPizza } = require('../model/DAO/tipos.js')

    const inserir = await addTipoPizza(tipo)

    if (inserir) {
        return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
    } else{
        return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }
}

const inserirTipoBebida = async (tipo) => {

    if (tipo.nome == undefined || tipo.nome == '') {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }

    const { addTipoBebida } = require('../model/DAO/tipos.js')

    const inserir = await addTipoBebida(tipo)

    if (inserir) {
        return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
    } else{
        return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }
}

module.exports = {
    listarTiposPizza,
    listarTiposBebidas,
    inserirTipoPizza,
    inserirTipoBebida
}