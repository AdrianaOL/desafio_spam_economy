const axios = require('axios')
const getData = async () => {
  const { data } = await axios.get('https://mindicador.cl/api')
  const valorDolar = data.dolar.valor
  const valorEuro = data.euro.valor
  const valorUf = data.uf.valor
  const valorUtm = data.utm.valor
  return  `\nEl valor del dolar el dia de hoy es : ${valorDolar}\nEl valor del euro el dia de hoy es : ${valorEuro}\nEl valor del UF el dia de hoy es : ${valorUf}\nEl valor del UTM el dia de hoy es : ${valorUtm}`
 
  
}

module.exports = getData
