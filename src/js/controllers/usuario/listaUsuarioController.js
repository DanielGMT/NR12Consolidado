(function() {
	'use strict';

	angular.module('myApp').controller('listaUsuarioController', Controller);

	Controller.$inject=['UsuarioFactory'];

	function Controller(UsuarioFactory){

		var self = this;

		self.usuarios = [];

		self.filtro = '';

		self.init = function(){
			buscaUsuarios();
		};

		function buscaUsuarios(){
			UsuarioFactory.get().then(function(resp){
				if(resp.data){
					self.usuarios = resp.data;
				}
			});
		}

		self.remove = function(usuario){
			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar essa Usuário?",
				callback: function(confirma){
					if (confirma) {
						UsuarioFactory.remove(usuario.id)
							.then(function(data){
								buscaUsuarios();
							});
					}
				}
			});
		};

		self.init();
	}
})();