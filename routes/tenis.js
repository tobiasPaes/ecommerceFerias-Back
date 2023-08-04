const express = require('express')
const router = express.Router()

/* ---- banco ---- */
const postgres = require('postgres');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const sql = postgres(URL, { ssl: 'require' });

// ------- //

router.get('/', async(req, res) => {
    const catalogo = await sql`select * from tenis`
    res.status(200).send(catalogo)
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    const tenis = await sql`select * from tenis where id = ${id}`
    res.status(200).send(tenis)
})

router.post('/', async(req, res) => {
    // const { tamanho, marca, modelo, cor, valor, img } = req.body
    const tenis = await sql`insert into tenis(tamanho, marca, modelo, cor, valor) values(42, 'vans', 'aql', 'preto', 240.00)`
    // const novoTenis = await sql`insert into tenis(tamanho, marca, modelo, cor, valor) values('${tamanho}', '${marca}', '${modelo}', '${cor}', ${valor}, '${img}');`
    res.status(201).send({
        mensagem: 'Tenis cadastrado com sucesso'
    })
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id
    const query = await sql`delete from tenis where id = ${id}`
    res.status(200).send({
        mensagem: 'deletado com sucesso'
    })
})

router.put('/:id', async(req, res) => {
    const id = req.params.id
    const tenisAtt = req.body
    const banco = await sql`select * from tenis where id = ${id}`

    if(banco !== null){
        if(tenisAtt.tamanho !== undefined){
            banco[0].tamanho = tenisAtt.tamanho
        }else{
            banco[0].tamanho = null
        }
        if(tenisAtt.marca !== undefined){
            banco[0].marca = tenisAtt.marca
        }else{
            banco[0].marca = null
        }
        if(tenisAtt.modelo !== undefined){
            banco[0].modelo = tenisAtt.modelo
        }else{
            banco[0].modelo = null
        }
        if(tenisAtt.cor !== undefined){
            banco[0].cor = tenisAtt.cor
        }else{
            banco[0].cor = null
        }
        if(tenisAtt.valor !== undefined){
            banco[0].valor = tenisAtt.valor
        }else{
            banco[0].valor = null
        }
        if(tenisAtt.img !==  undefined){
            banco[0].img = tenisAtt.img
        }else{
            banco[0].img = null
        }

        const tenisAtual = await sql`update tenis set tamanho = ${banco[0].tamanho}, marca = ${banco[0].marca}, modelo = ${banco[0].modelo}, cor = ${banco[0].cor}, valor = ${banco[0].valor}, img = ${banco[0].img} where id = ${id}`

        res.status(200).send('atualizado com sucesso')
    }else{
        res.status(500).send('id invalido, mande um id existente')
    }
})

module.exports = router
