(function() {
	'use strict';

	angular.module('myApp').controller('listaPerigoController', Controller);
	
	Controller.$inject=['PerigoFactory'];
	
	function Controller(PerigoFactory){

		var self = this;
		self.perigos = [];
		self.filtro = '';
		
		self.init = function(){
			buscaPerigos();
		};

		function buscaPerigos(){
			PerigoFactory.get().then(function(resp){
				if (resp.data){
					self.perigos = resp.data;
				}
			});
		}

		self.remove = function(perigo){

			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar esse Perigo?",
				callback: function(confirma){
					if (confirma) {
						PerigoFactory.remove(perigo.id)
							.then(function(data){
								buscaPerigos();
							
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
