(function() {
	'use strict';

	angular.module('myApp').controller('formPerigoController', Controller);

	Controller.$inject=['$routeParams', 'PerigoFactory', 'RiscoFactory', '$location'];

	function Controller($routeParams, PerigoFactory, RiscoFactory, $location){

		var self = this;
		self.riscoSelecionado ="";
		self.btnIncluirRisco = true;
		//self.perigo = {Riscos:[]};
		self.perigo = {};
		self.riscosDisponiveis = []; //Riscos Disponíveis no option
		self.riscosInseridos = []; //Riscos inseridos na table

    	self.changeRisco = function(){

			self.btnIncluirRisco = self.riscoSelecionado ? false : true;
		}

		self.init = function(){
			RiscoFactory.get().then(function(resp){
				if(resp.data){
					self.riscosDisponiveis = resp.data;
				}
			}).catch(function(erro){
				console.log(erro);
			});

			if($routeParams.perigoId){
				PerigoFactory.get($routeParams.perigoId)
					.then(function(resp){
						if(resp.data){
							console.log(resp.data);
							self.perigo = resp.data;
							for (var i = 0; i < resp.data.Riscos.length; i++){
								self.riscosInseridos.push({
									"id": resp.data.Riscos[i].id,
									"nome": resp.data.Riscos[i].nome,
									"descricao": resp.data.Riscos[i].descricao
								});
							}

							self.perigo.Riscos = self.riscosInseridos;
							for (var i = 0; i < self.riscosInseridos.length; i++){
								for (var y = 0; y < self.riscosDisponiveis.length; y++){
									if (self.riscosInseridos[i].id == self.riscosDisponiveis[y].id){
										self.riscosDisponiveis.splice(y,1);
									}
								}
							}
						}
					}).catch(function(erro){
						console.log(erro);
					}
				);
			}else{
				self.perigo = {};
			}
		};

		self.adicionaRisco = function() {
			for (var i = 0; i < self.riscosDisponiveis.length; i++){
				if (self.riscosDisponiveis[i].id == self.riscoSelecionado.id) {
					self.riscosDisponiveis.splice(i,1);
				}
			};
			self.riscosInseridos.push(self.riscoSelecionado);
			self.btnIncluirRisco = true;
			self.perigo.Riscos = self.riscosInseridos;
		};

		self.removeRiscoInserido = function(risco){
			for (var i = 0; i < self.riscosInseridos.length; i++) {
				if (self.riscosInseridos[i].id == risco.id) {
					self.riscosInseridos.splice(i,1);
					self.riscosDisponiveis.push(risco);
				}
			};
		};

		self.salva = function(){
			if(!self.perigo.id){
				save();
			}else{
				update();
			}
		};

		function save(){

			PerigoFactory.save(self.perigo)
				.then(function(resp){
				if(resp.data){
					$location.path('/perigos');
				}
			}).catch(function(erro){
				console.log(erro);
			});
		};

		function update(){

			PerigoFactory.update(self.perigo.id, self.perigo)
				.then(function(){

				$location.path('/perigos');
			}).catch(function(erro){
				console.log(erro);
			})
		};

		self.remove = function(perigo){
			bootbox.confirm({
				size : 'small',
				message : "Deseja deletar esse Perigo?",
				callback : function(confirma){
					if(confirma){
						PerigoFactory.remove(perigo.id)
							.then(function(data){
								$location.path('/perigos');
						}).catch(function(erro){
							console.log(erro);
						});
					}
				}
			});
		};

		self.init();
	}
})();
