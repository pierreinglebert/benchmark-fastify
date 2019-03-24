'use strict'
const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

const payload = JSON.parse(fs.readFileSync('30k.json'))

app.use(bodyParser())

const router = new Router()

router.post('/', async (ctx) => {
    const players = ctx.request.body
    const filename = Math.floor(Math.random() * 10000000000) + 1 + '.txt'
    await new Promise((res, rej) => fs.writeFile(filename, players, (err) => err? rej(err): res()))
    await new Promise((res, rej) => fs.unlink(filename, (err) => err? rej(err): res()))
    ctx.body = players[0]
})

router.get('/foo/:id', async(ctx) => {
    ctx.body = payload
})


router.get('/bar/foo/:id', async() => {
    
})

router.get('/bar/bar/:id', async() => {
    
})

router.get('/bar/:id', async(ctx) => {
    ctx.body = fs.createReadStream('30k.json')
})


app.use(router.routes()).use(router.allowedMethods())

app.listen(process.env.PORT || 80)
