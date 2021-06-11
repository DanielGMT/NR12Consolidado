(function() {
	'use strict';

	angular.module('myApp').controller('formLimiteMaquinaController', Controller);

	Controller.$inject=['$routeParams', '$resource', '$location', 'LimiteMaquinaFactory', 'CapacitacaoFactory'];

	function Controller($routeParams, $resource, $location, LimiteMaquinaFactory, CapacitacaoFactory){

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

			if($routeParams.limiteMaquinaId){
				LimiteMaquinaFactory.get($routeParams.limiteMaquinaId)
				.then(function(resp){
					if(resp.data){
							self.limiteMaquina = resp.data;
							console.log(self.limiteMaquina);
					}
				})
				.catch(function(erro){
					self.mensagem = {
						text: 'Este limite de máquina não existe. Novo limite de máquina será incluido'
					};
				}
			);
			}else{
				self.limiteMaquina = {};
			}
		};

		self.mensagem = {texto: ''};

		self.salva = function(){
			if(!self.limiteMaquina.id){
		  	save();
			}else{
				update();
			}
		};

		function save(){
			LimiteMaquinaFactory.save(self.limiteMaquina)
			.then(function(resp){
				  if(resp.data){

					self.limiteMaquina = {};
					$location.path('/limitesMaquinas');
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

		self.remove = function(limiteMaquina){
			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar essa Capacitação ?",
				callback: function(confirma){
					if (confirma) {
						LimiteMaquinaFactory.remove(self.limiteMaquina.id)

							.then(function(data){
								$location.path('/limitesMaquinas');
						});
					}
				}
			});
		};

		function update(){


			LimiteMaquinaFactory.update(self.limiteMaquina.id, self.limiteMaquina)
			.then(function(){

				self.limiteMaquina = {};
				$location.path('/limitesMaquinas');
			})
			.catch(function(erro){
				console.log(erro);
			});
		}


		self.init();
	}
})();
