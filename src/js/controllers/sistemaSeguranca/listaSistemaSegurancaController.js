(function(){
	'use strict';
	
	angular.module('myApp').controller('listaSistemaSegurancaController', Controller);
	
	Controller.$inject=['SistemaSegurancaFactory'];
	
	function Controller(SistemaSegurancaFactory){ 

		var self = this;
		
		self.sistemasSeguranca = [];

		self.filtro = '';
		
		self.init = function(){
			buscaSistemasSeguranca();	
		};	

		function buscaSistemasSeguranca(){
			SistemaSegurancaFactory.get().then(function(resp){
				if(resp.data){
					self.sistemasSeguranca = resp.data;
				}
			});	
		}
	
		self.remove = function(sistemaSeguranca){

			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar esse sistema de segurança?",
				callback: function(confirma){
					if (confirma) {
						SistemaSegurancaFactory.remove(sistemaSeguranca.id)
							.then(function(data){
								buscaSistemasSeguranca();
							
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
	