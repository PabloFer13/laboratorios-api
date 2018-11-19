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

  },

  async find(req, res){
    try {
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

      const materias = await Materias.find({
        or: [
          { nombre: searchString },
          { clave: searchString },
        ],
      });

      res.success({ materias });
    } catch (err) {
      res.handle(err);
    }
  },

  async get(req, res){
    try {
      const { id } = req.allParams();
      const materia = await Materias.findOne({ id });
      res.success({ materia });
    } catch (err) {
      res.handle(err);
    }
  },

  async update(req,res) {
    try {
      const { id, nombre, clave } = req.allParams();
      if(!nombre && !clave || (nombre ==='' && clave === '')){
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

      if(clave){
        update.clave = clave;
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
      

      const materia = await Materias.updateOne({ id }).set({ status: 2 });

      res.success({ materia });
    } catch (err) {
      res.handle(err);
    }
  }

};

