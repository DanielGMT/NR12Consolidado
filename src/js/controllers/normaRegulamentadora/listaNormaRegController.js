(function() {
	'use strict';

	angular.module('myApp').controller('listaNormaRegController', Controller);

	Controller.$inject=['NormaRegFactory'];

	function Controller(NormaRegFactory){

		var self = this;

		self.itens = [];

		self.filtro = '';

		self.init = function(){
			buscaNormaReg();
		};

		function buscaNormaReg(){
			NormaRegFactory.get().then(function(resp){
				if(resp.data){
					self.itens = resp.data;
				}
			});
	}
	self.remove = function(item){
		bootbox.confirm({
			size: 'small',
			message: "Deseja deletar este item da norma?",
			callback: function(confirma){
				if(confirma){
					NormaRegFactory.remove(item.id)
					.then(function(data){
						buscaNormaReg();
					});
				}
			}
		});
	};
	self.init();
}
})();
