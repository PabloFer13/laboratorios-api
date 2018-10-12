/**
 * Status.js
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
      columnName: 'id_status'
    },
    nombre: {
      type: 'string'
    },
    display: {
      type: 'string'
    },
    creator: {
      model: 'usuarios'
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
    usuarios: {
      collection: 'usuarios'
    },
    laboratorios: {
      collection: 'laboratorios'
    },
    notifs: {
      collection: 'notificaciones'
    },
    reservas: {
      collection: 'reservas'
    },
    materias: {
      collection: 'materias'
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

