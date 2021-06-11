(function() {
	'use strict';
angular.module('myApp').controller('formModalPerigoController', Controller);
Controller.$inject=['$modal', '$routeParams', '$location', 'LaudoFactory'];

function Controller($modal, $routeParams, $location, LaudoFactory){
  var self = this;

  self.perigoModal = {
    fields : {
      nome : "",
      id : ""
    }
  };

  self.perigoOpen = function(){
    self.open({
      templateUrl:'perigoModal.html',
      backdrop: true,
      windowClass: 'modal',
      controller: function(){
        self.submit = function(){}
        self.cancel = function(){};
      }
    });
  }
}
  })();
