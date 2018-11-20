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

      if(!encargado || encargado === 0){
        errorString = `${errorString} Encargado`
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
        encargado: encargado,
      })

      res.created({ laboratorio });

    } catch (err) {
      res.handle(err);
    }
  },

  async find(req, res){
    try{
      const { searchString } = req.allParams();
      
      if(!searchString && searchString !== ''){
        const err = {
          status: 400,
          err: {
            message: errorString,
            error: 'Bad Request'
          }
        };
        throw err;
      }

      const laboratorios = await Laboratorios.find({
        or: [
          { nombre: searchString },
          { nombreCorto: searchString },
        ],
      });

      res.success({ laboratorios });

    }catch(err){
      res.handle(err);
    }
  },

  async get(req, res){
    try {
      const { id } = req.allParams();
      const laboratorio = await Laboratorios.findOne({ id });
      res.success({ laboratorio });
    } catch (err) {
      res.handle(err);
    }
  },

  async update(req,res) {
    try {
      const { id, nombre, nombreCorto } = req.allParams();
      if(!nombre && !nombreCorto || (nombre ==='' && nombreCorto === '')){
        const err = {
          status: 400,
          err: {
            message: 'Nada que alterar',
            error: 'Bad Request'
          }
        };
        throw err;
      }

      const update = {};

      if(nombre){
        update.nombre = nombre;
      }

      if(nombreCorto){
        update.nombreCorto = nombreCorto;
      }

      const laboratorio = await Laboratorios.updateOne({ id }).set({ ...update });

      res.success({ laboratorio });
    } catch (err) {
      res.handle(err);
    }
  },

  async delete(req,res) {
    try {
      const { id } = req.allParams();
      

      const laboratorio = await Laboratorios.updateOne({ id }).set({ status: 2 });

      res.success({ laboratorio });
    } catch (err) {
      res.handle(err);
    }
  }

};

