(function() {
	'use strict';

	angular.module('myApp').directive('fileInput', ['$parse', function($parse){
		return {
			restrict: 'A',
			link: function(scope,elm,attrs){

				elm.bind('change',function(){
					//debugger;
					$parse(attrs.fileInput).assign(scope,elm[0].files);

					if (elm[0].id === "fotofront"){
						if (elm[0].files.length > 0){
							scope.btnFotoFront = false;
							scope.selFotoLe    = true;
							scope.selFotoLd    = true;
							scope.selFotoPost  = true;
						}else{
							scope.btnFotoFront = true;
							scope.selFotoLe    = false;
							scope.selFotoLd    = false;
							scope.selFotoPost  = false;
						}

					}
					if (elm[0].id === "fotole"){
						if (elm[0].files.length > 0){
							scope.btnFotoLe    = false;
							scope.selFotoFront = true;
							scope.selFotoLd    = true;
							scope.selFotoPost  = true;
						}else{
							scope.btnFotoLe    = true;
							scope.selFotoFront = false;
							scope.selFotoLd    = false;
							scope.selFotoPost  = false;
						}

					}
					if (elm[0].id === "fotold"){
						if (elm[0].files.length > 0){
							scope.btnFotoLd    = false;
							scope.selFotoFront = true;
							scope.selFotoLe    = true;
							scope.selFotoPost  = true;
						}else{
							scope.btnFotoLd    = true;
							scope.selFotoFront = false;
							scope.selFotoLe    = false;
							scope.selFotoPost  = false;
						}
					}
					if (elm[0].id === "fotopost"){
						if (elm[0].files.length > 0){
							scope.btnFotoPost  = false;
							scope.selFotoFront = true;
							scope.selFotoLe    = true;
							scope.selFotoLd    = true;
						}else{
							scope.btnFotoPost  = true;
							scope.selFotoFront = false;
							scope.selFotoLe    = false;
							scope.selFotoLd    = false;
						}

					}

					/**********Upload Ponto Perigo********************/

					if (elm[0].id === "fotopp01"){
						if (elm[0].files.length > 0){
							scope.btnFotoPP01 = false;
							scope.selFotoPP02 = true;
							scope.selFotoPP03 = true;
							}else{
							scope.btnFotoPP01 = true;
							scope.selFotoPP02 = false;
							scope.selFotoPP03 = false;
						}
					}

					if (elm[0].id === "fotopp02"){
						if (elm[0].files.length > 0){
							scope.btnFotoPP02 = false;
							scope.selFotoPP01 = true;
							scope.selFotoPP03 = true;
							}else{
							scope.btnFotoPP02 = true;
							scope.selFotoPP01 = false;
							scope.selFotoPP03 = false;
						}
					}

					if (elm[0].id === "fotopp03"){
						if (elm[0].files.length > 0){
							scope.btnFotoPP03 = false;
							scope.selFotoPP01 = true;
							scope.selFotoPP02 = true;
							}else{
							scope.btnFotoPP03 = true;
							scope.selFotoPP01 = false;
							scope.selFotoPP02 = false;
						}
					}


					if (elm[0].id === "imagem"){
						if (elm[0].files.length > 0){
							scope.btnImagem  = false;
						}else{
							scope.btnImagem  = true;
						}
					}
					scope.$apply()
				})
			}
		}
	}]);

})();
