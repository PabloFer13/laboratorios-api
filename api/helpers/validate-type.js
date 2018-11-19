const moment = require('moment');

module.exports = {


  friendlyName: 'Validate type',


  description: '',


  inputs: {
    fechaInicio: {
      type: 'string',
      example: '01/01/2000',
      description: 'First date in range',
      required: true
    },
    fechaInicio: {
      type: 'string',
      example: '01/01/2000',
      description: 'Last date in range',
      required: true
    },
    horaInicio: {
      type: 'string',
      example: '22:00',
      description: 'Begin of reservation time',
      required: true,
    },
    horaFinal: {
      type: 'string',
      example: '22:00',
      description: 'End of reservation time',
      required: true,
    },
  },


  exits: {
    success: {
      outputFreindlyName: 'Validate DAte and hours',
      outputDescription: 'Validates values and formats of the dates and times'
    }
  },

  sync: true,


  fn: function (inputs, exits) {
    const {
      fechaInicio,
      fechaFinal,
      horaInicio,
      horaFinal
    } = inputs;

    const fI = moment(fechaInicio, 'DD/MM/YYYY');
    const fF = moment(fechaFinal, 'DD/MM/YYYY');
    const hI = moment(horaInicio, 'HH:mm');
    const hF = moment(horaFinal, 'HH:mm');

    if(fI.isAfter(fF) || hI.isSameOrAfter(hF))
      exits.success(false);

    
    // All done.
    return exits.success(true);

  }


};

