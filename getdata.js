const axios = require('axios')
const getData = async () => {
  const { data } = await axios.get('https://mindicador.cl/api')
  const valorDolar = data.dolar.valor
  const valorEuro = data.euro.valor
  const valorUf = data.uf.valor
  const valorUtm = data.utm.valor
  return{valorDolar,valorEuro,valorUf,valorUtm}
}

module.exports = getData
