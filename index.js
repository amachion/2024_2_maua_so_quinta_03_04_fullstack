const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

//get http://localhost:3000/oi
app.get('/oi', (req, res) => {
    res.send('oi')
})

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

app.listen (3000, () => console.log("server up & running"))