const express = require('express')
const http = require('http');
const { ExpressPeerServer } = require('peer')
const app = express()
const server = http.createServer(app)

const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/myapp'
})

app.use('/', peerServer)

server.listen(3001)