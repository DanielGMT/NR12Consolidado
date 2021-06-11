'use strict';

module.exports = function(app){
	var controller = app.controllers.tipoDispositivo;

	// Utilizando sistema de rotas
	app.route('/tipoDispositivo')
		.get(controller.listaTodos)
		.post(controller.salva);
	app.route('/tipoDispositivo/:id')
		.get(controller.obtemItem)
		.put(controller.updateItem)
		.delete(controller.removeItem);
};
