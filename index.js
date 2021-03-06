const express = require('express')
const path = require('path')

console.log("Teste1")

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

console.log("Teste2")

const PORT = process.env.PORT || 3231

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) => {
    res.render('index.html')
})

console.log("Teste3")


let messages = []

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)

    socket.emit('previousMessage', messages)

    socket.on('sendMessage', data => {
        // console.log(data)
        messages.push(data)

        socket.broadcast.emit('receivedMessage', data)
    })
})

server.listen(3000, 'https://sendmessage.vercel.app')