(function() {
	'use strict';

	angular.module('myApp').controller('formNormaTecnicaController', Controller);

	Controller.$inject=['$routeParams', '$location', 'NormaTecnicaFactory'];

	function Controller($routeParams, $location, NormaTecnicaFactory){
		var self = this;

		self.init = function(){
			if($routeParams.normaTecnicaId){
				NormaTecnicaFactory.get($routeParams.normaTecnicaId)
				.then(function(resp){
					if(resp.data){
						self.normaTecnica = resp.data;
					}
				});
			}else{
				self.normaTecnica = {};
			}
		};
		self.salva = function(){
			if(!self.normaTecnica.id){
				save();
			}else{
					update();
			}
		};

		self.mensagem = {texto: ''};



		function save(){
			NormaTecnicaFactory.save(self.normaTecnica)
			.then(function(resp){
				if(resp.data){
					self.normaTecnica = {};
					$location.path('/normasTecnicas');
				}
			}).catch(function(erro){
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

		function update(){
			var _id = self.normaTecnica.id;
			console.log(self.normaTecnica);
			NormaTecnicaFactory.update(_id, self.normaTecnica)
			.then(function(){
				self.mensagem = {texto: 'salvo com sucesso'};
				$location.path('/normasTecnicas');
			}).catch(function(erro){
					console.log(erro);
				});;
		}

		self.remove = function(normaTecnica){
			bootbox.confirm({
				size: 'small',
				message: 'Deseja excluit esta norma técnica',
				callback: function(confirma){
					if(confirma){
          		NormaTecnicaFactory.remove(self.normaTecnica.id)
						.then(function(data){
							$location.path('/normasTecnicas')
						});
					}
				}
			});
		};

		self.init();
	}
})();
