/**
 * MateriasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res){
    try {
      const { nombre, clave } = req.allParams();
    
      let errorString = 'Missing fields:';
      let reqErr = false;
      
      if(!nombre || nombre === ''){
        errorString = `${errorString} nombre`;
        reqErr = true;
      }

      if(!clave || clave === ''){
        errorString = `${errorString} clave`;
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

      const materia = Materias.create({
        nombre,
        clave,
        createdAt: moment().format(),
        updatedAt: moment().format()
      })

      res.created({ materia });

    } catch (err) {
      res.handle(err);
    }

  }

};

