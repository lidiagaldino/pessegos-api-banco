/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autora: Isabelle e Lidia
 * Data Criacao: 23/11/2022
 * Versao: 1.0
 * 
 *****************************************************************************************************************/


const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')

const listarTamanhos = async () => {

    let tamanhosJSON = {}

    const { getAllTamanhos } = require('../model/DAO/tamanho.js')

    const dados = await getAllTamanhos()

    if (dados) {
        
        tamanhosJSON.message = dados
        tamanhosJSON.status = 200

    } else{

        tamanhosJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        tamanhosJSON.status = 404

    }

    return tamanhosJSON
}

module.exports = {
    listarTamanhos
}