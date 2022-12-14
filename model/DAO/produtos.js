/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autora: Isabelle e Lidia
 * Data Criacao: 23/11/2022
 * Versao: 1.0
 *****************************************************************************************************************/


const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllPizzas = async () => {

    const sql = `select tbl_tamanho.nome as tamanho, tbl_produto.favoritos, tbl_produto.ativo as stat, round(tbl_produto_tamanho.preco, 2) as preco, tbl_produto_tamanho.desconto, tbl_produto.nome, tbl_produto.descricao, tbl_produto.imagem, tbl_tipo_pizza.tipo, tbl_produto.id as id_produto, round(tbl_produto_tamanho.preco - (tbl_produto_tamanho.preco / tbl_produto_tamanho.desconto), 2) as preco_desconto, tbl_pizza.id as id_pizza from tbl_produto
	inner join tbl_pizza on tbl_produto.id = tbl_pizza.id_produto
    inner join tbl_produto_tamanho on tbl_produto_tamanho.id_produto = tbl_produto.id
    inner join tbl_tamanho on tbl_tamanho.id = tbl_produto_tamanho.id_tamanho
    inner join tbl_tipo_pizza on tbl_tipo_pizza.id = tbl_pizza.id_tipo_pizza
    where tbl_produto.ativo = true;`

    const rsPizza = await prisma.$queryRawUnsafe(sql)

    if (rsPizza.length > 0) {
        return rsPizza
    } else{
        return false
    }
}

const selectAllBebidas = async () => {

    const sql = `select tbl_tamanho.nome as tamanho, tbl_produto.favoritos, tbl_produto.ativo as stat, round(tbl_produto_tamanho.preco,2) as preco, tbl_produto_tamanho.desconto, tbl_produto.nome, tbl_produto.descricao, tbl_produto.imagem, tbl_tipo_bebida.tipo, tbl_produto.id as id_produto, tbl_bebida.id as id_bebida, round(tbl_produto_tamanho.preco - (tbl_produto_tamanho.preco / tbl_produto_tamanho.desconto), 2) as preco_desconto, tbl_bebida.teor_alcoolico from tbl_produto
	inner join tbl_bebida on tbl_produto.id = tbl_bebida.id_produto
    inner join tbl_produto_tamanho on tbl_produto_tamanho.id_produto = tbl_produto.id
    inner join tbl_tamanho on tbl_tamanho.id = tbl_produto_tamanho.id_tamanho
    inner join tbl_tipo_bebida on tbl_tipo_bebida.id = tbl_bebida.id_tipo_bebida
    where tbl_produto.ativo = true;`

    const rsPizza = await prisma.$queryRawUnsafe(sql)

    if (rsPizza.length > 0) {
        return rsPizza
    } else{
        return false
    }
}

const insertProduto = async (produto) => {

    try{

        const sql = `insert into tbl_produto(nome, descricao, imagem, ativo, favoritos)
                            values('${produto.nome}', '${produto.descricao}', '${produto.imagem}', true, 0)`

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

const updateProduto = async (produto) => {

     try {
        
        const sql = `update tbl_produto set nome = '${produto.nome}', descricao = '${produto.descricao}', imagem = '${produto.imagem}' where id = ${produto.id_produto}`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }else{
            return false
        }

     } catch (error) {
        return false
     }
}

const updateTamanho = async (produto) => {

    try {
        
        const sql = `update tbl_produto_tamanho set preco = ${produto.preco}, desconto = ${produto.desconto} where id_produto = ${produto.id_produto} and id_tamanho = ${produto.id_tamanho}`

        const result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        } else{
            return false
        }

    } catch (error) {
        return false
    }
}

