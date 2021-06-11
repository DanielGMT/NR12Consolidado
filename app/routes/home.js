 'use strict';

module.exports = function(app){
	var controller = app.controllers.home;

	// Utilizando sistema de rotas
	app.route('/authenticate')
		.post(controller.authenticate);
	app.route('/password')
		.post(controller.password);
	app.route('/logout')
		.get(controller.logout);
};
