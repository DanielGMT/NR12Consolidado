'use strict';

module.exports = function(app){
	var controller = app.controllers.tipoMaquina;

	//app.get('/tiposMaquinas', controller.listaTipoMaquina);
	//app.delete('/tiposMaquinas/:_id', controller.remove);
	app.route('/tipoMaquina')
		.get(controller.listaTodos)
		.post(controller.salvaTipoMaquina);

	app.route('/tipoMaquina/:id')
		.delete(controller.removeTipoMaquina)
		.get(controller.obtemTipoMaquina)
		.put(controller.updateTipoMaquina);

};
