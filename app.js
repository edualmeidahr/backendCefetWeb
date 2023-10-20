const express = require('express')
const app = express()

const port = 3002
const moment = require('moment');
const cors = require("cors")
const bodyParser = require('body-parser');
const formData = require("express-form-data")
const fs = require("fs")
app.use(formData.parse())
app.use(bodyParser.urlencoded({extended: true}));

var corsOptions = {
  origin: 'http://127.0.0.1:5501',
  optionsSuccessStatus: 200 
}

app.use(express.static('uploads'))
app.use(cors())


require("./rotas/clientes")(app)
require("./rotas/fornecedores")(app)

app.get('/', function(req, res, next) {
  res.send("Backend Eduardo Almeida...");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
