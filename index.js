const customExpress = require('./config/customExpress')
const connection = require('./infraestructure/conexao')
const Tables = require('./infraestructure/tabelas')
const chalk = require('chalk')

connection.connect((err) => {
  if (err) console.log(err)

  Tables.init(connection)

  const app = customExpress()
  app.listen(3000, () =>
    console.log(chalk.bold.green('server is running on port 3000'))
  )
})
