(function() {
	'use strict';

	angular.module('myApp').controller('formUsuarioController', Controller);

	Controller.$inject=['$routeParams', '$location', 'UsuarioFactory'];

	function Controller($routeParams, $location, UsuarioFactory){

		var self = this;

		self.init = function(){
			// Verifica se a requisição contem ID, caso tenha, faz requisição dos dados da usuario
			if($routeParams.usuarioId){
				UsuarioFactory.get($routeParams.usuarioId)
					.then(function(resp){
						if(resp.data){
							self.usuario = resp.data;
						}
					});
			}else{
				self.usuario = {};
			}
		};

		self.salva = function(){
			if(!self.usuario.id){
				save();
			}else{
				update();
			}
		};

		function save(){
			UsuarioFactory.save(self.usuario)
				.then(function(resp){
					if(resp.data){
						//limpa o formulario
						self.usuario = {};
						$location.path('/usuarios');
					}
				});
		}

		function update(){
			UsuarioFactory.update(self.usuario.id, self.usuario)
				.then(function(){
					//limpa o formulario
					self.usuario = {};
					$location.path('/usuarios');
				});
		}

		self.remove = function(usuario){
			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar essa Usuário?",
				callback: function(confirma){
					if (confirma) {
						UsuarioFactory.remove(usuario.id)
							.then(function(data){
								$location.path('/usuarios');
							});
					}
				}
			});
		};

		self.init();
	}
})();
