(function() {
	'use strict';

	angular.module('myApp').controller('listaDispositivoController', Controller);

	Controller.$inject=['DispositivoFactory'];

	function Controller(DispositivoFactory){
		var self = this;

		self.dispositivo = [];

		self.filtro = '';

		self.mensagem = {texto: ''};

		self.init = function(){
			buscaDispositivos();
		};
		//self.filtro = '';
		function buscaDispositivos(){
			DispositivoFactory.get().then( function(resp){
				if(resp.data){
					console.log(resp.data);
					self.dispositivo = resp.data;
				}
			});
		};
		self.init();
	}
})();
