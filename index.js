const express = require('express')
const db = require('./db/connectDB')
const { json } = require('express')
const mainRoute = require('./src/routes/mainRoute')
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())
app.use(mainRoute)

const PORT = process.env.PORT || '3002'

app.get('/', (req,resp)=>{
    resp.send('Hello Sequelize!!')
})

db.authenticate()
    .then(()=>{
        console.log('Connection has been established successfully.');
    }).catch((err)=>{
        console.error('Unable to connect to the database:' + err);
    })

app.listen(PORT,()=>{
    console.log(`The app is running at : ${PORT}`)
})


