'use stricts';

module.exports = function(app) {
	var controller = app.controllers.sistemaSeguranca;
	
	app.route('/sistemaSeguranca')
		.get(controller.listaSistemaSeguranca)
		.post(controller.salvaSistemaSeguranca);
	
	app.route('/sistemaSeguranca/:id')
		.get(controller.obtemSistemaSeguranca)
		.put(controller.updateSistemaSeguranca)
		.delete(controller.removeSistemaSeguranca);
};