/**
 * Reservas.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    id: {
      type: 'number',
      unique: true,
      autoIncrement: true,
      columnName: 'id_reserva'
    },
    tipo: {
      type: 'string'
    },
    fechaInicio: {
      type: 'string',
      columnType: 'date',
      columnName: 'fecha_inicio'
    },
    fechaFinal: {
      type: 'string',
      columnType: 'date',
      columnName: 'fecha_final'
    },
    horaInicio: {
      type: 'string',
      columnType: 'time',
      columnName: 'hora_inicio'
    },
    horaFinal: {
      type: 'string',
      columnType: 'time',
      columnName: 'hora_final'
    },
    dia: {
      type: 'string'
    },
    laboratorio: {
      model: 'laboratorios'
    },
    materia: {
      model: 'materias'
    },
    solicitante: {
      model: 'usuarios'
    },
    maestro: {
      model: 'usuarios'
    },
    status: {
      model: 'status'
    },
    comments: {
      type: 'string'
    },
    createdAt: {
      columnName: 'created_at',
      type: 'string',
      columnType: 'datetime'
    },
    updatedAt: {
      columnName: 'updated_at',
      type: 'string',
      columnType: 'datetime'
    },
    

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

