/*****************************************************************************************************************
 * Objetivo: Implementacao do JWT no projeto
 * Autora: Isabelle e Lidia
 * Data Criacao: 12/12/2022
 * Versao: 1.0
 *****************************************************************************************************************/


const jwt = require('jsonwebtoken');

const SECRET = 'a1b2c3'

const EXPIRES = 60

const createJWT = async function(payLoad) {

    const token = jwt.sign({userID:payLoad}, SECRET, {expiresIn: EXPIRES})

    return token


}

const validateJWT = async function(token) {

    let status = false

    jwt.verify(token, SECRET, async function(err, decode){

        if(!err)
            status = true

    })

    return status
}

module.exports = {
    createJWT,
    validateJWT
}