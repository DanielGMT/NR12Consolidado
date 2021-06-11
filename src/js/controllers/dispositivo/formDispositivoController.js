(function() {
	'use strict';

	angular.module('myApp').controller('formDispositivoController', Controller);

	Controller.$inject=['$routeParams', '$location', 'DispositivoFactory'];

	function Controller($routeParams, $location, DispositivoFactory){

		var self = this;

		self.init = function(){
			DispositivoFactory.get()
			.then(function(resp){
				if(resp.data){
					self.dispositivo = resp.data;
				}
			});

		};
		self.altera = function(){
			update();
		};

		function update(){
			DispositivoFactory.update(self.dispositivo)
			.then(function(){
				$location.path('/dispositivos');
			});
		};
			self.init();
	}
})();
