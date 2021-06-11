(function(){
	'use strict';

	angular.module('myApp').controller('formModalPontoPerigoController', Controller);

	Controller.$inject=['$http', '$scope', '$routeParams','PerigoFactory', 'SistemaSegurancaFactory', 'NormaRegFactory', '$uibModalInstance', 'pontoPerigo'];

	function Controller ($http, $scope, $routeParams, PerigoFactory, SistemaSegurancaFactory, NormaRegFactory, $uibModalInstance, pontoPerigo){

		//inicia os botões de upload.
		$scope.btnFotoPP01 = true;
		$scope.btnFotoPP02 = true;
		$scope.btnFotoPP03 = true;
		$scope.selFotoPP01 = false;
		$scope.selFotoPP02 = false;
		$scope.selFotoPP03 = false;

		var $ctrl = this;
		$ctrl.pontoPerigo = null;
		$ctrl.sistemasSeguranca = null;

		$ctrl.salvarPontoPerigo = function(){
			$uibModalInstance.close($ctrl.pontoPerigo);
		};

		$ctrl.cancelarPontoPerigo = function(){
			$uibModalInstance.dismiss('cancel');
		};

		$ctrl.init = function(){
			$ctrl.pontoPerigo = pontoPerigo;
			buscaPerigos();
			listaRiscos();
			buscaNormaReg();
			buscaSistemasSeguranca();
		};

		function buscaSistemasSeguranca(){
			SistemaSegurancaFactory.get().then(function(resp){
				if(resp.data){
					$ctrl.sistemasSeguranca = resp.data;
				}else{
					$ctrl.sistemasSeguranca = [];
				}
			});
		}

		/******************BUSCA PERIGOS*************************/
		function buscaPerigos(){
			PerigoFactory.get().then(function(resp){
				if(resp.data){
					$ctrl.perigos = resp.data;
					for(var x = 0; x < $ctrl.pontoPerigo.Perigos.length; x++){
						for(var i = 0; i< $ctrl.perigos.length; i++){
							if($ctrl.pontoPerigo.Perigos[x].id == $ctrl.perigos[i].id){
								$ctrl.perigos.splice(i,1);
							}
						}
					}
				}else{
					$ctrl.perigos = [];
				}
			});
		}

		/****************************ADICIONA PERIGO***********************************/
		$ctrl.adicionaPerigo = function(){

			for(var i = 0; i < $ctrl.perigos.length; i++){
				if($ctrl.perigos[i].id == $ctrl.perigoSelecionado.id){
					$ctrl.perigos.splice(i, 1);
				}
			}
			$ctrl.pontoPerigo.Perigos.push($ctrl.perigoSelecionado);
			$ctrl.perigoSelecionado = "";

			listaRiscos();
		};

		/****************************ADICIONA Risco***********************************/
		$ctrl.adicionaRisco = function(){

			for(var i = 0; i < $ctrl.riscos.length; i++){
				if($ctrl.riscos[i].id == $ctrl.riscoSelecionado.id){
					$ctrl.riscos.splice(i, 1);
				}
			}
			$ctrl.pontoPerigo.Riscos.push($ctrl.riscoSelecionado);
			$ctrl.riscoSelecionado = "";
		};

		/******************************BUSCA RISCO**************************************/
		function listaRiscos(){
			$ctrl.riscos = [];
			for(var i = 0; i < $ctrl.pontoPerigo.Perigos.length; i++){
				for(var x = 0; x < $ctrl.pontoPerigo.Perigos[i].Riscos.length; x++){
					var contem = false;
				      // verifica sem ja tem o risco na lista de riscos
				      for(var y = 0; y < $ctrl.riscos.length; y++){
				      	if($ctrl.riscos[y] != undefined && $ctrl.riscos[y].id == $ctrl.pontoPerigo.Perigos[i].Riscos[x].id){
				      		contem = true;
				      	}
				      }
				      // verificar se o risco ja esta cadastrado no pontoPerigo
				      for(var z = 0; z < $ctrl.pontoPerigo.Riscos.length; z++){
				      	if($ctrl.pontoPerigo.Riscos[z].id == $ctrl.pontoPerigo.Perigos[i].Riscos[x].id){
				      		contem = true;
				      	}
				      }
				      if(!contem){
				      	console.log("adiciona");
				      	$ctrl.riscos.push($ctrl.pontoPerigo.Perigos[i].Riscos[x]);
				      }
				  }
				}
			}

			/********************* REMOVE PERIGO ***********************************************/
			$ctrl.removePerigo = function(perigo){
				for(var i = 0; i < $ctrl.pontoPerigo.Perigos.length; i++){
					if($ctrl.pontoPerigo.Perigos[i].id == perigo.id){
						$ctrl.pontoPerigo.Perigos.splice(i, 1);
						$ctrl.perigos.push(perigo);
					}
				}
			};

			/********************* REMOVE RISCO ***********************************************/
			$ctrl.removeRisco = function(risco){
				for(var i = 0; i < $ctrl.pontoPerigo.Riscos.length; i++){
					if($ctrl.pontoPerigo.Riscos[i].id == risco.id){
						$ctrl.pontoPerigo.Riscos.splice(i, 1);
						$ctrl.riscos.push(risco);
					}
				}
			};

			/*********************BUSCA ITEM DA NORMA*****************************************/
			function buscaNormaReg(){
				NormaRegFactory.get().then(function(resp){
					if(resp.data){
						$ctrl.normas = resp.data;
						for(var x = 0; x < $ctrl.pontoPerigo.normas.length; x++){
							for(var i = 0; i < $ctrl.normas.length; i++ ){
								if($ctrl.pontoPerigo.normas[x].id == $ctrl.normas[i].id){
									$ctrl.normas.splice(i,1);
								}
							}
						}
					}
				});
			}

			/********************* ADICIONA NORMA REGULAMENTADORA ***************************/
			$ctrl.adicionaNorma = function(){
				console.log("function adicionaNorma");
				if($ctrl.pontoPerigo.normas == undefined){
					$ctrl.pontoPerigo.normas = [];
				}
				for(var i = 0; i < $ctrl.normas.length; i++){
					if($ctrl.normas[i].id == $ctrl.normaSelecionada.id){
						$ctrl.normas.splice(i, 1);
					}
				}
				$ctrl.pontoPerigo.normas.push($ctrl.normaSelecionada);
				$ctrl.normaSelecionada = "";
			};

			/********************* REMOVE ITEM DA NORMA ********************************************************/
			$ctrl.removeItem = function(norma){
				for(var i = 0; i < $ctrl.pontoPerigo.normas.length; i++){
					if($ctrl.pontoPerigo.normas[i].id == norma.id){
						$ctrl.pontoPerigo.normas.splice(i, 1);
						$ctrl.normas.push(norma);
					}
				}
			};

			/*************Upload de Imagens Ponto perigo***********************************/

			$ctrl.upload = function(nomeFoto){

				var fd = new FormData();
				//Fotopp01
				if ($scope.fotopp01 !== undefined){
					angular.forEach($scope.fotopp01, function(file){
						console.log(file);
						fd.append('file',file);
					})
					$scope.fotopp01 = undefined;
					$ctrl.postUpload(fd, nomeFoto);
					$scope.btnFotoPP01 = true;
				}

				if ($scope.fotopp02 !== undefined){
					angular.forEach($scope.fotopp02, function(file){
						console.log(file);
						fd.append('file',file);
					})
					$scope.fotopp02 = undefined;
					$ctrl.postUpload(fd, nomeFoto);
					$scope.btnFotoPP02 = true;
				}

				if ($scope.fotopp03 !== undefined){
					angular.forEach($scope.fotopp03, function(file){
						console.log(file);
						fd.append('file',file);
					})
					$scope.fotopp03 = undefined;
					$ctrl.postUpload(fd, nomeFoto);
					$scope.btnFotoPP03 = true;
				}
			}

			$ctrl.postUpload = function(fd, nomeFoto){

					$http.post('/upload', fd,{
					transformRequest:angular.identity,
					headers: {'Content-Type':undefined}
				})
				.success(function(data){
					switch(nomeFoto){
						case "fotopp01":
							$ctrl.pontoPerigo.fotopp01 = {
								'path':data.path,
								'nome':data.nome,
								'show':data.path.substring(7,data.path.length)
							};
							break;
						case "fotopp02":
							$ctrl.pontoPerigo.fotopp02 = {
								'path':data.path,
								'nome':data.nome,
								'show':data.path.substring(7,data.path.length)
							};
							break;
						case "fotopp03":
							$ctrl.pontoPerigo.fotopp03 = {
								'path':data.path,
								'nome':data.nome,
								'show':data.path.substring(7,data.path.length)
							};
							break;
							default:
							bootbox.alert('Parâmetro errado ao gerar upload. Verifique com o administrador do sistema.');
					}
					$scope.selFotoPP01 = false;
					$scope.selFotoPP02 = false;
					$scope.selFotoPP03 = false;
				})
				.error(function(error){
					bootbox.alert('Erro ao fazer upload!!!');
				})
			};

			/*******************************HRN - Hazard Raiting Number********************/
			$ctrl.calculaHRN = function(){
				if($ctrl.pontoPerigo.pe != "" && $ctrl.pontoPerigo.fe != ""
						&& $ctrl.pontoPerigo.pmp !="" && $ctrl.pontoPerigo.np != ""){
					$ctrl.pontoPerigo.nivelRisco = "";
					$ctrl.pontoPerigo.nivelRisco = $ctrl.pontoPerigo.pe*$ctrl.pontoPerigo.fe*$ctrl.pontoPerigo.pmp*$ctrl.pontoPerigo.np;
				}
			};
			/******************************************************************************/

		$ctrl.init();
	}
})();
