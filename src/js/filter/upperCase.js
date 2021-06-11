(function() {
	'use strict';

	angular.module('myApp').filter('upperCase', function(){
		return function(input){
			var str = input + '';
			str = str.replace(/[A-Z]/g, '');

			return str;
		};
	});
})();
