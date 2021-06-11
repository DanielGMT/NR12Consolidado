(function() {
	'use strict';

	angular.module('myApp').controller('listaPortariaController', Controller);

	Controller.$inject=['PortariaFactory'];

	function Controller(PortariaFactory){

		var self = this;

		self.portarias = [];

		self.filtro = '';

		self.init = function(){
			buscaPortaria();
		};

		function buscaPortaria(){
			PortariaFactory.get().then(function(resp){
				if(resp.data){
					self.portaria = resp.data;
				}
			});
		};
		self.init();
	}
})();
