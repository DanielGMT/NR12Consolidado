(function() {
	'use strict';

	angular.module('myApp').controller('listaQuestionarioController', Controller);

	Controller.$inject=['$routeParams', '$location', 'TipoDispositivoFactory', 'PerguntaFactory'];

	function Controller($routeParams, $location, TipoDispositivoFactory, PerguntaFactory){

		var self = this;

		self.filtro = '';

		self.perguntas = [];

		console.log($routeParams.tipoDispositivoId);

		self.tipoDispositivoId = $routeParams.tipoDispositivoId;

		self.init = function(){
			buscaTipoDispositivo();
		};


		function buscaTipoDispositivo(){
			// Verifica se a requisição contem ID, caso tenha, faz requisição dos dados da capacitacao
			if($routeParams.tipoDispositivoId){
				//debugger;
				TipoDispositivoFactory.get($routeParams.tipoDispositivoId).then(function(resp){
					if(resp.data){
						self.tipoDispositivo = resp.data;
						//console.log(self.tipoDispositivo);
						self.perguntas = resp.data.perguntas;
					}
				});
			}else{
				self.perguntas = [];
			}
		};


		self.remove = function(pergunta){
			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar essa Pergunta ?",
				callback: function(confirma){
					if (confirma) {
						PerguntaFactory.remove(pergunta.id).then(function(data){
							buscaTipoDispositivo();
						});
					}
				}
			});
		};

		self.init();
	}
})();
