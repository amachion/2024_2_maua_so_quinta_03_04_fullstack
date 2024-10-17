const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { MongoGCPError } = require('mongodb')
const app = express()
app.use(express.json())
app.use(cors())

const Filme = mongoose.model ("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))

async function conectarAoMongoDB() {
    await mongoose.connect(`mongodb+srv://pro_mac:mongo_123@cluster0.skf8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)    
}

let filmes = [
    {
        titulo: "Oppenheimer",
        sinopse: "O físico J. Robert Oppenheimer trabalha com uma equipe de cientistas durante o Projeto Manhattan, levando ao desenvolvimento da bomba atômica."
    },
    {
        titulo: "Divertidamente 2",
        sinopse: "Com um salto temporal, Riley se encontra mais velha, passando pela tão temida adolescência. Junto com o amadurecimento, a sala de controle também está passando por uma adaptação para dar lugar a algo totalmente inesperado: novas emoções."
    }
]

app.get('/filmes', (req, res) => {
    res.json(filmes)
})

app.post('/filmes', (req, res) => {
    //capturar as informações enviadas
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //montar um objeto json filme com as informações capturadas
    const novo_filme = {titulo: titulo, sinopse: sinopse}
    //acrescentar o novo filme à base
    filmes.push(novo_filme)
    //para ilustrar, mostrar a base atualizada
    res.json(filmes)
})

app.listen (3000, () => {
    try {
        conectarAoMongoDB()
        console.log("server up & running e conexão com BD OK")
    }
    catch (e) {
        console.log ('erro de conexão', e)
    }
})