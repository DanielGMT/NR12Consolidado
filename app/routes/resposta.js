'use strict';

module.exports = function(app){
	var controller = app.controllers.resposta;

	// Utilizando sistema de rotas
	app.route('/resposta')
		.get(controller.listaTodos)
		.post(controller.salva);
	app.route('/resposta/:id')
		.get(controller.obtemResposta)
		.put(controller.update)
		.delete(controller.remove);
};
