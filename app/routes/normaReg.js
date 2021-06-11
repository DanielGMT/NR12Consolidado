'use strict';

module.exports = function(app){
  var controller = app.controllers.normaReg;

  app.route('/normaRegulamentadora')
    .get(controller.listaTodos)
    .post(controller.salvaNormaReg);

  app.route('/normaRegulamentadora/:id')
    .delete(controller.removeNormaReg)
    .get(controller.obtemNormaReg)
    .put(controller.updateNormaReg);
};
