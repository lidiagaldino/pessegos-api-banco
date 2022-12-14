/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autora: Isabelle e Lidia
 * Data Criacao: 23/11/2022
 * Versao: 1.0
 * 
 *****************************************************************************************************************/



const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')
const newMessage = require('../model/DAO/mensagens.js');

const listarMenssagens = async () => {

    let mensagensJSON = {}

    const dados = await newMessage.selectAllMessages()

    if (dados) {
        mensagensJSON.message = dados
        mensagensJSON.status = 200
    } else{
        mensagensJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        mensagensJSON.status = 404
    }

    return mensagensJSON
}

const novaMensagem = async (mensagem) => {

    //validacao de campos obrigatórios  
    if (mensagem.nome == undefined || mensagem.nome == '' || mensagem.email == '' || mensagem.email == undefined || mensagem.texto == '' || mensagem.texto == undefined ) {
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    //validacao para verificar email valido
    }else if (!mensagem.email.includes('@')) 
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL};
    else
    {
        //import da model de alun

        //chama funcao para inserir um  novo aluno
        const resultNewMessage = await newMessage.insertMessages(mensagem);

        if (resultNewMessage) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        } else 
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
      }

}


const excluirMensagem = async (id) => {

//validacao para o id como campo obrigatorio
    if (id == '' || id == undefined)
        return {status: 400, MESSAGE: MESSAGE_ERROR.REQUIRED_ID}

    const mensagem = await newMessage.selectMessageById(id)

    if(mensagem) {
        const deletarMensagem = require('../model/DAO/mensagens.js')

         //funcao para deletar um curso
         const result = await deletarMensagem.deleteMessage(id);
 
         if (result) {
             return {status: 201, message: MESSAGE_SUCCESS.DELETE_ITEM};
         } else 
             return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
     } else {
         return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB};
     }
        
}


module.exports = {
    listarMenssagens,
    novaMensagem,
    excluirMensagem
}