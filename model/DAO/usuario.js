/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autora: Isabelle e Lidia
 * Data Criacao: 23/11/2022
 * Versao: 1.0
 *****************************************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const insertUser = async (user) => {
    try {

        let sql = `insert into tbl_usuario(senha, login)
                        values( 
                            md5('${user.senha}'),
                            '${user.login}'
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

const updateUser = async function (usuario) {

    try {
    
        let sql = `update tbl_usuario set
                                        login  = '${usuario.login}',
                                        senha = md5('${usuario.senha}') where id = ${usuario.id}
                                         `;
     
    const result = await prisma.$executeRawUnsafe (sql);
    
        if (result) {
            return true;
        }else
            return false;
    
        } catch (error) {
            return false;
        }
}

const deleteUser = async (id) => {

    try {

        let sql = `delete from tbl_usuario
                                where id = '${id}'`;

                                console.log(sql)

 const result = await prisma.$executeRawUnsafe (sql);
    
// verifica se o script foi executado com sucesso no BD
    if (result) {
        return true;
    }else
        return false;
                                
    } catch (error) {
        return false;
    }
                            
}

const selectUserById = async function (id) {


                let sql = `select  
                                       id,
                                        login,
                                        senha
                                            from tbl_usuario
                                                  where id = ${id}`;
    const rsUser = await prisma.$queryRawUnsafe(sql)

    if (rsUser.length > 0)
        return rsUser;
    else 
        return false;
}

const selectAllUsers = async () => {

    const sql = `select id, login from tbl_usuario order by id desc`

    const dados = await prisma.$queryRawUnsafe(sql)

    if (dados.length > 0) {
        return dados
    } else{
        return false
    }
}

const autenticateUser = async (user) => {

    const sql = `select login, id from tbl_usuario where senha = md5('${user.senha}') and login = '${user.login}'`

    const result = await prisma.$queryRawUnsafe(sql)

    if (result.length > 0) {
        return result
    } else{
        return false
    }
}

const searchLogin = async (login) => {

    const sql = `select * from tbl_usuario where login = '${login}'`

    const result = await prisma.$queryRawUnsafe(sql)

    if (result.length > 0) {
        return true
    } else{
        return false
    }
}
module.exports = {
    selectAllUsers,
    insertUser,
    deleteUser,
    selectUserById,
    updateUser,
    autenticateUser,
    searchLogin
}