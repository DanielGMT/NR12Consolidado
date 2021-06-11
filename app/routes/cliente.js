'use strict';

module.exports = function(app){
	var controller = app.controllers.cliente;

	// Utilizando sistema de rotas
	app.route('/cliente')
		.get(controller.listaTodos)
		.post(controller.salvaCliente);
	app.route('/cliente/:id')
		.get(controller.obtemCliente)
		.put(controller.updateCliente)
		.delete(controller.removeCliente);
};
