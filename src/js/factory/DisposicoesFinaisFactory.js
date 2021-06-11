(function() {
	'use strict';

	angular.module('myApp').factory('DisposicoesFinaisFactory',
		function($resource){
			var factory = {
				get : fnGet,
				search : fnSearch,
				update : fnUpdate
			};

			var resource = $resource('/disposicoesFinais', null,{
				'update':{
					method: 'PUT'
				},
				'search':{
					method : 'GET',
					params : {
						query : '@query'
					}
				}
			});

			function fnGet(){
				return resource.get().$promise;
			}
			function fnUpdate(data){
				return resource.update(data).$promise;
			}
			function fnSearch(param){
				return resource.search({search:param}).$promise;
			}
			return factory;
	});
})();
