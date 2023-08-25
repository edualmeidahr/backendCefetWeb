const express = require('express')
const app = express()
const mysql = require('mysql2');
const port = 3002
const bodyParser = require("body-parser")
const moment = require("moment")

app.use(bodyParser.urlencoded({extended : true}))

const connection = mysql.createConnection({
  host: 'aulascefet.c8tuthxylqic.sa-east-1.rds.amazonaws.com',
  user: 'aluno',
  database: 'aulas_web',
  password : 'alunoc3f3t',
});

app.get('/', (req, res) => {
  res.send(`Backend Eduardo Rodando...`);
})

app.get('/cliente/:id_cliente', (req, res) => {
  var id_cliente = req.params("id_cliente")
  connection.query (
    'select * from cliente where id_cliente = "$(id_cliente)"',
    (err, results, fields) => {
      if(err) console.log(err)
      res.send(results)
    }
  );
})

app.get('/cliente/:email', (req, res) => {
  var email = req.params("email")
  connection.query (
    'select * from cliente where email = "$(email))"',
    (err, results, fields) => {
      if(err) console.log(err)
      res.send(results)
    }
  );
})

app.post('/cliente/:id_cliente', (req, res) => {
  var id_cliente = req.params("id_cliente")
  connection.query (
    'select * from cliente where id_cliente = "$(id_cliente)"',
    (err, results, fields) => {
      if(err) console.log(err)
      res.send(results)
    }
  );
})

app.post('/cliente', (req, res) => {
  var nome = req.body.nome
  var sobrenome = req.body.sobrenome
  var email = req.body.email
  var data_cadastro  = moment().format("yyyy-mm-dd")
  var salario = req.body.salario
  var sql = 'insert into cliente(nome, sobrenome, email, data_cadastro, salario) '+
  'values("$(nome)", "$(sobrenome)", "$(email)", "$(data_cadastro"), $(salario))'
    connection.query(sql, (erro, resultado) => {
      if(erro)  res.send(erro)
      res.send(resultado)
    })
  })

  app.path('/cliente', (req, res) => {
    var sql = 'update cliente set nome = "JoaoAula", '+
    'sobrenome = "SilvaAula", email = "outro@outro.com, '+
    'salario = 2500 where id cliente =56'
      connection.query(sql, (erro, resultado) => {
        if(erro)  res.send(erro)
        res.send(resultado)
      })
    })
  



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})