 'use strict';

module.exports = function(app){
	var controller = app.controllers.laudo;
	// Utilizando sistema de rotas
	app.route('/laudo')
		.get(controller.listaTodos)
		.post(controller.salvaLaudo);
	app.route('/laudo/:id')
		.get(controller.obtemLaudo)
		.put(controller.updateLaudo)
		.delete(controller.removeLaudo);
  app.route('/relatorio/:id')
		.get(controller.geraPdf);
    app.route('/confirma')
        .put(controller.confirma);
    app.route('/aprova')
        .put(controller.aprova);

};
