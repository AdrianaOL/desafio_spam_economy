const url = require('url')
const http = require('http')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const mailer = require('./mailer')
const getData = require('./getdata')
http
  .createServer(async (req, res) => {
    let { correos, asunto, contenido } = url.parse(req.url, true).query
    if (req.url === '/') {
      res.setHeader('content-type', 'text/html')
      fs.readFile('index.html', 'utf8', (err, data) => {
        res.end(data)
      })
    }
    if (req.url.startsWith('/mailing')) {
      if (correos) {
        const mensaje = await getData()
        mailer(correos.split(','), asunto, contenido + mensaje).then((data)=>{
          console.log(data)
          fs.writeFile(
            `./correos/${uuidv4()}.txt`,
            `${contenido + mensaje}`,
            (err) => {
              if (err) console.log(err)
              else console.log('Archivo creado!')
            }
          )
         
        }).catch((err)=>{res.end(`error al enviar correo: ${err}`)})
      } else {
        res.end('Debes ingresar algun correo de destino')
      }
      
      res.end('correo enviado exitosamente!') 
    }
  })
  .listen(3000)
