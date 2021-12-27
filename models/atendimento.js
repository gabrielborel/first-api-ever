const connection = require('../infraestructure/conexao')

class Atendimento {
  adiciona(atendimento) {
    const sql = 'INSERT INTO Atendimentos SET ?'

    connection.query(sql, atendimento, (err, res) => {
      if (err) console.log(err)

      console.log(res)
    })
  }
}

module.exports = new Atendimento