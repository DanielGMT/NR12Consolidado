(function() {
	'use strict';

	angular.module('myApp').controller('formLaudoController', Controller);

	Controller.$inject=['$http','$scope', '$routeParams', '$location', 'LaudoFactory', 'TipoDispositivoFactory', 'PerguntaFactory', 'ClienteFactory', 'MaquinaFactory', 'NormaTecnicaFactory', 'NormaRegFactory', 'PerigoFactory', 'RiscoFactory', '$uibModal', '$document',
    '$filter'];

	function Controller ($http, $scope, $routeParams, $location, LaudoFactory, TipoDispositivoFactory, PerguntaFactory, ClienteFactory, MaquinaFactory, NormaTecnicaFactory, NormaRegFactory, PerigoFactory, RiscoFactory, $uibModal, $document, $filter){

		$scope.btnImagem = true;
		$scope.selImagem = false;


		var self = this;


		self.init = function(){
			iniciaLaudo();
			buscaCliente();
			//buscaNormaTecnica();
			//buscaItemNorma();
			//			buscaPerigos();
		};

		function iniciaLaudo(){

			if($routeParams.laudoId){
				LaudoFactory.get($routeParams.laudoId)
				.then(function(resp){
					if(resp.data){
						self.laudo = resp.data;
						self.clienteSelecionado = self.laudo.maquina.clienteId;
						atribuiImagem();
						atribuiImagemLimite();
						atribuiImagemPontoPerigo();
						self.buscaMaquina();
						buscaNormaTecnica();
					}
				});
			}else{
				self.laudo = {
					usuarioId: "",
					dispositivos: [],
					normasTecnicas : [],
					pontoPerigos : []
				};
				buscaNormaTecnica();
				//self.laudo.data_inicial = new Date();

			}
		};

		function atribuiImagem(){
			self.laudo.dispositivos.forEach(function(disp){
				disp.imagem = {
					"show": "./dispositivos/"+disp.id+"/"+disp.imagem
				}
			});
		}

		function atribuiImagemLimite(){
			if(self.laudo.imagem){
				self.laudo.imagem = {
					"show" : "./laudos/"+self.laudo.id+"/limite/"+self.laudo.imagem
				}
			}
		}

		function atribuiImagemPontoPerigo(){
			self.laudo.pontoPerigos.forEach(function(pontop){
				if(pontop.fotopp01 != undefined){
					pontop.fotopp01 = {
						"show": "./laudos/"+self.laudo.id+"/pontoPerigo/"+pontop.id+"/fotopp01/"+pontop.fotopp01
					}
				}
				if(pontop.fotopp02 != undefined){
					pontop.fotopp02 = {
						"show": "./laudos/"+self.laudo.id+"/pontoPerigo/"+pontop.id+"/fotopp02/"+pontop.fotopp02
					}
				}
				if(pontop.fotopp03 != undefined){
					pontop.fotopp03 = {
						"show": "./laudos/"+self.laudo.id+"/pontoPerigo/"+pontop.id+"/fotopp03/"+pontop.fotopp03
					}
				}
			});
		}

		self.upload = function(nomeFoto){

			var fd = new FormData();
			if($scope.imagem !== undefined){
				angular.forEach($scope.imagem, function(file){
					fd.append('file', file);
				});

				$scope.imagem = undefined;
				self.postUpload(fd, nomeFoto);
				$scope.btnImagem = true;
			}
    	};

	    self.postUpload = function(fd, nomeFoto){
			$http.post('/upload', fd,{
				transformRequest: angular.identity,
				headers: {'Content-type': undefined}
			}).success(function(data){
				self.laudo.imagem = {
				  'path':data.path,
				  'nome':data.nome,
				  'show':data.path.substring(7,data.path.length)
				};
			}).error(function(error){
				bootbox.alert('Erro ao fazer upload!');
			});
	    };

		self.salva = function(){
			if(!self.laudo.id){
				save();
			}else{
				update();
			}
		};

		function save(){
			console.log("Laudo - Save() ");
            self.laudo.status = "Em Elaboração";
			LaudoFactory.save(self.laudo)
			.then(function(resp){
				if(resp.data){
					self.laudo = {};
					$location.path('/laudos');
				}
			});
		}

		function update(){
			//self.laudo.data_final = new Date();
			console.log("Laudo - Update() ");
			LaudoFactory.update(self.laudo.id, self.laudo).then(function(){
				//limpa o formulario
				self.laudo = {};
				$location.path('/laudos');
			});
		}

		/****************Aba Empresa*********************/
		function buscaCliente(){
			ClienteFactory.get().then(function(resp){
				if(resp.data){
					self.clientes = resp.data;
				}
			});
		}

		self.buscaMaquina = function(){
			self.maquinas = [];
			ClienteFactory.get(self.clienteSelecionado).then(function(resp){
				if(resp.data){
					self.maquinas = resp.data.maquinas;
				}
			});
		};


		/************************ Aba Ponto de Perigo **************************/
		self.filtroPontoPerigo = "";

		self.novoPontoPerigo = function(){

			self.pontoPerigo = {
				Perigos:[],
				Riscos:[],
				normas:[]
			};

			var parentElement = angular.element($document[0].querySelector('.modal-demo .modal-parent'));
			var paramPerigo = {
				animation:true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'perigosModal.html',
				controller: 'formModalPontoPerigoController',
				controllerAs: '$ctrl',
				size: 'lg',
				appendTo: parentElement,
				resolve:{
					pontoPerigo: function(){
						return self.pontoPerigo;
					}
				}
			};
			self.index = -1;
			var modalInstance = $uibModal.open(paramPerigo);
			modalInstance.result.then(function(pontoPerigo){
				self.laudo.pontoPerigos.push(pontoPerigo);
			}, function(){
				self.index = -1;
			});
		};

		self.editaPontoPerigo = function(pontoPerigo, x){
			var parentElement = angular.element($document[0].querySelector('.modal-demo .modal-parent'));
			var paramPerigo = {
				animation:true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'perigosModal.html',
				controller: 'formModalPontoPerigoController',
				controllerAs: '$ctrl',
				size: 'lg',
				appendTo: parentElement,
				resolve:{
					pontoPerigo: function(){
						return self.pontoPerigo;
					}
				}
			};
			self.index = x;
			self.pontoPerigo = {};
			self.pontoPerigo = pontoPerigo;
			var modalInstance3 = $uibModal.open(paramPerigo);
			modalInstance3.result.then(function(pontoPerigo){
				self.laudo.pontoPerigos.splice(self.index, 1, pontoPerigo);

			}, function(){
				self.index = -1;
			});
		};

		self.removePontoPerigo = function(pontoPerigo, index){

			//debugger;
			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar esse Ponto Perigo?",
				callback: function(confirma){
					//debugger;
					if (confirma) {

						if(self.laudo.destroyPontoPerigo == undefined){
							self.laudo.destroyPontoPerigo = [];
						}
						if(pontoPerigo.id){
							self.laudo.destroyPontoPerigo.push(pontoPerigo);
						}
						$scope.$apply(function(){

						self.laudo.pontoPerigos.splice(index, 1);

						});
					}
				}
			});
		};

		/************************ Aba Dispositivos **************************/
		// Inicia com o Formulário oculto
		self.filtroDispovitivos = "";

		self.novoDispositivo = function(){
			self.dispositivo = {
				normas:[]
			};

			var paramElem = angular.element($document[0].querySelector('.modal-demo .modal-parent'));
			var paramDipositivo = {
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'modalDispositivo.html',
				controller: 'formModalDispositivoController',
				controllerAs: '$ctrl',
				size:'lg',
				appendTo: paramElem,
				resolve: {
					dispositivo: function () {
						return self.dispositivo;
					}
				}
			};

			self.index = -1;
			// Mostra formulario de Dispositivo
			var modalInstance1 = $uibModal.open(paramDipositivo);
			modalInstance1.result.then(function(dispositivo) {
				self.laudo.dispositivos.push(dispositivo);
			}, function(){
				self.index = -1;
			});
		};

		self.editaDispositivo = function(dispositivo, x){
			var paramElem = angular.element($document[0].querySelector('.modal-demo .modal-parent'));
			var paramDipositivo = {
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'modalDispositivo.html',
				controller: 'formModalDispositivoController',
				controllerAs: '$ctrl',
				size:'lg',
				appendTo: paramElem,
				resolve: {
					dispositivo: function () {
						return self.dispositivo;
					}
				}
			};

			self.index = x;
			self.dispositivo = {};
			//self.dispositivo = angular.copy(dispositivo);
			self.dispositivo = dispositivo;
			// Mostra formulario de Dispositivo
			var modalInstance2 = $uibModal.open(paramDipositivo);
			modalInstance2.result.then(function(dispositivo) {
				self.laudo.dispositivos.splice(self.index, 1, dispositivo);
			}, function(){
				self.index = -1;
			});
		};

		self.removeDispositivo = function(dispositivo, index) {
			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar esse dispositivo?",
				callback: function(confirma){
					if(confirma){
						if(self.laudo.destroyDispositivos == undefined){
							self.laudo.destroyDispositivos = [];
						}
						if(dispositivo.id){
							self.laudo.destroyDispositivos.push(dispositivo);
						}
						$scope.$apply(function(){
							self.laudo.dispositivos.splice(index, 1);
						});

					}

				}
			});
		};


		/*****************************Aba Norma Tecnica****************************************/
		self.normaTecnicaSelec ="";

		self.btnIncluirNorma = true;

		self.changeNorma = function(){
			self.btnIncluirNorma = self.normaTecnicaSelec ? false : true;
		}

		function buscaNormaTecnica(){
			NormaTecnicaFactory.get().then(function(resp){
				if(resp.data){
					self.normasTecnicas = resp.data;
					for(var x = 0; x < self.laudo.normasTecnicas.length; x++){
						for(var i = 0; i< self.normasTecnicas.length; i++){
							if(self.laudo.normasTecnicas[x].id == self.normasTecnicas[i].id){
								self.normasTecnicas.splice(i,1);
							}
						}
					}
				}else{
					self.normasTecnicas = [];
				}
			});
		}

		self.adicionaNormaTecnica = function() {
			for(var i = 0; i < self.normasTecnicas.length; i++){
				if(self.normasTecnicas[i].id == self.normaTecnicaSelec.id){
					self.normasTecnicas.splice(i, 1);
				}
			};
			self.laudo.normasTecnicas.push(self.normaTecnicaSelec);
			self.btnIncluirNorma = true;
			self.normasTecnicas.Normas = self.laudo.normasTecnicas;
		};

		self.removeNorma = function(norma){
			for(var i = 0; i < self.laudo.normasTecnicas.length; i++){
				if(self.laudo.normasTecnicas[i].id == norma.id){
					self.laudo.normasTecnicas.splice(i,1);
					self.normasTecnicas.push(norma);
				}
			};
		};



			/*****************************Aba Norma LimiteMaquina****************************************/
			self.limiteMaquinaSelec ="";

			self.btnIncluirLimite = true;
	
			self.changeLimite = function(){
				self.btnIncluirLimite = self.limiteMaquinaSelec ? false : true;
			}
	
			function buscaLimiteMaquina(){
				LimiteMaquinaFactory.get().then(function(resp){
					if(resp.data){
						self.limitesMaquinas = resp.data;
						for(var x = 0; x < self.laudo.limitesMaquinas.length; x++){
							for(var i = 0; i< self.limitesMaquinas.length; i++){
								if(self.laudo.limitesMaquinas[x].id == self.limitesMaquinas[i].id){
									self.limitesMaquinas.splice(i,1);
								}
							}
						}
					}else{
						self.limitesMaquinas = [];
					}
				});
			}
	
			self.adicionaLimiteMaquina = function() {
				for(var i = 0; i < self.limitesMaquinas.length; i++){
					if(self.limitesMaquinas[i].id == self.limiteMaquinaSelec.id){
						self.limitesMaquinas.splice(i, 1);
					}
				};
				self.laudo.limitesMaquinas.push(self.limiteMaquinaSelec);
				self.btnIncluirNorma = true;
				self.limitesMaquinas.Normas = self.laudo.limitesMaquinas;
			};
	
			self.removeLimite = function(norma){
				for(var i = 0; i < self.laudo.limitesMaquinas.length; i++){
					if(self.laudo.limitesMaquinas[i].id == norma.id){
						self.laudo.limitesMaquinas.splice(i,1);
						self.limitesMaquinas.push(norma);
					}
				};
			};
	

		self.init();
	}

})();
