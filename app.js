const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')

require('dotenv').config();

const indexRouter = require("./routes/index-router")
const userModel = require("./models/user-model")
const hisaabModel = require("./models/hisaab-model");
const Database = require("./config/mongoose-connection")

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());



app.use('/', indexRouter)

app.listen(3000)