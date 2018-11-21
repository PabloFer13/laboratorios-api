const moment = require('moment');
/**
 * ReservasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res){
    const {
      tipo,
      fechaInicio: rawfechaInicio,
      fechaFinal: rawfechaFinal,
      horaInicio: rawhoraInicio,
      horaFinal: rawhoraFinal,
      dia,
      laboratorio,
      materia,
      solicitante,
      maestro,
    } = req.allParams();
    
    const fechaInicio = moment(rawfechaInicio, 'DD/MM/YYYY');
    const fechaFinal = moment(rawfechaFinal, 'DD/MM/YYYY');
    const horaInicio = moment(rawhoraInicio, 'HH:mm');
    const horaFinal = moment(rawhoraFinal,'HH:mm');

    const validDateType = sails.helpers.validateType.with({
      fechaInicio: fechaInicio.format('DD/MM/YYYY'),
      fechaFinal: fechaFinal.format('DD/MM/YYYY'),
      horaInicio: horaInicio.format('HH:mm'),
      horaFinal: horaFinal.format('HH:mm'),
    });

    if(!validDateType){
      const err = {
        err: {
          message: 'Invalid date and/or hour'
        },
        status: 404
      }
      throw err;
    }

    const reservas = await Reservas.find({
      where: {
        status: 1,
        dia,
        fechaInicio: {
          '>=': fechaInicio.format('DD/MM/YYYY')
        },
        fechaFinal: {
          '<=': fechaFinal.format('DD/MM/YYYY')
        },
      }
    });

    const filteredReservas = reservas.filter(item => {
      const { horaInicio: hI, horaFinal: hF } = item;
      const parsedIni = moment(hI, 'HH:00');
      const parsedFin = moment(fI, 'HH:00');
      let flag = false;
      if(horaInicio.isBetween(parsedIni, parsedEnd, 'minute', '[]')) flag = true;
      if(horaFinal.isBetween(parsedIni, parsedEnd, 'minute', '[]')) flag = true;

      return flag;
    });

    if(filteredReservas.length !== 0){
      const err = {
        err: {
          message: 'Laboratorio No Disponible',
        },
        status: 501
      }
      throw err;
    }

    // TODO: create notification\
    
    const reserva = await Reservas.create({
      tipo,
      fechaInicio: fechaInicio.format('YYYY/MM/DD'),
      fechaFinal: fechaFinal.format('YYYY/MM/DD'),
      horaInicio: horaInicio.format('HH:mm'),
      horaFinal: horaFinal.format('HH:mm'),
      dia,
      laboratorio,
      materia,
      solicitante,
      maestro,
      status: tipo === 1 ? 4 : 3,
    }).fetch();

    const lab = await Laboratorios.findOne({ id: laboratorio });

    await Laboratorios.addToCollection(laboratorio, 'reservas').members([reserva.id]);

    res.created({ reserva });

  },

  async update(req, res){
    try{
      const { status, id, comments = '' } = req.allParams();

      const reserva = await Reservas.updateOne({ id }).set({
        status,
        comments,
      });

      res.success({ reserva });
    }catch(err){
      res.handle(err);
    }
  },

  async delete(req, res){
    try{
      const { id } = req.allParams();

      const reserva = await Reservas.updateOne({ id }).set({ status: 2 });

      res.success({ reserva });
    }catch(err){
      res.handle(err);
    }
  },

  async find(req, res){
    try {
      const { laboratorio, status } = req.allParams();

      const filters = {};

      if(laboratorio) filters.laboratorio = laboratorio;
      if(status) filters.status = status;

      const reservas = await Reservas.find({ ...filters });

      res.success({ reservas });
    } catch (err) {
      res.handle(err);
    }
  },

  async get(req, res){
    try {
      const { id } = req.allParams();

      const reserva = Reservas.findOne({ id });
      res.success({ reserva });
    } catch (err) {
      res.handle(err);
    }
  },

  async delete(req, res){
    try {
      const { id } = req.allParams();

      const reserva = await Reservas.updateOne({ id }).set({ status: 2 });

      res.success({ reserva });
    } catch (err) {
      res.handle(err);
    }
  }

};
