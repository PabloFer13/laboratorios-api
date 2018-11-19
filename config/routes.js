/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'get /': 'AppController.index',
  'post /usuarios': 'UsuariosController.create',
  'post /login': 'AppController.login',
  'post /user-types': 'TipoUsuariosController.create',

  'put /usuarios': 'UsuariosController.update',
  'delete /usuarios/:id': 'UsuariosController.delete',
  'get /usuarios/:id': 'UsuariosController/find',
  'get /usuarios': 'UsuariosController.get',
  
  'get /user-types': 'TipoUsuariosController.find',

  'get /reservation-types': 'TipoReservasController.all',
  'post /reservation-types': 'TipoReservasController.create',

  'post /status': 'StatusController.create',
  'get /status': 'StatusController.find',

  'post /reservations': 'ReservasController.create',
  'put /reservations/:id': 'ReservasController.update',
  'delete /reservations/:id': 'ReservasController.delete',
  'get /reservations': 'ReservasController.find',
  'get /reservations/:id': 'ReservasController.get',

  'post /materias': 'MateriasController.create',
  'get /materias': 'MateriasController.find',
  'get /materias/:id': 'MateriasController.get',
  'put /materias/:id': 'MateriasController.update',
  'delete /materias/:id': 'MateriasController.delete',

  'post /laboratorios': 'LaboratoriosController.create',
  'get /laboratorios': 'LaboratoriosController.find',
  'get /laboratorios/:id': 'LaboratoriosController.get',
  'put /laboratorios/:id': 'LaboratoriosController.update'
  'delete /laboratorios/:id': 'LaboratoriosController.delete',

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝



  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
