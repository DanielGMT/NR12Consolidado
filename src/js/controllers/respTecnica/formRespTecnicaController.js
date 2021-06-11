(function() {
	'use strict';

	angular.module('myApp').controller('formRespTecnicaController', Controller);

	Controller.$inject=['$routeParams', '$location', 'RespTecnicaFactory'];

	function Controller($routeParams, $location, RespTecnicaFactory){

  var self = this;

	self.init = function(){
		RespTecnicaFactory.get().then(function(resp){
			if(resp.data){
				self.respTecnica = resp.data;
			}
		});
	};

	self.altera = function(){
		update();
	};

	function update(){
		RespTecnicaFactory.update(self.respTecnica)
		.then(function(){
			$location.path('/respTecnicas');
		});
	};
 self.init();
	}
})();
