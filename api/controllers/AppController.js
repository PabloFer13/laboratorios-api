const name = 'Reserva Laboratorios API';
const version = '0.0.1';
module.exports = {
  index(req, res){
    res.ok({ name, version });
  },
  login (req, res) {
    // TODO: Log In Controller
  }
}