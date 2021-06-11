(function (){
  'use strict';

  angular.module('myApp').directive('back', Directive);

  Directive.$inject = ['$window'];

  function Directive($window){
    return {
      restrict : 'A', 
      link: function(scope, element, attrs){
        element.bind('click', function(){
          $window.history.back();
          scope.$apply();
        });
      }
    };
  }

})();
