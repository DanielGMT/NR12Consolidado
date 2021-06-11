(function() {
	'use strict';

	angular.module('myApp').controller('formTipoMaquinaController', Controller);

	Controller.$inject=['$routeParams', '$resource', '$location', 'TipoMaquinaFactory', 'CapacitacaoFactory'];

	function Controller($routeParams, $resource, $location, TipoMaquinaFactory, CapacitacaoFactory){

		var self = this;
		self.capacitacaoSelecionada ="";
		self.capacitacoesDisponiveis = [];
		self.init = function(){

			CapacitacaoFactory.get().then(function(resp){
				if(resp.data){
					self.capacitacoesDisponiveis = resp.data;
				}
			}).catch(function(erro){

			})

			if($routeParams.tipoMaquinaId){
				TipoMaquinaFactory.get($routeParams.tipoMaquinaId)
				.then(function(resp){
					if(resp.data){
							self.tipoMaquina = resp.data;
							console.log(self.tipoMaquina);
					}
				})
				.catch(function(erro){
					self.mensagem = {
						text: 'Este tipo de máquina não existe. Novo tipo de márquina será incluido'
					};
				}
			);
			}else{
				self.tipoMaquina = {};
			}
		};

		self.mensagem = {texto: ''};

		self.salva = function(){
			if(!self.tipoMaquina.id){
		  	save();
			}else{
				update();
			}
		};

		function save(){
			TipoMaquinaFactory.save(self.tipoMaquina)
			.then(function(resp){
				  if(resp.data){

					self.tipoMaquina = {};
					$location.path('/tiposMaquinas');
				}
			})
			.catch(function(erro){
				 console.log(erro);
				 function retornaMsg(data){
				 	var msg = "";
				 	for(var err in data.errors){
				 		msg +=data.errors[err].message;
				 	}
				 	return msg;
				 }
				self.mensage = {
					texto:  retornaMsg(erro.data)
				};
			});

		}

		self.remove = function(tipoMaquina){
			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar essa Capacitação ?",
				callback: function(confirma){
					if (confirma) {
						TipoMaquinaFactory.remove(self.tipoMaquina.id)

							.then(function(data){
								$location.path('/tiposMaquinas');
						});
					}
				}
			});
		};

		function update(){


			TipoMaquinaFactory.update(self.tipoMaquina.id, self.tipoMaquina)
			.then(function(){

				self.tipoMaquina = {};
				$location.path('/tiposMaquinas');
			})
			.catch(function(erro){
				console.log(erro);
			});
		}


		self.init();
	}
})();
