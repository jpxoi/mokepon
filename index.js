const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const players = []

class Player {
    constructor(id) {
        this.id = id
    }

    assignMokepon(mokepon) {
        this.mokepon = mokepon
    }

    updatePosition(x, y) {
        this.x = x
        this.y = y
    }

    assignAttacks(attacks) {
        this.attacks = attacks
    }
}

class Mokepon {
    constructor(name) {
        this.name = name
    }
}

app.get('/join', (req, res) => {
    const id = `${Math.random()}`

    const player = new Player(id)

    players.push(player)

    res.setHeader('Access-Control-Allow-Origin', '*')

    res.send(id)
})

app.post("/mokepon/:playerid", (req, res) => {
    const playerid = req.params.playerid || ""
    const name = req.body.mokepon || ""
    const mokepon = new Mokepon(name)
    
    const playerIndex = players.findIndex((player) => playerid === player.id)

    if (playerIndex >= 0) {
        players[playerIndex].assignMokepon(mokepon)
    }
    
    console.log(players)
    console.log(playerid)
    res.end()
})

app.post("/mokepon/:playerid/position", (req, res) => {
    const playerid = req.params.playerid || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const playerIndex = players.findIndex((player) => playerid === player.id)

    if (playerIndex >= 0) {
        players[playerIndex].updatePosition(x, y)
    }

    const enemies = players.filter((player) => playerid != player.id)

    res.send({
        enemies
    })
})

app.post("/mokepon/:playerid/attacks", (req, res) => {
    const playerid = req.params.playerid || ""
    const attacks = req.body.attacks || ""

    const playerIndex = players.findIndex((player) => playerid === player.id)

    if (playerIndex >= 0) {
        players[playerIndex].assignAttacks(attacks)
    }

    res.end()
})

app.get("/mokepon/:playerid/attacks", (req, res) => {
    const playerid = req.params.playerid || ""
    const player = players.find((player) => player.id === playerid)

    res.send({
        attacks: player.attacks || []
    })
})

app.listen(8080, () => {
    console.log("Inicializando servidor...")
    console.log("Encriptando la conexión...")
    console.log("Verificando credenciales de la red ARC...")
    console.log("...")
    console.log("Servidor funcionando")
})