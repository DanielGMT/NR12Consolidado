 'use strict';

module.exports = function(app){
	var controller = app.controllers.capacitacao;

	// Utilizando sistema de rotas
	app.route('/capacitacao')
		.get(controller.listaTodos)
		.post(controller.salvaCapacitacao);
	app.route('/capacitacao/:id')
		.get(controller.obtemCapacitacao)
		.put(controller.updateCapacitacao)
		.delete(controller.removeCapacitacao);
};
