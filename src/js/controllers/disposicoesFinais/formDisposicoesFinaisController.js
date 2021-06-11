(function() {
	'use strict';

	angular.module('myApp').controller('formDisposicoesFinaisController', Controller);

	Controller.$inject=['$routeParams', '$location', 'DisposicoesFinaisFactory'];

	function Controller($routeParams, $location, DisposicoesFinaisFactory){

		var self = this;

		self.init = function(){
			buscaDisposicaoFinal();
		};

		self.altera = function(){
			update();
		};

		function buscaDisposicaoFinal(){
			DisposicoesFinaisFactory.get().then(function(resp){
				if(resp.data){
					self.disposicaofinal = resp.data;
				}
			});
		}

		function update(){
	 		DisposicoesFinaisFactory.update(self.disposicaofinal).then(function(){
				$location.path('/disposicoesFinais');
			});
	 	}
		
		self.init();
	}

})();
