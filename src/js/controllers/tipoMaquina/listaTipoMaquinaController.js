(function() {
	'use strict';

	angular.module('myApp').controller('listaTipoMaquinaController', Controller);

	Controller.$inject=['TipoMaquinaFactory'];

	function Controller(TipoMaquinaFactory){

		var self = this;

		self.tiposMaquinas = [];

		self.filtro = '';

		self.init = function(){
			buscaTipoMaquina();
		};

		function buscaTipoMaquina(){
			TipoMaquinaFactory.get().then(function(resp){

				if(resp.data){
					self.tiposMaquinas = resp.data;
					//console.log(self.tiposMaquinas);
				}
			});
		}
		self.remove = function(tipoMaquina){
		  bootbox.confirm({
			  size: 'small',
			  message: "Deseja deletar este tipo de maquina ?",
			  callback: function(confirma){
					if (confirma){
							TipoMaquinaFactory.remove(tipoMaquina.id)
							.then(function(data){
								buscaTipoMaquina();
							});
						}
				 }
 			});
		};

		self.init();
	}
})();
