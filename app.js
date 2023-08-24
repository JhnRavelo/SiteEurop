const express = require ('express')
const {join} = require ('path')
const {exec} = require ('child_process')
require('dotenv').config()
const db = require('./Database/models')
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const cors = require('cors')
const session = require('./session/index.js')
const app = express()
app.use(cors())
app.use(session())


app.use(express.static(__dirname + '/public'))
app.use('/build/', express.static(join(__dirname, 'node_modules/three/build')))
// app.use('/gsap/', express.static(join(__dirname, 'node_modules/gsap')))
app.use('/jsm/', express.static(join(__dirname, 'node_modules/three/examples/jsm')))

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, ()=>{
        console.log(`http://127.0.0.1:${process.env.PORT}`)
    })
})

const userRoutes = require('./routes/Users.js')
app.use('/auth', userRoutes)

const trakerRoutes = require('./routes/Trakers.js')
app.use('/traker', trakerRoutes)

const pageRoutes = require('./routes/Pages.js')
app.use('/page', pageRoutes)