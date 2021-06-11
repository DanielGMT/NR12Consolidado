(function (){
  'use strict';

  angular.module('myApp').directive('radioboolean', Directive);

  Directive.$inject = [];

  function Directive(){
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelController){
        ngModelController.$formatters.push(function (modelValue) {
                if (modelValue === true)
                {
                    console.log("true 1");
                    return "true";
                }
                else if (modelValue === false)
                {
                    return "false";
                }
                else
                {
                    return undefined;
                }
            });

        ngModelController.$parsers.push(function (viewValue) {
                if (viewValue === "true")
                {
                    console.log("true novo");
                    return true;
                }
                else if (viewValue === "false")
                {
                    return false;
                }
                else
                {
                    return undefined;
                }
            });
      }
    };
  }

})();
