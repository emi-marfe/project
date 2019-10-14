const PORT = 3000

var express = require('express')
var app = express()
var mysql = require('mysql')
var myConnection = require('express-myconnection')
var bodyparser = require('body-parser')

var config = require('./db')
var dbOptions = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.db
}

var routes = require('./routes/index')
var publicDir = (__dirname + '/public/');

app.use(express.static(publicDir))
app.use(myConnection(mysql, dbOptions, 'pool'))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use("/", routes)
app.listen(PORT, () => {
    console.log('Backend running on Port' + PORT)
})