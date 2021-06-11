(function(){
	'use strict';

	angular.module('myApp').controller('formNormaRegController', Controller);

	Controller.$inject=['$routeParams', '$resource', '$location', 'NormaRegFactory'];

	function Controller($routeParams, $resource, $location, NormaRegFactory){

		var self = this;

		self.init = function(){

				if($routeParams.itemId){
					NormaRegFactory.get($routeParams.itemId)
					.then(function(resp){
						if(resp.data){
							self.item = resp.data;
						}
					});
			}else{
				self.item = {};
			}
		};

			self.salva = function(){
				if(!self.item.id){
					save();
				}else{
					update();
				}
			};

			function save(){
				NormaRegFactory.save(self.item)
				.then(function(resp){
					if(resp.data){

						self.item = {};
						$location.path('/itens');
					}
				});
			}

			function update(){
				NormaRegFactory.update(self.item.id, self.item)
				.then(function(){
					self.item = {};
					$location.path('/itens');
				});
			}

			self.remove = function(item){
				bootbox.confirm({
					size: 'small',
					message: "Deseja deletar esse Item ?",
					callback: function(confirma){
						if (confirma) {
							NormaRegFactory.remove(item.id)
								.then(function(data){
									$location.path('/itens');
							});
						}
					}
				});
			};
			self.init();
		}
	})();
