(function() {
	'use strict';

	angular.module('myApp').controller('formTipoDispositivoController', Controller);

	Controller.$inject = ['$routeParams', '$location', 'TipoDispositivoFactory'];

	function Controller($routeParams, $location, TipoDispositivoFactory){

		var self = this;

		self.init = function(){
			busca();			
		};

		function busca(){
			// Verifica se a requisição contem ID, caso tenha, faz requisição dos dados da tipoDispositivo
			if($routeParams.tipoDispositivoId){
				TipoDispositivoFactory.get($routeParams.tipoDispositivoId).then(function(resp){
					if(resp.data){
						self.tipoDispositivo = resp.data;
					}
				});
			}else{
				self.tipoDispositivo = {};
			}
		}

		self.salva = function(){
			if(!self.tipoDispositivo.id){
				save();
			}else{
				update();
			}
		};

		function save(){
			TipoDispositivoFactory.save(self.tipoDispositivo).then(function(resp){
				if(resp.data){
					console.log(resp.data);
					//limpa o formulario
					self.tipoDispositivo = {};
					$location.path('/tipoDispositivo/'+resp.data.id+'/perguntas');
				}
			});
		}

		function update(){
			TipoDispositivoFactory.update(self.tipoDispositivo.id, self.tipoDispositivo).then(function(){
				//limpa o formulario
				self.tipoDispositivo = {};
				$location.path('/tiposDispositivos');
			});
		}

		self.remove = function(tipoDispositivo){
			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar essa Tipo Dispositivo?",
				callback: function(confirma){
					if (confirma) {
						TipoDispositivoFactory.remove(tipoDispositivo.id).then(function(data){
							$location.path('/tiposDispositivos');
						});
					}
				}
			});
		};

		self.init();
	}
})();
