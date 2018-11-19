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
      if(!nombre || nombre === ''){
        errorString = `${errorString} name`;
        reqErr = true;
      }
      if(!tipo || tipo === 0){
        errorString = `${errorString} type`;
        reqErr = true;
      }
      if(!apellido || apellido === ''){
        errorString = `${errorString} lastName`;
        reqErr = true;
      }
      if(!email || email === ''){
        errorString = `${errorString} email`;
        reqErr = true;
      }
      if(!passString || passString === ''){
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
  },
  async update(req, res){
    try {
      const {
        id,
        email,
        name: nombre,
        type: tipo,
        status,
        apellidoPaterno,
        apellidoMaterno,
        password: passString
      } = req.allParams();

      let params = {
        email,
        nombre,
        tipo,
        apellido,
        status,
        password: ''
      }

      let par = 7;

      if(!email || email === ''){
        delete params.email;
        par = par - 1;
      }
      if(!nombre || nombre === ''){
        delete params.nombre;
        par = par - 1;
      }
      if(!tipo || tipo < 1){
        delete params.tipo;
        par = par - 1;
      }
      if(!apellido || apellido === ''){
        delete params.apellido;
        par = par - 1;
      }
      if(!status || status < 1){
        delete params.status;
        par = par - 1;
      }
      if(!passString || passString === ''){
        delete params.password;
        par = par - 1;
      }else{
        params.password = sails.helpers.encryptPassword(passString)
      }

      if(par < 1){
        const error = {
          code: 400,
          message: 'Bad Request, nothing to update'
        }
        throw error;
      }

      await Usuarios.update({ id }).set({ ...params });
      const user = await Usuarios.find({ id })
        .populate('tipo')
        .populate('status');
      res.success({ user });

    } catch (err) {
      res.handle(err);
    }
  },
  async delete(req, res){
    try {
      const { id } = req.allParams();
      
      await Usuarios.update({ id }).set({ status: 2 });

      res.ok();

    } catch (err) {
      res.handle(err);
    }
  },
  async find(req, res){
    try {
      const { id } = req.allParams();
      const user = await Usuarios.findOne({ id })
        .populate('status')
        .populate('tipo');
      res.success(user);
    } catch (err) {
      res.handle(err);
    }
  },
  async get(req, res) {
    try {
      const {
        nombre,
        apellido,
        status,
        email,
        tipo,
        carrera,
        academia
      } = req.allParams();
      
      let params = {};

      if(nombre){
        params.nombre = {
          like: `%${nombre}%`
        };
      }

      if(apellido){
        params.apellido = {
          like: `%${apellido}%`
        };
      }

      if(status){
        params.status = status;
      }

      if(email){
        params.email = {
          like: `%${email}%`
        };
      }

      const ors = Object.keys(params).map(item => {
        return { [item]: params[item] }
      })

      sails.log(ors)

      const rawUsers = await Usuarios.find(Object.keys(params).length === 0 ? {} : {
        or: ors });
      const users = rawUsers.map(item => {
        delete item.password;
        return { ...item };
      })

      res.success(users);

    } catch (err) {
      res.handle(err)
    }
  }
};

