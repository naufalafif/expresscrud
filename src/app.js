const express = require('express'),
      app = express(),
      path = require('path'),
      hbs = require('hbs'),
      {port:APP_PORT=3000} = require('../config'),
      bodyParser = require('body-parser'),
      router = require('./router')

// Directory Settings
const PUBLIC_DIRECTORY_PATH = path.join(__dirname,'../public')
const TEMPLATE_DIRECTORY_PATH = path.join(__dirname,'../template')
const PARTIALS_DIRECTORY_PATH = path.join(__dirname,'../template/partials')

// General Settings
app.use(express.static(PUBLIC_DIRECTORY_PATH))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());  

// View Template Engine Settings
app.set('view engine','hbs')
app.set('views',TEMPLATE_DIRECTORY_PATH)
hbs.registerPartials(PARTIALS_DIRECTORY_PATH)

// Set Router
app.use(router)

app.listen(APP_PORT,()=>{
  console.log(`App starting at port ${APP_PORT}`);
})