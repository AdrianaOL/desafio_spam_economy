const url = require('url')
const http = require('http')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const enviar = require('./mailer')
const getData = require('./getdata')
http
  .createServer(async (req, res) => {
    let { correos, asunto, contenido } = url.parse(req.url, true).query
    if (req.url == '/') {
      res.setHeader('content-type', 'text/html')
      fs.readFile('index.html', 'utf8', (err, data) => {
        res.end(data)
      })
    }
    if (req.url.startsWith('/mailing')) {
      const {valorDolar,valorEuro,valorUf,valorUtm} = await getData()
      const mensaje = `\nEl valor del dolar el dia de hoy es : ${valorDolar}\nEl valor del euro el dia de hoy es : ${valorEuro}\nEl valor del UF el dia de hoy es : ${valorUf}\nEl valor del UTM el dia de hoy es : ${valorUtm}`
      if (correos) {
        enviar(correos.split(','), asunto, contenido + mensaje)
        fs.writeFile(`./correos/${uuidv4()}.txt`, `${contenido + mensaje}`, (err) => {
          if (err) console.log(err)
          else console.log('Archivo creado!')
        })
        res.end('Correo enviado exitosamente!')
      } else {
        res.end('Debes ingresar algun correo de destino')
      }
    }
  })
  .listen(3000)
