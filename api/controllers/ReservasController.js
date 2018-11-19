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
    } = req.AllParams();
    
    const fechaInicio = moment(rawfechaInicio, 'DD/MM/YYYY');
    const fechaFinal = moment(rawfechaFinal, 'DD/MM/YYYY');
    const horaInicio = moment(rawhoraInicio, 'HH:mm');
    const horaFinal = moment(rawhoraFinal,'HH:mm');

    const validDateType = sails.helpers.validateType.with({
      fechaInicio,
      fechaFinal,
      horaInicio,
      horaFinal
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
          '>=': fechaInicio
        },
        fechaFinal: {
          '<=': fechaFinal
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
      fechaInicio: fechaInicio.format('DD/MM/YYYY'),
      fechaFinal: fechaFinal.format('DD/MM/YYYY'),
      horaInicio: horaInicio.format('HH:mm'),
      horaFinal: horaFinal.format('HH:mm'),
      dia,
      laboratorio,
      materia,
      solicitante,
      maestro,
      status: tipo === 1 ? 4 : 3,
    });

    res.created({ reserva });

  }

};

