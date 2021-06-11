'use stricts';

module.exports = function(app){
	var controller = app.controllers.perigo;
	
	app.route('/perigo')
		.get(controller.listaPerigo)
		.post(controller.salvaPerigo);
	
	app.route('/perigo/:id')
		.get(controller.obtemPerigo)
		.put(controller.updatePerigo)
		.delete(controller.removePerigo);
}