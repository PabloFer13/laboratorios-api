const moment = require('moment');
/**
 * StatusController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res){
    try {
      const {
        nombre,
        display,
        categoria
      } = req.allParams();

      let errorString = 'Missing fields:';
      let reqErr = false;
      
      if(!nombre || nombre === ''){
        errorString = `${errorString} nombre`;
        reqErr = true;
      }

      if(!display || display === ''){
        errorString = `${errorString} display`;
        reqErr = true;
      }

      // if(!categoria || categoria === 0){
      //   errorString = `${errorString} categoria`;
      //   reqErr = true;
      // }
      
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

      const status = await Status.create({
        nombre,
        display,
        categoria,
        // createdAt: moment().format(),
        // updatedAt: moment().format()
      }).fetch();

      res.created({ status });

    } catch (err) {
      sails.log(err);
      res.handle(err);
    }
  },

  async find(req, res) {
    try {
      const { nombre } = req.allParams();
      const filtro = nombre ? { nombre } : {};

      const status = Status.find(filtro);

      res.success({ status });
    } catch (err) {
      res.handle(err);
    }
  }
};

