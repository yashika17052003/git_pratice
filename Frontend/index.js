const express = require('express')
const app = express()

app.use(express.static(__dirname+'/web'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/web/index.html")
})

app.listen(3000)