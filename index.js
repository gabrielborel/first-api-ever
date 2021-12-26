const express = require('express')
const app = express()

app.listen(3000, console.log('server is running on port 3000'))

app.get('/', (req, res) => res.send('vc está na página principal'))

app.get('/carros', (req, res) => res.send('vc está na pagina de carros'))

app.get('/carros/sedan' ,(req, res) => res.send('vc está na página de carros -> sedan'))