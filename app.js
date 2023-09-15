const express = require('express')
const app = express()

const port = 3002
const moment = require('moment');
const bodyParser = require('body-parser');
const formData = require("express-form-data")
const fs = require("fs")
app.use(formData.parse())
app.use(bodyParser.urlencoded({extended: true}));

require("./rotas/clientes")(app)
require("./rotas/fornecedores")(app)

app.get('/', function(req, res, next) {
  res.send("Backend Eduardo Almeida...");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
