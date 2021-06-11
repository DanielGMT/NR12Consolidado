'use strict';

module.exports = function(app){
	var controller = app.controllers.pergunta;

	// Utilizando sistema de rotas
	app.route('/pergunta')
		.get(controller.listaTodos)
		.post(controller.salva);
	app.route('/pergunta/:id')
		.get(controller.obtemPergunta)
		.put(controller.update)
		.delete(controller.remove);
};
