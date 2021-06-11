 (function() {
	'use strict';

	angular.module('myApp').controller('formClienteController', Controller);

	Controller.$inject=['$http','$scope','$routeParams', '$location', 'ClienteFactory', 'uppercaseFilter'];

	function Controller($http, $scope, $routeParams, $location, ClienteFactory, uppercaseFilter){
    
    	//Inicia os botões de upload
    	$scope.btnImagem = true;
    	$scope.selImagem = false;

		var self = this;

		self.init = function(){

			if($routeParams.clienteId){
				ClienteFactory.get($routeParams.clienteId)
					.then(function(resp){
						if(resp.data){
							self.cliente = resp.data;
              if(self.cliente.imagem !== undefined){
                self.cliente.imagem = {
                  show:"./cliente/"+self.cliente.id+"/imagem/"+self.cliente.imagem
                }
              }
						}
					});
			}else{
				self.cliente = {};
			}
		};

    self.upload = function(nomeFoto){
// debugger

      var fd = new FormData();


      if($scope.imagem !== undefined){
         angular.forEach($scope.imagem, function(file){

           fd.append('file', file);
         })

        $scope.imagem = undefined;
        self.postUpload(fd, nomeFoto);
        $scope.btnImagem = true;
      }
    };

    self.postUpload = function(fd, nomeFoto){
    //  debugger
      console.log(fd);
      $http.post('/upload', fd,{
        transformRequest: angular.identity,
        headers: {'Content-type': undefined}
      })
      .success(function(data){

        self.cliente.imagem = {
          'path':data.path,
          'nome':data.nome,
          'show':data.path.substring(7,data.path.length)
        };
        console.log(self.cliente.imagem);
      })
      .error(function(error){
        bootbox.alert('Erro ao fazer upload!')
      })
    };

		self.salva = function(){
      self.cliente.estado = uppercaseFilter(self.cliente.estado);

			if(!self.cliente.id){
				save();
			}
      if(self.cliente.id){
        update();
      }
    };

		function save(){
			ClienteFactory.save(self.cliente)
				.then(function(resp){
					if(resp.data){
						//limpa o formulario
						self.cliente = {};
						$location.path('/clientes');
					}
				});
		}

		function update(){


    	ClienteFactory.update(self.cliente.id, self.cliente)
				.then(function(){
					//limpa o formulario
					self.cliente = {};
					$location.path('/clientes');
				});
		}

		self.remove = function(cliente){
			bootbox.confirm({
				size: 'small',
				message: "Deseja deletar essa Cliente?",
				callback: function(confirma){
					if (confirma) {
						ClienteFactory.remove(cliente.id)
							.then(function(data){
								$location.path('/clientes');
							});
					}
				}
			});
		};
		self.init();
	}
})();
