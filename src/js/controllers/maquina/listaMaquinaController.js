(function() {
	'use strict';

	angular.module('myApp').controller('listaMaquinaController', Controller);

	Controller.$inject=['MaquinaFactory'];

	function Controller(MaquinaFactory){

		var self = this;

		self.maquinas = [];

		self.filtro = '';

		self.init = function(){
			buscaMaquinas();
		};

		function buscaMaquinas(){
			MaquinaFactory.get().then(function(resp){
				if(resp.data){
					self.maquinas = resp.data;
				}
			});
		}

		self.remove = function(cliente){
			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar essa máquina?",
				callback: function(confirma){
					if (confirma) {
						MaquinaFactory.remove(cliente.id)
							.then(function(data){
								buscaMaquinas();
							});
					}
				}
			});
		};

		self.init();
	}
})();
