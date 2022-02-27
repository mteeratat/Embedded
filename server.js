const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Mod = require('./Model')

mongoose.connect('mongodb+srv://test:1234@cluster0.zltoe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true
},)

mongoose.connection.on('error', err => {
    console.error('MongoDB error', err)
})

app.use(express.json())

app.listen(process.env.PORT || 9000, () => {
    console.log('Application is running on http://127.0.0.1:9000/')
})

app.get('/embedded', async (req, res) => {
    const { name } = req.query
    console.log(name)
    const db = await Mod.findOne({name: name})

    res.json(db)
    console.log(db)
    console.log(db.name + 10)
})

app.put('/embedded', async (req, res) => {
    const { name } = req.query
    const payload = req.body
    const db = await Mod.findOneAndUpdate({name: name}, {$set: payload})

    res.json(db)
    console.log(db)
    console.log(payload)
})

app.post('/embedded', async (req, res) => {
    const payload = req.body
    const db = new Mod(payload)
    await db.save()

    res.json(payload)
    console.log(payload)
})