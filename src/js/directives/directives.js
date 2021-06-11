(function (){
  'use strict';

  angular.module('myApp').directive('validateInput', Directive);

  Directive.$inject = [];

  function Directive(){
    return {
      //restrict : 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, controller){
        function validate(value){
          if(value.length > 0 && value.length < 4){
            controller.$setValidity("SizeInput", false);
          }else if (value.length > 4 &&  value.length < 15){
             controller.$setValidity("SizeInput", true);
          }else{
            controller.$setValidity("SizeInput", false);
          }
          return value;
        }
        controller.$parsers.push(validate);
      }
    };
  }

})();
