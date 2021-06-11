(function() {
	'use strict';

	angular.module('myApp', ['ngStorage', 'ngRoute', 'ngResource', 'ngMessages', 'ui.bootstrap',
			'ui.mask', 'toaster', 'ngAnimate', 'ngCookies', 'ngCpfCnpj', 'base64', 'checklist-model'])
		.config(config)
		.run(run);

		run.$inject = ['$rootScope', '$localStorage', '$location'];
		function run($rootScope, $localStorage, $location){
			$rootScope.$on('$routeChangeStart', function (event, next, current){
				if(next.authorize){
					if(!$localStorage.token){
                        $rootScope.$evalAsync(function () {
                            $location.path('/login');
                        });
					}
				}
			});
		}

		config.$inject = ['$routeProvider'];
		function config($routeProvider){

			/* Clientes */
			$routeProvider.when('/clientes',{
				templateUrl: 'partials/cliente/listaCliente.html',
				controller: 'listaClienteController as controller',
				authorize: true
			});
			$routeProvider.when('/cliente',{
				templateUrl: 'partials/cliente/formCliente.html',
				controller: 'formClienteController as controller',
				authorize: true
			});
			$routeProvider.when('/cliente/:clienteId',{
				templateUrl: 'partials/cliente/formCliente.html',
				controller: 'formClienteController as controller',
				authorize: true
			});
			$routeProvider.when('/cliente/view/:clienteId',{
				templateUrl: 'partials/cliente/viewCliente.html',
				controller: 'formClienteController as controller',
				authorize: true
			});

			/* Tipo Máquina */
			$routeProvider.when('/tiposMaquinas',{
				templateUrl: 'partials/tipoMaquina/listaTipoMaquina.html',
				controller: 'listaTipoMaquinaController as controller',
                authorize: true
			});
			$routeProvider.when('/tipoMaquina',{
				templateUrl: 'partials/tipoMaquina/formTipoMaquina.html',
				controller: 'formTipoMaquinaController as controller',
                authorize: true
			});
			$routeProvider.when('/tipoMaquina/:tipoMaquinaId',{
				templateUrl: 'partials/tipoMaquina/formTipoMaquina.html',
				controller: 'formTipoMaquinaController as controller',
                authorize: true
			});
			$routeProvider.when('/tipoMaquina/view/:tipoMaquinaId',{
				templateUrl: 'partials/tipoMaquina/viewTipoMaquina.html',
				controller: 'formTipoMaquinaController as controller',
                authorize: true
			});

			/* Sistema de Segurança */
			$routeProvider.when('/sistemasSeguranca',{
				templateUrl : 'partials/sistemaSeguranca/listaSistemaSeguranca.html',
				controller : 'listaSistemaSegurancaController as controller',
                authorize: true
			});
			$routeProvider.when('/sistemaSeguranca',{
				templateUrl: 'partials/sistemaSeguranca/formSistemaSeguranca.html',
				controller: 'formSistemaSegurancaController as controller',
                authorize: true
			});
			$routeProvider.when('/sistemaSeguranca/:sistemaSegurancaId',{
				templateUrl: 'partials/sistemaSeguranca/formSistemaSeguranca.html',
				controller: 'formSistemaSegurancaController as controller',
                authorize: true
			});
			$routeProvider.when('/sistemaSeguranca/view/:sistemaSegurancaId',{
				templateUrl: 'partials/sistemaSeguranca/viewSistemaSeguranca.html',
				controller: 'formSistemaSegurancaController as controller',
                authorize: true
			});

			/* Perigos */
			$routeProvider.when('/perigos', {
				templateUrl : 'partials/perigo/listaPerigo.html',
				controller : 'listaPerigoController as controller',
                authorize: true
			});
			$routeProvider.when('/perigo',{
				templateUrl: 'partials/perigo/formPerigo.html',
				controller: 'formPerigoController as controller',
                authorize: true
			});
			$routeProvider.when('/perigo/:perigoId',{
				templateUrl: 'partials/perigo/formPerigo.html',
				controller: 'formPerigoController as controller',
                authorize: true
			});
			$routeProvider.when('/perigo/view/:perigoId',{
				templateUrl: 'partials/perigo/viewPerigo.html',
				controller: 'formPerigoController as controller',
                authorize: true
			});

			/* Riscos */
			$routeProvider.when('/riscos',{
				templateUrl : 'partials/risco/listaRisco.html',
				controller : 'listaRiscoController as controller',
                authorize: true
			});
			$routeProvider.when('/risco',{
				templateUrl: 'partials/risco/formRisco.html',
				controller: 'formRiscoController as controller',
                authorize: true
			});
			$routeProvider.when('/risco/:riscoId',{
				templateUrl: 'partials/risco/formRisco.html',
				controller: 'formRiscoController as controller',
                authorize: true
			});
			$routeProvider.when('/risco/view/:riscoId',{
				templateUrl: 'partials/risco/viewRisco.html',
				controller: 'formRiscoController as controller',
                authorize: true
			});

			/* Normas*/
			$routeProvider.when('/itens',{
				templateUrl: 'partials/normaReg/listaItem.html',
				controller: 'listaNormaRegController as controller',
                authorize: true
			});
			$routeProvider.when('/item',{
				templateUrl: 'partials/normaReg/formItem.html',
				controller: 'formNormaRegController as controller',
                authorize: true
			});
			$routeProvider.when('/item/:itemId',{
				templateUrl: 'partials/normaReg/formItem.html',
				controller: 'formNormaRegController as controller',
                authorize: true
			});
				$routeProvider.when('/item/view/:itemId',{
				templateUrl: 'partials/normaReg/viewItem.html',
				controller: 'formNormaRegController as controller',
                authorize: true
			});

			/*Lista Norma*/
			$routeProvider.when('/normasTecnicas',{
				templateUrl: 'partials/normaTecnica/listaNormaTecnica.html',
				controller: 'listaNormaTecnicaController as controller',
                authorize: true
			});
			$routeProvider.when('/normaTecnica',{
				templateUrl: 'partials/normaTecnica/formNormaTecnica.html',
				controller: 'formNormaTecnicaController as controller',
                authorize: true
			});
			$routeProvider.when('/normaTecnica/:normaTecnicaId',{
				templateUrl: 'partials/normaTecnica/formNormaTecnica.html',
				controller: 'formNormaTecnicaController as controller',
                authorize: true
			});
				$routeProvider.when('/normaTecnica/view/:normaTecnicaId',{
				templateUrl: 'partials/normaTecnica/viewNormaTecnica.html',
				controller: 'formNormaTecnicaController as controller',
                authorize: true
			});

			/* Capacitacao */
			$routeProvider.when('/capacitacoes',{
				templateUrl: 'partials/capacitacao/listaCapacitacao.html',
				controller: 'listaCapacitacaoController as controller',
                authorize: true
			});
			$routeProvider.when('/capacitacao',{
				templateUrl: 'partials/capacitacao/formCapacitacao.html',
				controller: 'formCapacitacaoController as controller',
                authorize: true
			});
			$routeProvider.when('/capacitacao/:capacitacaoId',{
				templateUrl: 'partials/capacitacao/formCapacitacao.html',
				controller: 'formCapacitacaoController as controller',
                authorize: true
			});
			$routeProvider.when('/capacitacao/view/:capacitacaoId',{
				templateUrl: 'partials/capacitacao/viewCapacitacao.html',
				controller: 'formCapacitacaoController as controller',
                authorize: true
			});

			/* Usuarios */
			$routeProvider.when('/usuarios',{
				templateUrl: 'partials/usuario/listaUsuario.html',
				controller: 'listaUsuarioController as controller',
                authorize: false
			});
			$routeProvider.when('/usuario',{
				templateUrl: 'partials/usuario/formUsuario.html',
				controller: 'formUsuarioController as controller',
                authorize: false
			});
			$routeProvider.when('/usuario/password',{
				templateUrl: 'partials/usuario/formPassword.html',
				controller: 'passwordController as controller',
                authorize: false
			});
			$routeProvider.when('/usuario/:usuarioId',{
				templateUrl: 'partials/usuario/formUsuario.html',
				controller: 'formUsuarioController as controller',
                authorize: false
			});
			$routeProvider.when('/usuario/view/:usuarioId',{
				templateUrl: 'partials/usuario/viewUsuario.html',
				controller: 'formUsuarioController as controller',
                authorize: false
			});
			$routeProvider.when('/login',{
				templateUrl: 'partials/login.html',
				controller: 'loginController as controller',
				authorize: false
			});


			/* Laudos */
			$routeProvider.when('/laudos',{
				templateUrl: 'partials/laudo/listaLaudo.html',
				controller: 'listaLaudoController as controller',
                authorize: true
			});
			$routeProvider.when('/laudo',{
				templateUrl: 'partials/laudo/formLaudo.html',
				controller: 'formLaudoController as controller',
                authorize: true
			});
			$routeProvider.when('/laudo/:laudoId',{
				templateUrl: 'partials/laudo/formLaudo.html',
				controller: 'formLaudoController as controller',
                authorize: true
			});
			$routeProvider.when('/laudo/view/:laudoId',{
				templateUrl: 'partials/laudo/viewLaudo.html',
				controller: 'formLaudoController as controller',
                authorize: true
			});

			/* Maquinas */
			$routeProvider.when('/maquinas',{
				templateUrl: 'partials/maquina/listaMaquina.html',
				controller: 'listaMaquinaController as controller',
                authorize: true
			});
			$routeProvider.when('/maquina',{
				templateUrl: 'partials/maquina/formMaquina.html',
				controller: 'formMaquinaController as controller',
                authorize: true
			});
			$routeProvider.when('/maquina/:maquinaId',{
				templateUrl: 'partials/maquina/formMaquina.html',
				controller: 'formMaquinaController as controller',
                authorize: true
			});
			$routeProvider.when('/maquina/view/:maquinaId',{
				templateUrl: 'partials/maquina/viewMaquina.html',
				controller: 'formMaquinaController as controller',
                authorize: true
			});

			/* Portaria */
			$routeProvider.when('/portarias',{
				templateUrl: 'partials/portaria/viewPortaria.html',
				controller: 'listaPortariaController as controller',
                authorize: true
			});
			$routeProvider.when('/portaria',{
				templateUrl: 'partials/portaria/formPortaria.html',
				controller: 'formPortariaController as controller',
                authorize: true
			});

			/* Disposições Finais */
			$routeProvider.when('/disposicoesFinais',{
				templateUrl: 'partials/disposicoesFinais/viewDisposicoesFinais.html',
				controller: 'listaDisposicoesFinaisController as controller',
                authorize: true
			});
			$routeProvider.when('/disposicaoFinal',{
				templateUrl: 'partials/disposicoesFinais/formDisposicoesFinais.html',
				controller: 'formDisposicoesFinaisController as controller',
                authorize: true
			});

			/* Dispositivos */
			$routeProvider.when('/dispositivos',{
				templateUrl: 'partials/dispositivo/viewDispositivo.html',
				controller: 'listaDispositivoController as controller',
                authorize: true
			});
			$routeProvider.when('/dispositivo',{
				templateUrl: 'partials/dispositivo/formDispositivo.html',
				controller: 'formDispositivoController as controller',
                authorize: true
			});

			/*REsponsabilidade Tecnica*/
			$routeProvider.when('/respTecnicas',{
				templateUrl: 'partials/respTecnica/viewRespTecnica.html',
				controller: 'listaRespTecnicaController as controller',
                authorize: true
			});

			$routeProvider.when('/respTecnica',{
				templateUrl: 'partials/respTecnica/formRespTecnica.html',
				controller: 'formRespTecnicaController as controller',
                authorize: true
			});

			/* Questionarios Dispositivos */
			$routeProvider.when('/tiposDispositivos',{ // Lista
				templateUrl: 'partials/tipoDispositivos/listaTipoDispositivo.html',
				controller: 'listaTipoDispositivoController as controller',
                authorize: true
			});
			$routeProvider.when('/tipoDispositivo',{ // formulario cadastro
				templateUrl: 'partials/tipoDispositivos/formTipoDispositivo.html',
				controller: 'formTipoDispositivoController as controller',
                authorize: true
			});
			$routeProvider.when('/tipoDispositivo/:tipoDispositivoId',{ // formulario cadastro edit
				templateUrl: 'partials/tipoDispositivos/formTipoDispositivo.html',
				controller: 'formTipoDispositivoController as controller',
                authorize: true
			});
			$routeProvider.when('/tipoDispositivo/:tipoDispositivoId/perguntas',{ // lista as perguntas do tipo dispositivo
				templateUrl: 'partials/tipoDispositivos/listaQuestionario.html',
				controller: 'listaQuestionarioController as controller',
                authorize: true
			});
			$routeProvider.when('/tipoDispositivo/:tipoDispositivoId/pergunta',{ // formulario cadastro pergunta
				templateUrl: 'partials/tipoDispositivos/formPergunta.html',
				controller: 'formPerguntaController as controller',
                authorize: true
			});
			$routeProvider.when('/tipoDispositivo/:tipoDispositivoId/pergunta/:perguntaId',{ // formulario cadastro pergunta
				templateUrl: 'partials/tipoDispositivos/formPergunta.html',
				controller: 'formPerguntaController as controller',
                authorize: true
			});


			/*Tipo de Dispositivo*/
			// $routeProvider.when('/tipoDispositivos',{
			// 	templateUrl: 'partials/tipoMaquina/listaTipoMaquina.html',
			// 	controller: 'listaTipoDispositivoController as controller'
			// });
			// $routeProvider.when('/tipoDispositivo',{
			// 	templateUrl: 'partials/tipoMaquina/formTipoMaquina.html',
			// 	controller: 'formTipoDispositivoController as controller'
			// });

			/* Home */
			$routeProvider.when('/home',{
				templateUrl: 'partials/home.html',
				controller: 'HomeController as controller',
				authorize: true
			});

			$routeProvider.otherwise({redirectTo: '/home'});
	}

})();
