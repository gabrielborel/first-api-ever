const moment = require('moment')

const connection = require('../infraestructure/conexao')

class Atendimento {
  adiciona(atendimento, res) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

    const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
    const clienteEhValido = atendimento.cliente.length >= 7

    const validacoes = [
      {
        nome: 'data',
        valido: dataEhValida,
        mensagem: 'Data deve ser maior ou igual a data atual'
      },
      {
        nome: 'cliente',
        valido: clienteEhValido,
        mensagem: 'O nome do cliente deve ter pelomenos cinco caracteres'
      }
    ]

    const erros = validacoes.filter(campo => !campo.valido)
    const existemErros = erros.length

    if (existemErros) {
      res.status(400).json(erros)
    } else {
      const atendimentoDatado = {...atendimento, dataCriacao, data}

      const sql = 'INSERT INTO Atendimentos SET ?'

      connection.query(sql, atendimentoDatado, (err, result) => {
        if (err) res.status(400).json(err)

        res.status(201).json(atendimento)
      })
    }
  }

  lista(res) {
    const sql = 'SELECT * FROM Atendimentos'
    connection.query(sql, (err, results) => {
      if (err) res.status(400).json(err)

      res.status(200).json(results)
    })
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

    connection.query(sql, (err, results) => {
      const atendimento = results[0]
      if (err) res.status(400).json(err)

      res.status(200).json(atendimento)
    })
  }

  altera(id, valores, res) {
    if (valores.data) valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

    connection.query(sql, [valores, id], (err, results) => {
      if (err) res.status(400).json(err)

      res.status(200).json({...valores, id})
    })
  }

  deleta(id, res) {
    const sql = 'DELETE FROM Atendimentos WHERE id=?'

    connection.query(sql, id, (err, results) => {
      if (err) res.status(400).json(res)

      res.status(200).json({id})
    })
  }
}

module.exports = new Atendimento