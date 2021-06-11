(function() {
	'use strict';

	angular.module('myApp').controller('listaTipoDispositivoController', Controller);

	Controller.$inject=['TipoDispositivoFactory', '$rootScope'];

	function Controller(TipoDispositivoFactory, $rootScope){

		var self = this;

		self.filtro = '';

		self.tiposDispositivos = [];

		self.init = function(){
			buscaTiposDispositivos();
			console.log($rootScope);
		};

		function buscaTiposDispositivos(){
			TipoDispositivoFactory.get().then(function(resp){
				if(resp.data){
					self.tiposDispositivos = resp.data;
				}
			});
		}

		self.remove = function(tipoDispositivo){
			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar esse tipo de dispositivo e seu questionário?",
				callback: function(confirma){
					if (confirma) {
						TipoDispositivoFactory.remove(tipoDispositivo.id).then(function(data){
							buscaTiposDispositivos();
						});
					}
				}
			});
		};

		self.init();
	}
})();
