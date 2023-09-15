const express = require("express")

const connection = require("../database/connection")

module.exports = (app) => {
    const rotas = express.Router()

    rotas.get("/novarota", (req, res) => {
        res.send("Nova rota para clientes")
    })
      
     rotas.get('/clientes', function(req, res, next) {
        connection.query(
          'select * from cliente',
          (err, results, fields) => {
            if(err) 
              console.log(err)
            res.send(results)
          }
        );
      });
      
      rotas.get('/clientes/:id_cliente', function(req, res, next) {
        var idCliente = req.params['id_cliente'];
        connection.query(
          `select * from cliente where id_cliente = ${+idCliente}`,
          (err, results, fields) => {
            if(err) 
              console.log(err)
            res.send(results)
          }
        );
      });
      
      rotas.get('/clientes_email/:email', function(req, res, next) {
        var email = req.params['email'];
        var sql =  `select * from cliente where email = "${email}"`;
        console.log(sql)
        connection.query(
          sql,
          (err, results, fields) => {
            if(err) 
              console.log(err)
            console.log(results)
            if(results.length > 0)
              res.send({existe: true})
            else 
              res.send({existe: false})
          }
        );
      });
      
      rotas.post('/clientes', function(req, res, next) {
        var nome = req.body.nome;
        var sobrenome = req.body.sobrenome;
        var email = req.body.email;
        var salario = +req.body.salario;
      
        console.log(req.files)
      
        var sql = `insert into cliente(nome, sobrenome,` +
        `email, data_cadastro, salario) values ("${nome}", "${sobrenome}", ` +
        `"${email}", "${moment().format("YYYY-MM-DD")}", ${salario})`
        // if(nome != undefined && sobrenome != undefined && email != undefined && salario != undefined){
          connection.query(
            sql, (erro, resultados, fields) => {
              if(erro)
                res.send(erro)
      
              var caminhoTemp = req.files.avatar.path;
              var type = req.files.avatar.type.split('/');
              var caminhoNovo = `./uploads/clientes/cliente${resultados.insertId}.${type[type.length - 1]}`;
      
              fs.copyFile(caminhoTemp, caminhoNovo, (err) => {
                console.log(err)
                res.send(resultados)
              });
            }
          )
        // }
      });
      
      rotas.post('/clientes_del/:id_cliente', function(req, res, next) {
        var idCliente = req.params['id_cliente'];
        connection.query(
          `delete from cliente where id_cliente = ${+idCliente}`,
          (err, results, fields) => {
            if(err) 
              console.log(err)
            res.send(results)
          }
        );
      });
      
      rotas.patch('/clientes/:id_cliente', function(req, res, next) {
        var nome = req.body.nome;
        var sobrenome = req.body.sobrenome;
        var email = req.body.email;
        var salario = +req.body.salario;
        var idCliente = +req.params.id_cliente;
        var sql = `
        update cliente set nome = "${nome}", sobrenome = "${sobrenome}", ` +
        `email = "${email}", salario = ${salario} where id_cliente = ${idCliente}`
        connection.query(
          sql, (erro, resultados, fields) => {
            if(erro)
              res.send(erro)
            res.send(resultados)
          }
        )
      });
      app.use("/",rotas)
}