(function(){
	'use strict';
	
	angular.module('myApp').controller('formSistemaSegurancaController', Controller);
	
	Controller.$inject=['$routeParams', 'SistemaSegurancaFactory', '$location'];
	
	function Controller($routeParams, SistemaSegurancaFactory, $location){

		var self = this;
		
		self.init = function(){
			if($routeParams.sistemaSegurancaId){
				SistemaSegurancaFactory.get($routeParams.sistemaSegurancaId)
					.then(function(resp){
						if(resp.data){
							self.sistemaSeguranca = resp.data;
						}
					})
					.catch(function(erro){
						
					}
				);
			}else{
				self.sistemaSeguranca = {};
			}
		};
		
		self.salva = function(){
			if(!self.sistemaSeguranca.id){
				save();
			}else{
				update();
			}
		};
		
		function save(){
			SistemaSegurancaFactory.save(self.sistemaSeguranca)
				.then(function(resp){
				if(resp.data){
					$location.path('/sistemasSeguranca');
				}
			})
			.catch(function(erro){
				console.log(erro);
			});
		};
		
		function update(){
			SistemaSegurancaFactory.update(self.sistemaSeguranca.id, self.sistemaSeguranca)
				.then(function(){
				$location.path('/sistemasSeguranca');
			})
			.catch(function(erro){
				console.log(erro);
			})
		}
		
		self.remove = function(sistemaSeguranca){
			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar esse sistema de segurança?",
				callback: function(confirma){
					if (confirma) {
						SistemaSegurancaFactory.remove(sistemaSeguranca.id)
							.then(function(data){
								$location.path('/sistemasSeguranca');
							
							}).catch(function(erro){
								console.log(erro);
							}
						);
					}
				}
			});
		};
		
		self.init();
	}
})();
