/**
 * CategoriasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res){
    try {
      const {
        nombre,
        display
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

      const categoria = Categorias.create({
        nombre,
        display,
      })

      res.created({ categoria });

    } catch (err) {
      res.handle(err);
    }
  }

};

