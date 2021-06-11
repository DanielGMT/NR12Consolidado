'use strict';

module.exports = function(app){
	var controller = app.controllers.maquina;

	// Utilizando sistema de rotas
	app.route('/maquina')
		.get(controller.listaTodos)
		.post(controller.salvaMaquina);
	app.route('/maquina/:id')
		.get(controller.obtemMaquina)
		.put(controller.updateMaquina)
		.delete(controller.removeMaquina);
};
