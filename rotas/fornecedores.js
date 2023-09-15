const express = require("express")
const connection = require("../database/connection")


module.exports = (app) => {
    const rotas = express.Router()


   
    //fornecedores

    rotas.get("/novarota1", (req, res) => {
        res.send("Nova rota para fornecedores")
    })
      
rotas.get('/fornecedores', (req, res) => {
    connection.query(
      'select * from fornecedor',
      (err, results, fields) => {
        if(err) console.log(err)
        res.send(results)
      }
    );
  })
  
  rotas.get('/fornecedores/:id_fornecedor', (req, res) => {
    var id_fornecedor  = req.params.id_fornecedor  
    connection.query(
      `select * from fornecedor where id_fornecedor = ${id_fornecedor }`,
      (err, results, fields) => {
        if(err) console.log(err)
        res.send(results)
      }
    );
  })
  
  rotas.post('/fornecedores',  (req, res) => {
    var razao = req.body.razao;
    var cpf_cnpj = req.body.cpf_cnpj;
    var contato = req.body.contato;
    var logradouro = req.body.logradouro || null;
    var cidade = req.body.cidade || null;
    var uf = req.body.uf || null;
    console.log(req.files)
    var sql = `INSERT INTO fornecedor(razao, cpf_cnpj, contato, logradouro, cidade, uf) 
      VALUES(
        "${razao}", 
        "${cpf_cnpj}", 
        "${contato}", 
        "${logradouro}", 
        "${cidade}", 
        "${uf}")`;
  
     connection.query(sql, (erro, resultado) =>{
        if(erro) res.send(erro)
          res.send(resultado)
      })
    })
  
    rotas.patch('/fornecedores/:id_fornecedor', (req, res) => {
    var id_fornecedor = req.params.id_fornecedor;
    var razao = req.body.razao;
    var cpf_cnpj = req.body.cpf_cnpj;
    var contato = req.body.contato;
    var logradouro = req.body.logradouro || null;
    var cidade = req.body.cidade || null;
    var uf = req.body.uf || null;
    var sql = `
      UPDATE fornecedor SET 
        razao="${razao}", 
        cpf_cnpj="${cpf_cnpj}", 
        contato="${contato}", 
        logradouro="${logradouro}", 
        cidade="${cidade}", 
        uf="${uf}" 
      WHERE id_fornecedor=${id_fornecedor}`;
  
     connection.query(sql, (erro, resultado) =>{
        if(erro) res.send(erro)
        res.send(resultado)
     })
  })
  
  rotas.post('/fornecedores_delete/:id_fornecedor', (req, res) => {
    var id_fornecedor  = req.params.id_fornecedor  
    connection.query(
      `DELETE FROM fornecedor WHERE id_fornecedor = ${id_fornecedor}`,
      (err, results, fields) => {
        if(err) console.log(err)
        res.send(results)
      }
    );
  })
    app.use("/", rotas)  
}


