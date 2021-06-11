'use strict'

module.exports = function(app){
  var controller =app.controllers.normaTecnica;

  app.route('/normaTecnica')
    .get(controller.listaTodos)
    .post(controller.salvaNormaTecnica);

  app.route('/normaTecnica/:id')
    .get(controller.obtemNormaTecnica)
    .put(controller.updateNormaTecnica)
    .delete(controller.removeNormaTecnica);
}
