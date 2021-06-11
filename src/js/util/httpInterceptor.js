(function() {
	'use strict';

	angular.module('myApp').factory('Interceptor', Factory);

  Factory.$inject = ['$q', 'toaster', '$localStorage', '$location'];

	function Factory($q, toaster, $localStorage, $location){

		var httpInterceptor = {
			request: function(config){
				config.headers = config.headers || {};
                //debugger;
				if($localStorage.token){
					config.headers['Authorization'] = 'Bearer ' + $localStorage.token;
				}else if (config.url === 'partials/usuario/formPassword.html') {
                    $location.path('/login');
                    toaster.pop('error', "Info", "Para alterar sua senha, faça o login!");
                }

				return config;
			},
            response: function(response){
                //debugger;
                if(response.data.status && response.data.message){
                    toaster.pop(response.data.status, "Info", response.data.message);
                }
                return response;
            },
            responseError: function(resp){
                if(resp.data.status && resp.data.message){
                    if(resp.data.error){
                        if(resp.data.error.name === "SequelizeValidationError"){
                            var msg = "";
                            for(var x in resp.data.error.errors){
                                msg += "Campo " + resp.data.error.errors[x].path + " : " + resp.data.error.errors[x].message + "<br />";
                            }
                            toaster.pop(resp.data.status, "Erro na validação", msg, 5000,'trustedHtml');
                        }else{
                            toaster.pop(resp.data.status, "Info", resp.data.message);
                        }
                    }else{
                        toaster.pop(resp.data.status, "Info", resp.data.message);
                    }
                }
                if(resp.status === 401){
                    $location.path('/login');
                }
                return $q.reject(resp);
            }
		}
		return httpInterceptor;
	}

	angular.module('myApp').config(['$httpProvider', Interceptor]);

	function Interceptor($httpProvider){
		$httpProvider.interceptors.push('Interceptor');
	}
})();
