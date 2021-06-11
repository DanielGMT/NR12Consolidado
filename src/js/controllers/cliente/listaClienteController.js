(function() {
	'use strict';

	angular.module('myApp').controller('listaClienteController', Controller);

	Controller.$inject=['ClienteFactory', '$localStorage'];

	function Controller(ClienteFactory, $localStorage){

		var self = this;

		self.clientes = [];

		self.filtro = '';

		self.init = function(){
			buscaClientes();
            console.log($localStorage);
		};

		function buscaClientes(){
			ClienteFactory.get().then(function(resp){
				if(resp.data){
					self.clientes = resp.data;
				}
			});
		}

		self.remove = function(cliente){
			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar esse Cliente?",
				callback: function(confirma){
					if (confirma) {
						ClienteFactory.remove(cliente.id)
							.then(function(data){
								buscaClientes();
							});
					}
				}
			});
		};

		self.init();
	}
})();
