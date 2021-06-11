'use strict';

module.exports = function(app){
	var controller = app.controllers.limiteMaquina;


	app.route('/limiteMaquina')
		.get(controller.listaTodos)
		.post(controller.salvaLimiteMaquina);

	app.route('/limiteMaquina/:id')
		.delete(controller.removeLimiteMaquina)
		.get(controller.obtemLimiteMaquina)
		.put(controller.updateLimiteMaquina);

};
