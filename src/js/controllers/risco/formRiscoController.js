(function(){
	'use strict';
	
	angular.module('myApp').controller('formRiscoController', Controller);
	
	Controller.$inject=['$routeParams', 'RiscoFactory', '$location'];
	
	function Controller($routeParams, RiscoFactory, $location){

		var self = this;
		
		self.init = function(){
			if($routeParams.riscoId){
				RiscoFactory.get($routeParams.riscoId)
					.then(function(resp){
						if(resp.data){
							self.risco = resp.data;
						}
					})
					.catch(function(erro){
						
					}
				);
			}else{
				self.risco = {};
			}
		};
		
		self.salva = function(){
			if(!self.risco.id){
				save();
			}else{
				update();
			}
		};
		
		function save(){
			RiscoFactory.save(self.risco)
				.then(function(resp){
				if(resp.data){
					$location.path('/riscos');
				}
			})
			.catch(function(erro){
				console.log(erro);
			});
		};
		
		function update(){
			RiscoFactory.update(self.risco.id, self.risco)
				.then(function(){
				$location.path('/riscos');
			})
			.catch(function(erro){
				console.log(erro);
			})
		}
		
		self.remove = function(risco){
			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar esse Risco?",
				callback: function(confirma){
					if (confirma) {
						RiscoFactory.remove(risco.id)
							.then(function(data){
								$location.path('/riscos');
							
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
