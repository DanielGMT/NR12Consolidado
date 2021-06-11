(function() {
	'use strict';

	angular.module('myApp').controller('passwordController', Controller);

	Controller.$inject=['$routeParams', '$location', 'UsuarioFactory', 'AuthService', '$base64', 'toaster'];

	function Controller($routeParams, $location, UsuarioFactory, AuthService, $base64, toaster){

		var self = this;

		self.init = function(){

		};

		self.salva = save;

		function save(){
			 if(self.novaSenha == self.confSenha){
				 var formData = {
	 				'senhaAtual': $base64.encode(self.senhaAtual),
	 				'novaSenha': $base64.encode(self.novaSenha)
	 			}
	 			

	 			AuthService.password(formData, function(){
	 				$location.path('/');
	 			});
			 }
			  if(self.novaSenha != self.confSenha){
					toaster.pop('error', "Info", "Senhas não conferem");
				}


		}

		self.init();
	}
})();
