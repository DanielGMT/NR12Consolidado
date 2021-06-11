(function() {
	'use strict';

	angular.module('myApp').controller('listaRespTecnicaController', Controller);

	Controller.$inject=['RespTecnicaFactory'];

	function Controller(RespTecnicaFactory){

	self = this;

	self.respTecnica = [];

	self.filtro = '';

	self.init = function(){
		buscaRespTecnica();
	};
		function buscaRespTecnica(){
			RespTecnicaFactory.get().then(function(resp){
				if(resp.data){
					console.log(resp.data);
					self.respTecnica = resp.data;
				}
			});
		};
			self.init();
	}
})();
