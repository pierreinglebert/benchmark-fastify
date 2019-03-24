'use strict'

const fs = require('fs')
const payload = JSON.parse(fs.readFileSync('30k.json'))

const fastify = require('fastify')({
    logger: false
})

fastify.post('/', async (request, reply) => {
    const players = request.body
    const filename = Math.floor(Math.random() * 10000000000) + 1 + '.txt'
    await new Promise((res, rej) => fs.writeFile(filename, players, (err) => err? rej(err): res()))
    await new Promise((res, rej) => fs.unlink(filename, (err) => err? rej(err): res()))
    return players[0]
})

fastify.get('/foo/:id', async(request, reply) => {
    reply.type('application/json').code(200)
    return payload
})


fastify.get('/bar/foo/:id', async(request, reply) => {
    
})

fastify.get('/bar/bar/:id', async(request, reply) => {
    
})

fastify.get('/bar/:id', async(request, reply) => {
    return reply.sendFile('30k.json')
})

fastify.listen(process.env.PORT || 80, '0.0.0.0', (err, address) => {
    if (err) throw err
})