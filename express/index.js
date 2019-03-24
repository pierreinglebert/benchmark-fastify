'use strict'

const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const payload = JSON.parse(fs.readFileSync('30k.json'))

app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Something broke!');
});
  
app.post('/', (req, res) => {
    // const players = ctx.request.body
    const filename = Math.floor(Math.random() * 10000000000) + 1 + '.txt'
    fs.writeFile(filename, req.body, (err) => {
        if (err) throw err;
        fs.unlink(filename, (err) => {
            if (err) throw err;
            res.json(req.body[0])
        })
    })
})

app.get('/foo/:id', (req, res, next) => {
    res.json(payload)
})

app.get('/bar/foo/:id', (req, res) => {
    
})

app.get('/bar/bar/:id', (req, res) => {
    
})

app.get('/bar/:id', (req, res) => {
    res.sendFile('/src/30k.json')
})

app.listen(80, '0.0.0.0', function () {})
  