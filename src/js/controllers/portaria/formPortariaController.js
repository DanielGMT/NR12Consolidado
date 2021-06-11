(function() {
	'use strict';

	angular.module('myApp').controller('formPortariaController', Controller);

	Controller.$inject=['$routeParams', '$location', 'PortariaFactory'];

	function Controller($routeParams, $location, PortariaFactory){

	 var self = this;

	 self.init = function(){
		 PortariaFactory.get()
		 .then(function(resp){
			 if(resp.data){
				 self.portaria = resp.data;
			 }
		 });
	 };

self.altera = function(){
	update();
};
	 function update(){
 		PortariaFactory.update(self.portaria)
		.then(function(){
		$location.path('/portarias');
		});
 	};
	 self.init();
 }
})();
