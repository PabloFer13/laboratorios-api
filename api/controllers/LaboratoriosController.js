/**
 * LaboratoriosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res){
    try {
      const { nombre, nombreCorto, encargado } = req.allParams();

      let errorString = 'Missing fields:';
      let reqErr = false;
      
      if(!nombre || nombre === ''){
        errorString = `${errorString} nombre`;
        reqErr = true;
      }

      if(!nombreCorto || nombreCorto === ''){
        errorString = `${errorString} nombreCorto`;
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

      const laboratorio = Laboratorios.create({
        nombre,
        nombreCorto,
        encargado: encargado || 0,
        createdAt: moment().format(),
        updatedAt: moment().format()
      })

      res.created({ laboratorio });

    } catch (err) {
      res.handle(err);
    }
  }

};

