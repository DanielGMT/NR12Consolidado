(function() {
	'use strict';

	angular.module('myApp').controller('listaDisposicoesFinaisController', Controller);

	Controller.$inject=['DisposicoesFinaisFactory'];

	function Controller(DisposicoesFinaisFactory){

		var self = this;

		//self.portarias = [];

		//self.filtro = '';

		self.init = function(){
			buscaDisposicaoFinal();
		};

		function buscaDisposicaoFinal(){
			DisposicoesFinaisFactory.get().then(function(resp){
				console.l
				if(resp.data){
					self.disposicaofinal = resp.data;
				}
			});
		};

		self.init();
	}

})();
