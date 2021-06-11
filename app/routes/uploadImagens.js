'use strict';

module.exports = function(app){
	var controller = app.controllers.uploadImagens;

	// Utilizando sistema de rotas
	app.route('/upload')
		.post(controller.upload);
};
