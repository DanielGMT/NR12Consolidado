'user strict'

module.exports = function(app){
	var controller = app.controllers.configuracoes;

	app.route('/disposicoesFinais')
	.get(controller.listaDisposicoesFinais)
	.put(controller.updateDisposicoesFinais);

	app.route('/portaria')
	.get(controller.listaPortaria)
	.put(controller.updatePortaria);

	app.route('/dispositivo')
	.get(controller.listaDispositivo)
	.put(controller.updateDispositivo);

	app.route('/respTecnica')
	.get(controller.listaRespTecnica)
	.put(controller.updateRespTec);

};
