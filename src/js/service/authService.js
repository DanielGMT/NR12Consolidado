(function() {
	'use strict';

	angular.module('myApp').factory('AuthService', AuthService);

    AuthService.$inject = ['$http', '$localStorage', '$q'];

	function AuthService($http, $localStorage, $q){
        return {
            getToken: function() {
                return $localStorage.token;
            },
            setToken: function(token){
                $localStorage.token = token;
            },
            login: function(data, success, error){
                $http.post('/authenticate', data).then(success, error);
            },
            password: function(data, success, error){
                $http.post('/password', data).then(success, error);
            },
            logout: function(){
                $("#userName").html("");
                delete $localStorage.token;
                delete $localStorage.usuario;
            }
        };
	}
})();
