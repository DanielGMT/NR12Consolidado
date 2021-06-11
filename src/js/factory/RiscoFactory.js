(function() {
	'use strict';
	
	angular.module('myApp').factory('RiscoFactory', function($resource){
		
		var factory = {
			get : fnGet,
			save : fnSave,
			update : fnUpdate,
			search : fnSearch,
			remove : fnRemove
		};
		
		var resource = $resource('/risco/:id', null, {
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
			}else{
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