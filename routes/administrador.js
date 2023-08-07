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
    const usuarios = await sql`select * from administrador`
    res.status(200).send(usuarios)
})

// router.get('/:idUsuario/', async(req, res) => {
//     const id_usuario = req.params.idUsuario
//     const id_pedido = await sql`select id from administrador where user_id = ${id_usuario} and finalizado = false`

//     const allTenis = await sql`select tenis_id from pedido_tenis where pedido_id = ${id_pedido}`

//     let tenis

//     if (allTenis === null) {
//         tenis = 'carrinho esta vazio'
//         res.status(200).send(tenis)
//     }else{
//         for (let i = 0; i <= allTenis.length; i++) {
//             // const element = array[i]
//             tenis = await sql`select * from tenis where id = ${allTenis[i]}`
//         }
//     }

//     res.status(200).send(tenis)
// })

router.get('/:id', async(req, res) => {
    const id = req.params.id
    const administrador = await sql`select * from administrador where id = ${id}`
    if(administrador.length === 0){
        res.status(400).send('Administrador nao existe')
    }else{
        res.status(200).send(administrador)
    }
})

router.post('/', async(req, res) => {
    // const { pagamento, total, user_id, tenis_id, finalizado } = req.body
    const usuario = await sql`insert into administrador(username, login, senha) values('tobias', 'tobis', '123')`
    // const novoTenis = await sql`insert into pedido(pagamento, total, user_id, tenis_id, finalizado) values('${pagamento}', ${total}, ${user_id}, ${tenis_id}, ${finalizado});`
    res.status(201).send({
        mensagem: 'Administrador cadastrado com sucesso'
    })
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id
    await sql`delete from administrador where id = ${id}`
    res.status(200).send({
        mensagem: 'deletado com sucesso'
    })
})

router.put('/:id', async(req, res) => {
    const id = req.params.id
    const administradorAtt = req.body
    const banco = await sql`select * from administrador where id = ${id}`

    if(banco !== null){
        if(administradorAtt.username !== undefined){
            banco[0].username = administradorAtt.username
        }
        if(administradorAtt.login !== undefined){
            banco[0].login = administradorAtt.login
        }
        if(administradorAtt.senha !== undefined){
            banco[0].senha = administradorAtt.senha
        }


        await sql`update administrador set username = ${banco[0].username}, login = ${banco[0].login}, senha = ${banco[0].senha} where id = ${id}`

        res.status(200).send('atualizado com sucesso')
    }else{
        res.status(500).send('id invalido, mande um id existente')
    }
})

module.exports = router
