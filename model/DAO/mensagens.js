/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autora: Isabelle e Lidia
 * Data Criacao: 23/11/2022
 * Versao: 1.0
 *****************************************************************************************************************/


const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertMessages = async (mensagem) => {
    try {


        let sql = `insert into tbl_mensagem(texto, nome, email)
                        values( 
                            '${mensagem.texto}',
                            '${mensagem.nome}',
                            '${mensagem.email}'
                        )`;
        const result = await prisma.$executeRawUnsafe (sql);

        if (result) {
            return true;
        }else
            return false;

        } catch (error) {
            return false;
        }

}

const deleteMessage = async (id) => {

    try {

        let sql = `delete from tbl_mensagem
                                where id = '${id}'`;

        const result = await prisma.$executeRawUnsafe (sql);
    
        if (result) {
            return true;
        }else
            return false;
                                
        } catch (error) {
            return false;
        }
                            
}


const selectAllMessages = async () => {

    const sql = `select * from tbl_mensagem order by id desc`

    const dados = await prisma.$queryRawUnsafe(sql)

    if (dados.length > 0) {
        return dados
    } else{
        return false
    }
}

const selectMessageById = async (id) => {

    const sql = `select * from tbl_mensagem where id = ${id}`

    const dados = await prisma.$queryRawUnsafe(sql)

    if (dados.length > 0) {
        return dados
    } else{
        return false
    }
}

module.exports = {
    selectAllMessages,
    insertMessages,
    deleteMessage,
    selectMessageById
}