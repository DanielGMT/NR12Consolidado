(function(){
	'use strict';
	
	angular.module('myApp').controller('listaRiscoController', Controller);
	
	Controller.$inject=['RiscoFactory'];
	
	function Controller(RiscoFactory){ 

		var self = this;
		
		self.riscos = [];

		self.filtro = '';
		
		self.init = function(){
			buscaRiscos();	
		};	

		function buscaRiscos(){
			RiscoFactory.get().then(function(resp){
				if(resp.data){
					self.riscos = resp.data;
				}
			});	
		}
	
		self.remove = function(risco){

			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar esse Risco?",
				callback: function(confirma){
					if (confirma) {
						RiscoFactory.remove(risco.id)
							.then(function(data){
								buscaRiscos();
							
							}).catch(function(erro){
								console.log(erro);
							}
						);
					}
				}
			});
		};

		self.init();
	};
})();
	