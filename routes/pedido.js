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
    const pedidos = await sql`select * from pedido`
    res.status(200).send(pedidos)
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    const pedido = await sql`select * from pedido where id = ${id}`
    if(pedido.length === 0){
        res.status(400).send('pedido nao existe')
    }else{
        res.status(200).send(pedido)
    }
})

router.post('/', async(req, res) => {
    // const { pagamento, user_id, tenis_id, finalizado } = req.body
    const pedido = await sql`insert into pedido(pagamento, user_id, tenis_id, finalizado) values('debito', 230.00, 2, 2, false)`
    // const novoTenis = await sql`insert into pedido(pagamento, user_id, tenis_id, finalizado) values('${pagamento}', ${user_id}, ${tenis_id}, ${finalizado});`

    const tenis = await sql``


    res.status(201).send({
        mensagem: 'Pedido cadastrado com sucesso'
    })
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id
    await sql`delete from pedido where id = ${id}`
    res.status(200).send({
        mensagem: 'deletado com sucesso'
    })
})

router.put('/:id', async(req, res) => {
    const id = req.params.id
    const pedidoAtt = req.body
    const banco = await sql`select * from pedido where id = ${id}`

    if(banco !== null){
        if(pedidoAtt.pagamento !== undefined){
            banco[0].pagamento = pedidoAtt.pagamento
        }
        if(pedidoAtt.total !== undefined){
            banco[0].total = pedidoAtt.total
        }
        if(pedidoAtt.user_id !== undefined){
            banco[0].user_id = pedidoAtt.user_id
        }
        if(pedidoAtt.tenis_id !== undefined){
            banco[0].tenis_id = pedidoAtt.tenis_id
        }
        if(pedidoAtt.finalizado !== undefined){
            banco[0].finalizado = pedidoAtt.finalizado
        }

        const pedidoAtual = await sql`update pedido set pagamento = ${banco[0].pagamento}, total = ${banco[0].total}, user_id = ${banco[0].user_id}, tenis_id = ${banco[0].tenis_id}, finalizado = ${banco[0].finalizado} where id = ${id}`

        res.status(200).send('atualizado com sucesso')
    }else{
        res.status(500).send('id invalido, mande um id existente')
    }
})

module.exports = router
