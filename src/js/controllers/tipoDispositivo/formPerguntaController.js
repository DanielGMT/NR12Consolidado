(function() {
	'use strict';

	angular.module('myApp').controller('formPerguntaController', Controller);

	Controller.$inject = ['$routeParams', '$location', 'TipoDispositivoFactory', 'PerguntaFactory', 'RespostaFactory'];

	function Controller($routeParams, $location, TipoDispositivoFactory, PerguntaFactory, RespostaFactory){

		var self = this;

		self.init = function(){

			// Verifica se a requisição contem ID, caso tenha, faz requisição dos dados da capacitacao
			buscaTipoDispositivo();

			// Atualiza a lista de respostas
			buscaRespostas();

			// Busca a pergunta
			buscaPergunta();
		};

		// Verifica se a requisição contem ID, caso tenha, faz requisição dos dados da capacitacao
		function buscaTipoDispositivo(){
			if($routeParams.tipoDispositivoId){
				TipoDispositivoFactory.get($routeParams.tipoDispositivoId).then(function(resp){
					if(resp.data){
						self.tipoDispositivo = resp.data;
					}
				});
			}else{
				self.tipoDispositivo = {};
			}

		}

		// Busca a lista de respostas
		function buscaRespostas(){
			RespostaFactory.get().then(function(resp){
				if(resp.data){
					self.respostas = resp.data;
				}
			}).catch(function(erro){
				console.log(erro);
			});
		}

		function buscaPergunta(){
			console.log("function buscaPergunta");
			if($routeParams.perguntaId){
				PerguntaFactory.get($routeParams.perguntaId).then(function(resp){
					if(resp.data){
						self.pergunta = resp.data;
					}
				});
			}else{
				self.pergunta = {
					tipoDispositivoId : $routeParams.tipoDispositivoId
				};
			}
		}

		self.salva = function(){
			if(!self.pergunta.id){
				save();
			}else{
				update();
			}
		};

		function save(){
			PerguntaFactory.save(self.pergunta).then(function(resp){
				if(resp.data){
					//limpa o formulario
					self.pergunta = {};
					$location.path('/tipoDispositivo/'+$routeParams.tipoDispositivoId+'/perguntas');
				}
			});
		}

		function update(){
			PerguntaFactory.update(self.pergunta.id, self.pergunta).then(function(){
				//limpa o formulario
				self.pergunta = {};
				$location.path('/tipoDispositivo/'+$routeParams.tipoDispositivoId+'/perguntas');
			});
		}

		

		self.init();
	}
})();
