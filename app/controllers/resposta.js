'use strict';
var models = require('../models');
module.exports = function(app){

	var Resposta = models.Resposta;

	var controller = {};

	controller.listaTodos = function(req, res){
		//Resposta.findAll().then(
		Resposta.all().then(
			function(data){
				res.json({'data':data || [], 'status':'success'});
			}
		);
	};

	controller.obtemResposta = function(req, res){
		var _id = req.params.id;
		Resposta.findById(_id).then(
			function(data){
				if(!data) throw new Error("Resposta não encontrado");
					res.json({'data':data, 'status':'success'});
			}
		).catch(function(erro){
			//console.error(erro);
			res.status(404).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
		});
	};

	/*
	controller.removeResposta2 = function(req, res){
		Resposta.findById(req.params.id).then(
			function(capacitacao){
				capacitacao.destroy().then(
					function(data){
						//res.end();
						res.json(data);
						//res.json({'status':'success', 'data':data});
					}
				).catch(function(erro){
					//console.error(erro);
					res.status(500).json({'status':'error', 'message':'Internal Server Error', 'data':erro});
				});
			}
		).catch(function(erro){
			//console.log(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error'});
		});
	};
	*/

	controller.remove = function(req, res){
		Resposta.destroy({where:{"id":req.params.id}}).then(
			function(data){
				//res.end();
				//res.json({'status':'success', 'data':data});
				res.json({'status':'success', 'message': 'Removido com sucesso.'});
			}
		).catch(function(erro){
			//console.error(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});
	};

	controller.salva = function(req, res){
		Resposta.create(req.body).then(

			function(data){
				
				res.status(201).json({'status':'success', 'message':'Salvo com sucesso.', 'data':data});
			}
		).catch(function(erro){
			console.error(erro);
			//res.status(500).json(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});
	};

	controller.update = function(req, res){
		Resposta.update(
			req.body,
			{fields:['resposta'],where:{'id':req.params.id}}
		).then(function(data){
			//console.log(data);
			//res.end();
			res.json({'status':'success', 'message':'Alterado com sucesso.', 'data':data});
		}).catch(function(erro){
			//console.error(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});

	};
	return controller;
};
