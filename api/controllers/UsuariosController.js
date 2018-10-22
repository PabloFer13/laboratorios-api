/**
 * UsuariosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require('moment');

module.exports = {
  async create(req, res) {
    try {
      const { name: nombre, type: tipo, lastName: apellido, email, password: passString } = req.allParams();
      let errorString = 'Missing fields:';
      let reqErr = false;
      if(!nombre){
        errorString = `${errorString} name`;
        reqErr = true;
      }
      if(!tipo){
        errorString = `${errorString} type`;
        reqErr = true;
      }
      if(!apellido){
        errorString = `${errorString} lastName`;
        reqErr = true;
      }
      if(!email){
        errorString = `${errorString} email`;
        reqErr = true;
      }
      if(!passString){
        errorString = `${errorString} password`;
        reqErr = true;
      }
      if(reqErr){
        const err = {
          status: 400,
          err: {
            message: errorString,
            error: 'Bad Request'
          }
        };
        throw err;
      }
      const password = sails.helpers.encryptPassword(passString);
      const user = await Usuarios.create({
        nombre,
        apellido,
        tipo,
        email,
        password,
        status: 1,
        createdAt: moment().format(),
        updatedAt: moment().format()
      }).fetch();
      const token = sails.helpers.generateToken.with({
        id: user.id,
        email: user.email,
        login: moment().format(),
        key: sails.config.session.secret
      });
      res.created({ user, token });
    } catch (err) {
      res.handle(err);
    }
  }
};

