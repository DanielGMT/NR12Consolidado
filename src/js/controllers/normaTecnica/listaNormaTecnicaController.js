(function() {
	'use strict';

	angular.module('myApp').controller('listaNormaTecnicaController', Controller);

	Controller.$inject=['NormaTecnicaFactory'];

	function Controller(NormaTecnicaFactory){

		var self = this;

		self.normasTecnicas = [];

		self.filtro = '';

		self.init = function(){
			buscaNormasTecnicas();
		};

		function buscaNormasTecnicas(){
			NormaTecnicaFactory.get().then(function(resp){
				if(resp.data){
					self.normasTecnicas = resp.data;
				}
			});
		}
		self.remove = function(normaTecnica){
				bootbox.confirm({
				size: 'small',
				message: 'Deseja deletar essa norma técnica?',
				callback: function(confirma){
					if(confirma){
						NormaTecnicaFactory.remove(normaTecnica.id)
						.then(function(data){
							buscaNormasTecnicas();
						});
					}
				}
			});
		};
			self.init();
		}
	})();
