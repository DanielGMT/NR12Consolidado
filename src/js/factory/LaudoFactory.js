(function() {
	'use strict';

	angular.module('myApp').factory('LaudoFactory', function($resource){

		var factory = {
			get : fnGet,
			save : fnSave,
			update : fnUpdate,
			search : fnSearch,
			remove : fnRemove,
            confirma : fnConfirma,
            imprime : fnImprime,
            aprova : fnAprova
		};

		var resource = $resource('/laudo/:id', null, {
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

        var resourceConfirma = $resource('/confirma/:id', null, {
			'update':{
				method:'PUT'
			}
		});

        var resourceImprime = $resource('/relatorio/:id', null, {
			'update':{
				method:'GET'
			}
		});

         var resourceAprova = $resource('/aprova/:id', null, {
			'update':{
				method:'PUT'
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

        function fnConfirma(id){
			return resourceConfirma.update({id:id}).$promise;
		}

        function fnImprime(id){
			if(id){
				return resourceImprime.get({id:id}).$promise;
			}else{
				return resourceImprime.get().$promise;
			}
		}

         function fnAprova(id){
			return resourceAprova.update({id:id}).$promise;
		}

		return factory;
	});
})();
