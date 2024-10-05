const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const session = require('express-session')

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}));

require('dotenv').config();
app.use(flash());

const indexRouter = require("./routes/index-router")
const hisaabRouter = require("./routes/hisaab-router")
const userModel = require("./models/user-model")
const hisaabModel = require("./models/hisaab-model");
const Database = require("./config/mongoose-connection")
const middleware = require("./middlewares/auth-middleware")

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(hisaabRouter);

app.use('/', indexRouter)
app.use('/', hisaabRouter)

app.listen(3000)