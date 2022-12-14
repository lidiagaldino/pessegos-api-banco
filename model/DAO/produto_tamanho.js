/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autora: Isabelle e Lidia
 * Data Criacao: 23/11/2022
 * Versao: 1.0
 *****************************************************************************************************************/


const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const inserirProdutoTamanho = async (produto) => {

    try{

        const sql = `insert into tbl_produto_tamanho(preco, desconto, id_tamanho, id_produto)
                            values('${produto.id_tamanho.preco}', '${produto.desconto}', '${produto.id_tamanho.id}', '${produto.id_produto}')`


        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else{
            return false
        }

    } catch(error){
        return false
    }
}

const inserirProdutoTamanhoProdutoExistente = async (produto) => {

    try{

        const sql = `insert into tbl_produto_tamanho(preco, desconto, id_tamanho, id_produto)
                            values('${produto.preco}', '${produto.desconto}', '${produto.id_tamanho}', '${produto.id}')`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else{
            return false
        }

    } catch(error){
        return false
    }
}

const deleteProdutoTamanho = async (id, idTamanho) => {

    const sql = `delete from tbl_produto_tamanho where id_produto = ${id} and id_tamanho = ${idTamanho};`

    const result = await prisma.$executeRawUnsafe(sql)

    if (result) {
        return true
    } else{
        return false
    }
}

module.exports = {
    inserirProdutoTamanho,
    deleteProdutoTamanho,
    inserirProdutoTamanhoProdutoExistente
}