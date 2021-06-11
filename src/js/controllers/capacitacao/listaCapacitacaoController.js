(function() {
	'use strict';

	angular.module('myApp').controller('listaCapacitacaoController', Controller);

	Controller.$inject=['CapacitacaoFactory'];

	function Controller(CapacitacaoFactory){

		var self = this;

		self.capacitacoes = [];

		self.filtro = '';

		self.init = function(){
			buscaCapacitacoes();
		};

		function buscaCapacitacoes(){
			CapacitacaoFactory.get().then(function(resp){
				if(resp.data){
					self.capacitacoes = resp.data;
				}
			});
		}
		self.remove = function(capacitacao){
			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar essa Capacitação?",
				callback: function(confirma){
					if(confirma){
						CapacitacaoFactory.remove(capacitacao.id)
							.then(function(data){
								buscaCapacitacoes();
							});
					}
				}
			});
		};
		self.init();
	}
})();
