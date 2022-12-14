/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autora: Isabelle e Lidia
 * Data Criacao: 23/11/2022
 * Versao: 1.0
 *****************************************************************************************************************/


const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllTamanhos = async () => {

    const sql = `select * from tbl_tamanho`

    const rsTamanho = await prisma.$queryRawUnsafe(sql)

    if (rsTamanho.length > 0) {
        return rsTamanho
    } else{
        return false
    }
}

module.exports = {
    getAllTamanhos
}