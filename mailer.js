const nodemailer = require('nodemailer')
// Paso 1
function enviar(to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'oviedolopezadriana13@gmail.com',
      pass: '6070380717',
    },
  })
  let mailOptions = {
    from: 'oviedolopezadriana13@gmail.com',
    to,
    subject,
    text,
  }
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log(err)
    if (data) console.log(data)
  })
}
// Paso 2
module.exports = enviar
