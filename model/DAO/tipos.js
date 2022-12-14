/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autora: Isabelle e Lidia
 * Data Criacao: 23/11/2022
 * Versao: 1.0
 *****************************************************************************************************************/



const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllTiposPizza = async () => {

    const sql = `select * from tbl_tipo_pizza`

    const rsTipos = await prisma.$queryRawUnsafe(sql)

    if (rsTipos.length > 0) {
        return rsTipos
    } else{
        return false
    }
}

const addTipoPizza = async (tipo) => {

    try {
        
        const sql = `insert into tbl_tipo_pizza(tipo) values ('${tipo.nome}')`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else{
            return false
        }
    } catch (error) {
        return false
    }
}

const addTipoBebida = async (tipo) => {

    try {
        
        const sql = `insert into tbl_tipo_bebida(tipo) values ('${tipo.nome}')`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else{
            return false
        }
    } catch (error) {
        return false
    }
}

const selectAllTiposBebidas = async () => {

    const sql = `select * from tbl_tipo_bebida`

    const rsTipos = await prisma.$queryRawUnsafe(sql)

    if (rsTipos.length > 0) {
        return rsTipos
    } else{
        return false
    }
}

module.exports = {
    selectAllTiposPizza,
    selectAllTiposBebidas,
    addTipoPizza,
    addTipoBebida
}