(function() {
	'use strict';

	angular.module('myApp').controller('listaLimiteMaquinaController', Controller);

	Controller.$inject=['LimiteMaquinaFactory'];

	function Controller(LimiteMaquinaFactory){

		var self = this;

		self.limitesMaquinas = [];

		self.filtro = '';

		self.init = function(){
			buscaLimiteMaquina();
		};

		function buscaLimiteMaquina(){
			LimiteMaquinaFactory.get().then(function(resp){

				if(resp.data){
					self.limitesMaquinas = resp.data;
					//console.log(self.limitesMaquinas);
				}
			});
		}
		self.remove = function(limiteMaquina){
		  bootbox.confirm({
			  size: 'small',
			  message: "Deseja deletar este limite de maquina ?",
			  callback: function(confirma){
					if (confirma){
							LimiteMaquinaFactory.remove(limiteMaquina.id)
							.then(function(data){
								buscaLimiteMaquina();
							});
						}
				 }
 			});
		};

		self.init();
	}
})();
