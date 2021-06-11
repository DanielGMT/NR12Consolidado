(function() {
	'use strict';

	angular.module('myApp').controller('formModalDispositivoController', Controller);

	Controller.$inject=['$http', '$scope', 'TipoDispositivoFactory', 'PerguntaFactory', 'NormaRegFactory', '$uibModalInstance', 'dispositivo'];

	function Controller ($http, $scope, TipoDispositivoFactory, PerguntaFactory, NormaRegFactory, $uibModalInstance, dispositivo){

		//Inicia os botões de upload
		$scope.btnImagem = true;
		$scope.selImagem = false;

		var $ctrl = this;
		$ctrl.dispositivo = null;

		$ctrl.salvarDispositivo = function () {
			$uibModalInstance.close($ctrl.dispositivo);
		};

		$ctrl.cancelarDispositivo = function () {
			$uibModalInstance.dismiss('cancel');
		};

		$ctrl.init = function() {
			$ctrl.dispositivo = dispositivo;
			buscaTiposDispositivos();
			buscaNormaReg();
			$ctrl.normaSelecionada = "";
		};

		function buscaTiposDispositivos(){
			TipoDispositivoFactory.get().then(function(resp){
				if(resp.data){
					$ctrl.tiposDispositivos = resp.data;
				}else{
					$ctrl.tiposDispositivos = [];
				}
			});
		}

		$ctrl.buscaPerguntas = function (){
			TipoDispositivoFactory.get($ctrl.dispositivo.tipoDispositivoId).then(function(resp){
				if(resp.data){
					$ctrl.dispositivo.perguntas = resp.data.perguntas;
				}
			});
		};

		function buscaNormaReg() {
			NormaRegFactory.get().then(function(resp){
				if(resp.data){
					$ctrl.normas = resp.data;
					for(var x = 0; x < $ctrl.dispositivo.normas.length; x++){
						for(var i = 0; i< $ctrl.normas.length; i++){
							if($ctrl.dispositivo.normas[x].id == $ctrl.normas[i].id){
								$ctrl.normas.splice(i,1);
							}
						}
					}
				}else{
					$ctrl.normas = [];
				}
			});
		}

		$ctrl.adicionaNormaReg = function(){
			if($ctrl.dispositivo.normas == undefined){
				$ctrl.dispositivo.normas = [];
			}
			for (var i = 0; i < $ctrl.normas.length; i++){
				if ($ctrl.normas[i].id == $ctrl.normaSelecionada.id) {
					$ctrl.normas.splice(i,1);
				}
			}
			$ctrl.dispositivo.normas.push($ctrl.normaSelecionada);

			$ctrl.normaSelecionada = "";
		};

		$ctrl.removeNormaReg = function(norma){
			for (var i = 0; i < $ctrl.dispositivo.normas.length; i++) {
				if ($ctrl.dispositivo.normas[i].id == norma.id) {
					$ctrl.dispositivo.normas.splice(i,1);
					$ctrl.normas.push(norma);
				}
			}
		};

		$ctrl.upload = function(nomeFoto){

			var fd = new FormData();

				angular.forEach($scope.imagem, function(file){

					fd.append('file',file);
				})
				$scope.imagem = undefined;
				$ctrl.postUpload(fd, nomeFoto);
				$scope.btnImagem = true;
		}

		$ctrl.postUpload = function(fd, nomeFoto){
						$http.post('/upload', fd,{
				transformRequest:angular.identity,
				headers: {'Content-Type':undefined}
			})
			.success(function(data){
				$ctrl.dispositivo.imagem = {
					'path':data.path,
					'nome':data.nome,
					'show':data.path.substring(7,data.path.length)
				}
				$scope.selImagem = false;
			})
			.error(function(error){
				bootbox.alert('Erro ao fazer upload!!!');
			})
		};

		$ctrl.init();
	}
})();
