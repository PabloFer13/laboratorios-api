/**
 * Usuarios.js
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
      columnName: 'id_usuario'
    },
    nombre: {
      type: 'string'
    },
    apellido: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    foto: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    tipo: {
      model: 'tipoUsuarios'
    },
    celular: {
      type: 'string'
    },
    status: {
      model: 'status'
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
    laboratorios: {
      collection: 'laboratorios'
    },
    materias: {
      collection: 'materias'
    },
    reservas: {
      collection: 'reservas'
    },
    notifications: {
      collection: 'notificaciones',
      via: 'destino'
    },
    notifs: {
      collection: 'notificaciones',
      via: 'origen'
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

