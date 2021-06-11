'use stricts';

module.exports = function(app) {
	var controller = app.controllers.risco;
	
	app.route('/risco')
		.get(controller.listaRisco)
		.post(controller.salvaRisco);
	
	app.route('/risco/:id')
		.get(controller.obtemRisco)
		.put(controller.updateRisco)
		.delete(controller.removeRisco);
};