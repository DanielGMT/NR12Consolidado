 (function() {
	'use strict';

	angular.module('myApp').controller('formMaquinaController', Controller);

	Controller.$inject=['$http','$scope', '$routeParams', '$location', 'MaquinaFactory', 'TipoMaquinaFactory', 'ClienteFactory'];

	function Controller($http, $scope, $routeParams, $location, MaquinaFactory, TipoMaquinaFactory, ClienteFactory){

		$scope.btnFotoFront = true;
		$scope.btnFotoLe= true;
		$scope.btnFotoLd = true;
		$scope.btnFotoPost = true;
		$scope.selFotoFront = false;
		$scope.selFotoLe = false;
		$scope.selFotoLd = false;
		$scope.selFotoPost = false;

		var self = this;

		self.init = function(){

			TipoMaquinaFactory.get().then(function(resp){
				if(resp.data){
					self.tiposMaquinas = resp.data;
				}
			}).catch(function(erro){
				console.log(erro);
			});

      		ClienteFactory.get().then(function(resp){
  				if(resp.data){
  					self.clientes = resp.data;
  					}
  			}).catch(function(erro){
  				    console.log(erro);
  			});


			if($routeParams.maquinaId){
				MaquinaFactory.get($routeParams.maquinaId)
					.then(function(resp){
						if(resp.data){
							self.maquina = resp.data;
							if (self.maquina.fotofront) {
								self.maquina.fotofront = {
									show:"./maquinas/"+self.maquina.id+"/fotofront/"+self.maquina.fotofront
								}
							}

							if (self.maquina.fotole) {
								self.maquina.fotole = {
									show:"./maquinas/"+self.maquina.id+"/fotole/"+self.maquina.fotole
								}
							}
							if (self.maquina.fotold) {
								self.maquina.fotold = {
									show:"./maquinas/"+self.maquina.id+"/fotold/"+self.maquina.fotold
								}
							}
							if (self.maquina.fotopost) {
								self.maquina.fotopost = {
									show:"./maquinas/"+self.maquina.id+"/fotopost/"+self.maquina.fotopost
								}
							}

						}
					});
			}else{
				self.maquina = {};
			}
		};
		self.salva = function(){
			if(!self.maquina.id){
				save();
			}else{
				update();
			}
		};

		function save(){
			console.log(self.maquina);
			MaquinaFactory.save(self.maquina)
				.then(function(resp){
					if(resp.data){
						//limpa o formulario
						self.maquina = {};
						$location.path('/maquinas');
					}
				});
		}

		function update(){

			MaquinaFactory.update(self.maquina.id, self.maquina)
				.then(function(){
					//limpa o formulario
					self.maquina = {};
					$location.path('/maquinas');
				});
		}

		self.remove = function(cliente){
			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar essa Maquina?",
				callback: function(confirma){
					if (confirma) {
						MaquinaFactory.remove(cliente.id)
							.then(function(data){
								$location.path('/maquinas');
							});
					}
				}
			});
		};


		self.upload = function(nomeFoto){

			console.log(nomeFoto);
			console.log("SCOPE", $scope);

			var fd = new FormData();
			//front
			if ($scope.fotofront !== undefined){
				angular.forEach($scope.fotofront, function(file){
					console.log("FILE", file);
					fd.append('file',file);
				})
				$scope.fotofront = undefined;
				self.postUpload(fd, nomeFoto);
				$scope.btnFotoFront = true;
			}
			//lado esquerdo
			if ($scope.fotole !== undefined){
				angular.forEach($scope.fotole, function(file){
					console.log(file);
					fd.append('file',file);
				})
				$scope.fotole = undefined;
				self.postUpload(fd, nomeFoto);
				$scope.btnFotoLe = true;
			}
			//lado direito
			if ($scope.fotold !== undefined){
				angular.forEach($scope.fotold, function(file){
					console.log(file);
					fd.append('file',file);
				})
				$scope.fotold = undefined;
				self.postUpload(fd, nomeFoto);
				$scope.btnFotoLd = true;
			}
			//posterior
			if ($scope.fotopost !== undefined){
				angular.forEach($scope.fotopost, function(file){
					console.log(file);
					fd.append('file',file);
				})
				$scope.fotopost = undefined;
				self.postUpload(fd, nomeFoto);
				$scope.btnFotoPost = true;
			}
		}

		self.postUpload = function(fd, nomeFoto){

			$http.post('/upload', fd,{
				transformRequest:angular.identity,
				headers: {'Content-Type':undefined}
			})
			.success(function(data){
			
				switch(nomeFoto){
					case "fotofront":
						self.maquina.fotofront = {
							'path':data.path,
							'nome':data.nome,
							'show':data.path.substring(7,data.path.length)
						};
						break;
					case "fotole":
						self.maquina.fotole = {
							'path':data.path,
							'nome':data.nome,
							'show':data.path.substring(7,data.path.length)
						};
						break;
					case "fotold":
						self.maquina.fotold = {
							'path':data.path,
							'nome':data.nome,
							'show':data.path.substring(7,data.path.length)
						};
						break;
					case "fotopost":
						self.maquina.fotopost = {
							'path':data.path,
							'nome':data.nome,
							'show':data.path.substring(7,data.path.length)
						};
						break;
					default:
						bootbox.alert('Parâmetro errado ao gerar upload. Verifique com o administrador do sistema.');
				}
				$scope.selFotoFront = false;
				$scope.selFotoLe    = false;
				$scope.selFotoLd    = false;
				$scope.selFotoPost  = false;

			})
			.error(function(error){
				bootbox.alert('Erro ao fazer upload!!!');
			})
		};


		//inicia o controller
		self.init();
	}
})();
