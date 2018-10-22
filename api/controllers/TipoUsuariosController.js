const moment = require('moment');
/**
 * TipoUsuariosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res){
    try {
      const { nombre, display, permisos } = req.allParams();
      
      let errorString = 'Missing fields';
      let reqErr = false;
      sails.log('Pasa a validar')
      if(!permisos){
        errorString = `${errorString} permisos`;
        reqErr = true;
      }
      sails.log('Pasa a validar 2')
      if(!nombre || nombre == ''){
        errorString = `${errorString} nombre`;
        reqErr = true;
      }
      sails.log('Pasa a validar 3')
      if(!display || display == ''){
        errorString = `${errorString} display`;
        reqErr = true;
      }
      sails.log('Pasa a validar 4')
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
      sails.log('llega');
      const tipo = await TipoUsuarios.create({
        nombre,
        display,
        permisos,
        createdAt: moment().format(),
        updatedAt: moment().format()
      }).fetch();
      sails.log('acaba de crear', tipo)
      sails.log(tipo);
      res.created({ tipo });

    } catch (err) {
      res.handle(err);
    }
  }

};

