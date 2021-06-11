'use strict';

module.exports = function(app){
	var controller = app.controllers.usuario;

	// Utilizando sistema de rotas
	app.route('/usuario')
		.get(controller.listaTodos)
		.post(controller.salvaUsuario);
	app.route('/usuario/:id')
		.get(controller.obtemUsuario)
		.put(controller.updateUsuario)
		.delete(controller.removeUsuario);
};