const deleteProduto = async (id) => {

    try {
        
        const sql = `delete from tbl_produto where id = ${id}`

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

const insertPizza = async (pizza) => {

    try {
        
        const sql = `insert into tbl_pizza(id_produto, id_tipo_pizza) 
                            values(${pizza.id_produto}, ${pizza.id_tipo_pizza})`

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

const updatePizza = async (pizza) => {

    try {
        
        const sql = `update tbl_pizza set id_produto = ${pizza.id_produto}, id_tipo_pizza = ${pizza.id_tipo_pizza} where id = ${pizza.id_pizza}`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const updateBebida = async (bebida) => {

    try {
        
        const sql = `update tbl_bebida set id_produto = ${bebida.id_produto}, id_tipo_bebida = ${bebida.id_tipo_bebida}, teor_alcoolico = ${bebida.teor_alcoolico} where id = ${bebida.id_bebida}`
        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }else{
            return false
        }


    } catch (error) {
        return false
    }
}

const insertBebida = async (bebida) => {

    try {
        
        const sql = `insert into tbl_bebida(id_produto, id_tipo_bebida, teor_alcoolico) 
                        values(${bebida.id_produto}, ${bebida.id_tipo_bebida}, ${bebida.teor_alcoolico})`


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

const selectPizzaById = async (id) => {

    const sql = `select tbl_produto.nome, tbl_produto.imagem, tbl_produto.descricao, tbl_produto_tamanho.desconto, tbl_produto.favoritos, round(tbl_produto_tamanho.preco, 2) as preco, tbl_tamanho.nome as tamanho, tbl_tamanho.id as id_tamanho, tbl_tipo_pizza.tipo, tbl_pizza.id as id_pizza, tbl_produto.id as id_produto, tbl_produto_tamanho.id as id_tamanho_pizza  
    from tbl_pizza 
        inner join tbl_produto on tbl_pizza.id_produto = tbl_produto.id 
        inner join tbl_produto_tamanho on tbl_produto_tamanho.id_produto = tbl_produto.id
        inner join tbl_tamanho on tbl_tamanho.id = tbl_produto_tamanho.id_tamanho
        inner join tbl_tipo_pizza on tbl_tipo_pizza.id = tbl_pizza.id_tipo_pizza 
    where tbl_pizza.id = ${id}`

    const rsPizza = await prisma.$queryRawUnsafe(sql)

    if(rsPizza.length > 0){
        return rsPizza
    } else{
        return false
    }
}

const selectBebidaById = async (id) => {

    const sql = `select tbl_produto.nome, tbl_produto.imagem, tbl_produto.descricao, tbl_produto_tamanho.desconto, tbl_produto.favoritos, round(tbl_produto_tamanho.preco, 2) as preco, tbl_tamanho.nome as tamanho, tbl_tamanho.id as id_tamanho, tbl_tipo_bebida.tipo, tbl_bebida.id as id_bebida, tbl_produto.id as id_produto, tbl_produto_tamanho.id as id_tamanho_bebida  
    from tbl_bebida 
        inner join tbl_produto on tbl_bebida.id_produto = tbl_produto.id 
        inner join tbl_produto_tamanho on tbl_produto_tamanho.id_produto = tbl_produto.id
        inner join tbl_tamanho on tbl_tamanho.id = tbl_produto_tamanho.id_tamanho
        inner join tbl_tipo_bebida on tbl_tipo_bebida.id = tbl_bebida.id_tipo_bebida
    where tbl_bebida.id = ${id};`

    const rsBebida = await prisma.$queryRawUnsafe(sql)

    if(rsBebida.length > 0){
        return rsBebida
    } else{
        return false
    }
}

const selectLastIdProduto = async () => {

    const sql = `select id from tbl_produto order by id desc limit 1`

    const result = await prisma.$queryRawUnsafe(sql)

    if (result) {
        return result[0].id
    } else{
        return false
    }
}

const selectFavoritos = async () => {

    const sql = `select tbl_produto.nome, tbl_produto.imagem, tbl_produto.descricao, tbl_produto_tamanho.desconto, tbl_produto.favoritos, round(tbl_produto_tamanho.preco, 2) as preco, tbl_tamanho.nome as tamanho
    from tbl_produto 
        inner join tbl_produto_tamanho on tbl_produto_tamanho.id_produto = tbl_produto.id
        inner join tbl_tamanho on tbl_tamanho.id = tbl_produto_tamanho.id_tamanho 
    where tbl_produto.favoritos > 0 and tbl_produto.ativo = true order by tbl_produto.favoritos desc limit 10
    `

    const rsFavoritos = await prisma.$queryRawUnsafe(sql)

    if (rsFavoritos.length > 0) {
        return rsFavoritos
    } else{
        return false
    }
}

const selectPromocoes = async () => {

    const sql = `select tbl_produto.nome, tbl_produto.imagem, tbl_produto.descricao, tbl_produto_tamanho.desconto, tbl_produto.favoritos, round(tbl_produto_tamanho.preco, 2) as preco, tbl_tamanho.nome as tamanho, round(tbl_produto_tamanho.preco - (tbl_produto_tamanho.preco / tbl_produto_tamanho.desconto), 2) as preco_desconto
    from tbl_produto 
        inner join tbl_produto_tamanho on tbl_produto_tamanho.id_produto = tbl_produto.id
        inner join tbl_tamanho on tbl_tamanho.id = tbl_produto_tamanho.id_tamanho 
    where tbl_produto_tamanho.desconto > 0 and tbl_produto.ativo = true order by tbl_produto_tamanho.desconto desc limit 20;`

    const rsPromocoes = await prisma.$queryRawUnsafe(sql)

    if (rsPromocoes.length > 0) {
        return rsPromocoes
    } else{
        return false
    }
}

const deletarProdutoUpdate = async (id, boolean) => {

    const sql = `update tbl_produto set ativo = ${boolean} where id = ${id}`

    const result = await prisma.$executeRawUnsafe(sql)

    if (result) {
        return true
    } else{
        return false
    }
}

const selectProdutoById = async (id) => {

    const sql = `select * from tbl_produto where id = ${id}`

    const result = await prisma.$queryRawUnsafe(sql)

    if (result.length > 0) {
        return result
    } else{
        return false
    }
}

const addFavorite = async (id, fav) => {

    const sql = `update tbl_produto set favoritos = ${fav + 1} where id = ${id}`

    const result = await prisma.$executeRawUnsafe(sql)

    if (result) { 
        return true
    } else{
        return false
    }
}

const getAllInativos = async (tipo) => {

    const sql = `select tbl_tamanho.nome as tamanho, tbl_produto.ativo as stat, tbl_produto.favoritos, round(tbl_produto_tamanho.preco,2) as preco, tbl_produto_tamanho.desconto, tbl_produto.nome, tbl_produto.descricao, tbl_produto.imagem, tbl_tipo_${tipo}.tipo, tbl_produto.id as id_produto, tbl_${tipo}.id as id_${tipo}, round(tbl_produto_tamanho.preco - (tbl_produto_tamanho.preco / tbl_produto_tamanho.desconto), 2) as preco_desconto from tbl_produto
	inner join tbl_${tipo} on tbl_produto.id = tbl_${tipo}.id_produto
    inner join tbl_produto_tamanho on tbl_produto_tamanho.id_produto = tbl_produto.id
    inner join tbl_tamanho on tbl_tamanho.id = tbl_produto_tamanho.id_tamanho
    inner join tbl_tipo_${tipo} on tbl_tipo_${tipo}.id = tbl_${tipo}.id_tipo_${tipo}
    where tbl_produto.ativo = false;`

    const result = await prisma.$queryRawUnsafe(sql)

    if (result.length > 0) {
        return result
    } else{
        return false
    }
}

module.exports = {
    selectAllPizzas,
    selectAllBebidas,
    selectLastIdProduto,
    insertPizza,
    insertProduto,
    deleteProduto,
    insertBebida,
    updatePizza,
    selectPizzaById,
    updateProduto,
    updateTamanho,
    selectBebidaById,
    updateBebida,
    selectFavoritos,
    selectPromocoes,
    deletarProdutoUpdate,
    selectProdutoById,
    addFavorite,
    getAllInativos
}