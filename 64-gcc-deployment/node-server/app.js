const pry = require('pryjs')
const Dragon = require('./models/Dragon')
const io = require('socket.io')()


io.on('connection', socket => {
    // console.log(socket)
    socket.on('dragons.index', respond => {
        Dragon.findAll()
            .then( dragons => {
                respond(dragons)
            })
    })

    socket.on('dragons.update', async params => {
        let dragon = await Dragon.findByPk(params.id)
        await dragon.update(params)
        let dragons = await Dragon.findAll()
        io.emit('dragons.update', dragons)
    })


   
})



io.listen(8080)






const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/dragons', (req, res) => {
    Dragon.findAll()
        .then( dragons => {
            res.json(dragons)
        })
})

app.get('/dragons/:id', (req, res) => {
    Dragon.findByPk(req.params.id)
        .then( dragon => {
            res.json(dragon)
        })
})

app.patch('/dragons/:id', async (req, res) => {
    let dragon = await Dragon.findByPk(req.params.id)
    console.log(req.body)
    dragon.update(req.body)
})


app.listen(3001)

// eval(pry.it)