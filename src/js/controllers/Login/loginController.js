(function() {
	'use strict';

	angular.module('myApp').controller('loginController', Controller);

	Controller.$inject=['$rootScope', '$location', '$localStorage', 'AuthService', 'toaster', '$base64'];

	function Controller($rootScope, $location, $localStorage, AuthService, toaster, $base64){
		var self = this;

		(function initController(){
			AuthService.logout();
		})();

		self.login = function(){
            //exibe status de "carregando" ao lado do botao login
			self.dataLoading = true;

			var formData = {
				'email': self.email,
				'senha': $base64.encode(self.senha)
			}

			AuthService.login(formData, function(res) {
                var usuario;
                if(res.data.status === 'success' && res.data.token){
                    AuthService.setToken(res.data.token);
                    $localStorage.usuario = res.data.usuario;
                    usuario = res.data.usuario;
                    usuario = usuario.split(' ');
                    usuario = usuario[0];
                    $("#userName").html("Bem Vindo(a) " + usuario);
                    if (res.data.senhaPadrao){
                        $location.path('/usuario/password');
                        res.data.message = 'Redefinir senha padrão';
                    }else{
                        $location.path('/');
                    }
                }
                self.dataLoading = false;
			}, function(){
				alert('ERRO LOGIN');
                self.dataLoading = false;
			});
            
		};

		self.logout = function(){
			AuthService.logout();
		};

	}
})();
