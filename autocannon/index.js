'use strict'

// Il faut faire X scénario et les tourner sur chaque server

const autocannon = require('autocannon')
// const Url = require('url')
const fs = require('fs')

const payload = fs.readFileSync('30k.json')

async function bench(opts) {
    const res = await new Promise((res, rej) => autocannon(opts, (err, result) => err? rej(err): res(result)))
    console.log(res)
    return {
        requests: {
            mean: res.requests.mean,
            stddev: res.requests.stddev
        },
        latency: {
            mean: res.latency.mean,
            stddev: res.latency.stddev
        }
    }
}

const duration = 20

async function scenario_1(hostname) {
    const url = new URL('http://localhost/foo/50')
    url.hostname = hostname
    return await bench({
        url: url.toString(),
        method: 'GET',
        connections: 20,
        pipelining: 1,
        duration: duration,
        excludeErrorStats: true,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// post json
async function scenario_2(hostname) {
    const url = new URL('http://localhost/')
    url.hostname = hostname
    return await bench({
        url: url.toString(),
        method: 'POST',
        connections: 20,
        pipelining: 1,
        duration: duration,
        excludeErrorStats: true,
        headers: {
            'Content-Type': 'application/json'
        },
        body: payload
    })
}

// stream
async function scenario_3(hostname) {
    const url = new URL('http://localhost/bar/50')
    url.hostname = hostname
    return await bench({
        url: url.toString(),
        method: 'GET',
        connections: 20,
        pipelining: 1,
        duration: duration,
        excludeErrorStats: true,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

async function start() {
    const res = {}
    const hosts = ['express', 'koa', 'fastify']
    for(const host of hosts) {
        res[host] = res[host] || {}
        res[host]['scenario_1'] = await scenario_1(host)
        // res[host]['scenario_2'] = await scenario_2(host)
        // res[host]['scenario_3'] = await scenario_3(host)
    }
    console.log(require('util').inspect(res, {depth: null}))
}

start('koa')
.catch(console.log)


// Benchmarks : 

// 1er benchmark avec lecture d'un fichier JSON de 200Ko et envoie en tant que réponse
// avec parsing des headers

// 2eme benchmark avec POST et écriture sur disque du body des requetes

// 5eme benchmark avec du static