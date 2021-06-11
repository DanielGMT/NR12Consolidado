(function() {
	'use strict';

	angular.module('myApp').controller('formCapacitacaoController', Controller);

	Controller.$inject=['$routeParams', '$location', 'CapacitacaoFactory'];

	function Controller($routeParams, $location, CapacitacaoFactory){

		var self = this;

		self.init = function(){
			// Verifica se a requisição contem ID, caso tenha, faz requisição dos dados da capacitacao
			if($routeParams.capacitacaoId){
				CapacitacaoFactory.get($routeParams.capacitacaoId)
					.then(function(resp){
						if(resp.data){
							self.capacitacao = resp.data;
						}
					}); 
			}else{ 
				self.capacitacao = {};
			}
		};

		self.salva = function(){
			if(!self.capacitacao.id){
				save();
			}else{ 
				update();
			}
		};

		function save(){
			CapacitacaoFactory.save(self.capacitacao)
				.then(function(resp){
					if(resp.data){
						//limpa o formulario
						self.capacitacao = {};
						$location.path('/capacitacoes');
					}
				});
		}

		function update(){
			CapacitacaoFactory.update(self.capacitacao.id, self.capacitacao)
				.then(function(){
					//limpa o formulario
					self.capacitacao = {};
					$location.path('/capacitacoes');
				});
		}

		self.remove = function(capacitacao){
			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar essa Capacitação ?",
				callback: function(confirma){
					if (confirma) {
						CapacitacaoFactory.remove(capacitacao.id)
							.then(function(data){
								$location.path('/capacitacoes');
				 		});
				  }
				}
			});
		};

		self.init();
	}
})();
