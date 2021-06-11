(function(){
	'use strict';

	angular.module('myApp').controller('HomeController', Controller);

	Controller.$inject=['$scope','LaudoFactory', '$routeParams', '$filter'];

	function Controller($scope, LaudoFactory, $routeParams, $filter){

        var self = this;
				var laudoAprovado = 0;
				var laudoEmElaboracao = 0;
				var laudoEmAprovacao = 0;
				self.laudos = [];
				self.filtro = '';

				self.init = function(){
					buscaLaudos();
				};

				function buscaLaudos(){
					LaudoFactory.get().then(function(resp){
						if (resp.data){
							self.laudos = resp.data;
							console.log("LAUDOS", self.laudos);
												prepararObjeto();
						}
					}).then(function (){
						contLaudos();
					});

				}
				function contLaudos(){
					for(var x = 0; x < self.laudos.length; x++){
						console.log("STATUS", self.laudos[x].status);
						if(self.laudos[x].status == "Aprovado"){
							laudoAprovado += 1;
						}
						if(self.laudos[x].status == "Em Elaboração"){
							laudoEmElaboracao += 1;
						}
						if(self.laudos[x].status == "Em Aprovação"){
							laudoEmAprovacao += 1;
						}
					}
					centralNotificacao();

				}

				function prepararObjeto(){
						var nome, cidade, id, ano;
						self.laudos.forEach(function(laudo){
								//ajustando exibição de datas
								//laudo.data_inicial = $filter('date')(laudo.data_inicial, 'dd/MM/yyyy', 'UTC');
								//laudo.data_final = $filter('date')(laudo.data_final, 'dd/MM/yyyy', 'UTC');
						});
				};

			function centralNotificacao(){
				self.mensagem = {texto: ''};
				self.informativos = [
					{"texto":"Laudos em Aprovação: "+laudoEmAprovacao+""},
					{"texto":"Laudos em Elaboração: "+laudoEmElaboracao+""},
					{"texto":"Laudos Aprovados: "+laudoAprovado+""}
				];

			}

		self.init();
	}
})();
