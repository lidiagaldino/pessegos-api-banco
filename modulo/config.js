/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela configuracao de variaveis, constantes e mensagens do sistema
 * Autoras: Isabelle e Lidia
 * Data Criacao: 23/11/2022
 * Versao: 1.0
 * 
 *****************************************************************************************************************/

 const MESSAGE_ERROR = {
    REQUIRED_FIELDS     : 'Existe(m) campo(s) obrigatório(s) que deve(m) ser preenchido(s)! ',
    INVALID_EMAIL       : 'O email informado não é valido',
    CONTENT_TYPE        : 'O cabeçalho da requisição não possui um Content-type válido!',
    EMPTY_BODY          : 'O body da requisição não pode ser vazio!',
    NOT_FOUND_DB        : 'Não foram encontrados registros no banco de dados',
    INTERNAL_ERROR_DB   : 'Não foi possivel realizar a operação com o banco de dados',
    REQUIRED_ID         : 'O id do registro é obrigatório nesse tipo de requisição',
    AUTENTICATE_ERROR   : 'Senha ou login estão incorretos',
    EXISTING_USER       : 'Este usuário já existe'
}

const MESSAGE_SUCCESS = {
    INSERT_ITEM     : 'Item criado com sucesso no Banco de Dados',
    UPDATE_ITEM     : 'Item atualizado com sucesso no Banco de Dados',
    DELETE_ITEM     : 'Item deletado com sucesso no Banco de Dados',
    AUTENTICATE_SUCCESS : 'Usuário autenticado com sucesso'
}

module.exports = {
    MESSAGE_ERROR,
    MESSAGE_SUCCESS
}