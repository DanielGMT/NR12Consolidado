'use strict'
var models = require('../models');
module.exports = function(app){

	var Configuracoes = models.Configuracoes;

	var controller = {};

	controller.updatePortaria = function(req, res){
		Configuracoes.update(
			req.body,
			{fields:['portaria'], where:{'id':1}}
		).then(function(data){
			res.json({'status':'success', 'message':'alterado com sucesso.', 'data': data});
		}).catch(function(erro){
			res.status(500).json({'status':'success', 'message':'Internal Server Error', 'error': erro});
		});
	};

	controller.listaPortaria = function(req, res){

		Configuracoes.findOne({attributes:['portaria']}).then(
			function(data){
				if(!data) throw new Error("Portaria não encontrada");
				res.json({'data':data || [], 'status':'success'});
			}
		).catch(function(error){
			res.status(404).json({'status':'error', 'message': error.message||'Internal Server Error', 'Error': error});
		});
	};

	controller.updateDispositivo = function(req, res){
		Configuracoes.update(
			req.body,
			{fields:['dispositivos'], where:{'id':1}}
		).then(function(data){
			res.json({'status':'success', 'message':'alterado com sucesso.', 'data': data});
		}).catch(function(erro){
			res.status(500).json({'status':'success', 'message':'Internal Server Error', 'error': erro});
		});
	};

	controller.listaDispositivo = function(req, res){

		//Capacitacao.findAll().then(
		Configuracoes.findOne({attributes:['dispositivos']}).then(
			function(data){
				if(!data) throw new Error("Dispositivo não encontrada");
				res.json({'data':data || [], 'status':'success'});
			}
		).catch(function(error){
			res.status(404).json({'status':'error', 'message': error.message||'Internal Server Error', 'Error': error});
		});
	};

	controller.updateRespTec = function(req, res){
		Configuracoes.update(
			req.body,
			{fields:['resptecnica'], where:{'id':1} }
		).then(function(data){
			res.json({'status':'success', 'message':'alterado com sucesso.', 'data': data});
		}).catch(function(erro){
			res.status(500).json({'status':'success', 'message':'Internal Server Error', 'error': erro});
		});
	};

	controller.listaRespTecnica = function(req, res){

		//Capacitacao.findAll().then(
		Configuracoes.findOne({attributes:['resptecnica']}).then(
			function(data){
				if(!data) throw new Error("Responsabilidade Técnica não encontrada");
				res.json({'data':data || [], 'status':'success'});
			}
		).catch(function(error){
			res.status(404).json({'status':'error', 'message': error.message||'Internal Server Error', 'Error': error});
		});
	};

	controller.updateDisposicoesFinais = function(req, res){
		
		Configuracoes.update(
			req.body,
			{fields:['disposicaofinal'], where:{'id':1}}
		).then(function(data){
			res.json({'status':'success', 'message':'alterado com sucesso.', 'data': data});
		}).catch(function(erro){
			res.status(500).json({'status':'success', 'message':'Internal Server Error', 'error': erro});
		});
	};

	controller.listaDisposicoesFinais = function(req, res){

		Configuracoes.findOne({attributes:['disposicaofinal']}).then(
			function(data){
				if(!data) throw new Error("Disposições finais não encontrada");
				res.json({'data':data || [], 'status':'success'});
			}
		).catch(function(error){
			res.status(404).json({'status':'error', 'message': error.message||'Internal Server Error', 'Error': error});
		});
	};


	return controller;
};
