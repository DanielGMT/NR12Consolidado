(function() {
	'use strict';

	angular.module('myApp').factory('UsuarioFactory', function($resource){

		var factory = {
			get : fnGet,
			getByUsername : fnGetByUsername,
			save : fnSave,
			update : fnUpdate,
			search : fnSearch,
			remove : fnRemove
		};

		var resource = $resource('/usuario/:id', null, {
		//return $resource('/usuario/:id', null, {
			'update':{
				method:'PUT'
			},
			'search':{
				method : 'GET',
				params : {
					query : '@query'
				}
			}
		});

		function fnGet(id){
			if(id){
				return resource.get({id:id}).$promise;
			} else {
				return resource.get().$promise;
			}
		}

		function fnGetByUsername(username){
			if(username){
				return $resource('/usuario/:username').get({username: username}).$promise;
			} else {
				return resource.get().$promise;
			}
		}

		function fnSave(data){
			return resource.save(data).$promise;
		}

		function fnUpdate(id,data){
			return resource.update({id:id},data).$promise;
		}

		function fnSearch(param){
			return resource.search({search:param}).$promise;
		}

		function fnRemove(id){
			return resource.delete({id:id}).$promise;
		}

		return factory;
	});
})();
