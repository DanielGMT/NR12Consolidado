(function() {
	'use strict';

	angular.module('myApp').directive('validate', Validate);

  	Validate.$inject = ['$compile'];

	function Validate($compile){
		return {
			restrict: "A",
			require: "ngModel",
			priority: 5000,
			link: function(scope, element, attr, mCtrl){

				var novaLabel;
				var label = element.closest(".form-group").find("label[for='"+attr.id+"']").text();
				var html = "<div ng-messages='" + element[0].form.name + "." + mCtrl.$name + ".$error' ng-if='!" + element[0].form.name + "."
						+ mCtrl.$name + ".$pristine'>";

				if (label.indexOf("*") != -1){
					novaLabel = label.substring(0,label.indexOf("*"));
				}else{
					novaLabel = label;
				}
				novaLabel = novaLabel.toLowerCase();


				for(var x in element[0].attributes){

					if(element[0].attributes[x].name == "ng-minlength"){
						html += "<p class='help-block' ng-message='minlength'>O campo "+ novaLabel +" deve ter no mínimo "+ element[0].attributes[x].value +" caracteres.</p>";
					}
					if(element[0].attributes[x].name == "ng-maxlength"){
						html += "<p class='help-block' ng-message='maxlength'>O campo "+ novaLabel +" deve ter no máximo "+ element[0].attributes[x].value +" caracteres.</p>";
					}
					if(element[0].attributes[x].name == "ng-max"){
						html += "<p class='help-block' ng-message='max'>O campo "+ novaLabel +" deve ser menor ou igual a "+ element[0].attributes[x].value +" .</p>";
					}
					if(element[0].attributes[x].name == "ng-min"){
						html += "<p class='help-block' ng-message='min'>O campo "+ novaLabel +" deve ser maior ou igual a "+ element[0].attributes[x].value +" .</p>";
					}
					if(element[0].attributes[x].name == "ng-pattern"){
						html += "<p class='help-block' ng-message='pattern'>Caracteres especiais não são permitidos</p>";
					}
					if(element[0].localName == "select" && element[0].attributes[x].name == "required"){
						html += "<p class='help-block' ng-message='required'>O campo "+ novaLabel +" deve ser selecionado.</p>";
					}
					if(element[0].localName == "select" && element[0].attributes[x].name == "ng-required"){
						html += "<p class='help-block' ng-message='required'>O campo "+ novaLabel +" deve ser selecionado.</p>";
					}
					if(element[0].attributes[x].name == "required"){

						html += "<p class='help-block' ng-message='required'>O campo "+ novaLabel +" deve ser preenchido.</p>";
					}
					if(element[0].attributes[x].value == "email"){
						html += "<p class='help-block' ng-message='email'>Informe um e-mail válido.</p>";
					}
				}

				html += "</div>";

				var template = angular.element(html);
				var linkFn = $compile(template);
				var content = linkFn(scope);
				element.after(content);

			}

		};
	}

})();
