// import dependencies
import express from 'express'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import cors from 'cors'

import mongoMessages from './message_model.js'
// app config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
  appId: "1742747",
  key: "b8a800ed8bb78f45629c",
  secret: "c8ce5bff0e0d8a09e42f",
  cluster: "mt1",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});

// middlewares
app.use(express.json())
app.use(cors())

// db config
const mongoURI = "mongodb+srv://admin:22178922kb@cluster0.blxt77h.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
    console.log("DB connected")

    const changeStream = mongoose.connection.collection('messages').watch()
    changeStream.on('change', change => {
        pusher.trigger('messages', 'newMessage', {
            'change': change
        })
    })
})

// api routes
app.get('/', (req, res) => res.status(200).send('hello world'))

app.post('/save/messages', (req, res) => {
    const dbMessage = req.body

    mongoMessages.create(dbMessage)
    .then((data) => {
        res.status(201).send(data)
    })  
    .catch((err) => {
        res.status(500).send(err)
    })
})

app.get('/retrieve/conversation', (req, res) => {
    mongoMessages.find()
    .then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => {
        data.sort((b, a) => {
            return a.timestamp - b.timestamp
        })
        res.status(500).send(err)
    })
})

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`))