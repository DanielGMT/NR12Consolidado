(function() {
	'use strict';

	angular.module('myApp').controller('listaLaudoController', Controller);

	Controller.$inject=['LaudoFactory', '$filter'];

	function Controller(LaudoFactory, $filter){
		var self = this;
		self.laudos = [];
		self.filtro = '';

		self.init = function(){
			buscaLaudos();
		};

		function buscaLaudos(){
			LaudoFactory.get().then(function(resp){
				if (resp.data){
					self.laudos = resp.data;
                    prepararObjeto();
				}
			});
		}

        function prepararObjeto(){
            var nome, cidade, id, ano;
            self.laudos.forEach(function(laudo){
                //ajustando exibição de datas
                //laudo.data_inicial = $filter('date')(laudo.data_inicial, 'dd/MM/yyyy', 'UTC');
                //laudo.data_final = $filter('date')(laudo.data_final, 'dd/MM/yyyy', 'UTC');
            });
        };

		self.remove = function(laudo){
			if ((laudo.status === "Aprovado")||(laudo.status === "Em Aprovação")){
				bootbox.alert({size:"small", message:"Laudo "+ laudo.status.toLowerCase() + " não pode ser excluído!"});
			}else{
				bootbox.confirm({
				size: 'small',
				message: "Deseja deletar esse Laudo?",
				callback: function(confirma){
					if (confirma) {
						LaudoFactory.remove(laudo.id)
							.then(function(data){
								buscaLaudos();

							}).catch(function(erro){
								console.log(erro);
							});
						}
					}
				});
			}
		};

        self.confirma = function(id){
            bootbox.confirm({
				size: 'small',
				message: "Deseja enviar esse laudo pra aprovação?",
				callback: function(confirma){
					if (confirma) {
						console.log("*** self.confirma");
				        LaudoFactory.confirma(id).then(function(data){
				            buscaLaudos();
				        }).catch(function(erro){
								console.log(erro);
						});
				    }
				}
            });
        }

        self.imprime = function(id){
            bootbox.confirm({
				size: 'small',
				message: "Deseja realmente imprimir esse laudo?",
				callback: function(confirma){
					if (confirma) {

						console.log("*** self.imprime");
				        LaudoFactory.imprime(id).then(function(data){
				            /*
				            var file = new Blob([data], {type:'application/pdf'});
				            var fileURL = URL.createObjectURL(file);
				            window.open(fileURL);
				            */
				            window.open(data.data);

				        }).catch(function(erro){
								console.log(erro);
						});


						// Funciona
						//window.open("http://localhost:8080/NR12/pdf/laudo1.pdf");
				    }
				}
            });
        }

         self.aprova = function(id){
            bootbox.confirm({
				size: 'small',
				message: "Deseja realmente aprovar esse laudo?",
				callback: function(confirma){
					if (confirma) {
				        LaudoFactory.aprova(id).then(function(data){
				            buscaLaudos();
				        }).catch(function(erro){
								console.log(erro);
						});
				    }
				}
            });
        }

		self.init();
	}
})();
