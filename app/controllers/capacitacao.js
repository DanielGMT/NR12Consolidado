'use strict';
var models = require('../models');
module.exports = function(app){

	var Capacitacao = models.Capacitacao;
	var controller = {};

	controller.listaTodos = function(req, res){
		//Capacitacao.findAll().then(
		Capacitacao.all().then(
			function(data){
				res.json({'data':data || [], 'status':'success'});
			}
		);
	};

	controller.obtemCapacitacao = function(req, res){
		var _id = req.params.id;
		Capacitacao.findById(_id).then(
			function(data){
				if(!data) throw new Error("Capacitacao não encontrado");
					res.json({'data':data, 'status':'success'});
			}
		).catch(function(erro){
			console.log(erro);

			res.status(404).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
		});
	};

	controller.removeCapacitacao = function(req, res){
		Capacitacao.destroy({where:{"id":req.params.id}}).then(
			function(data){
				//res.end();
				//res.json({'status':'success', 'data':data});
				res.json({'status':'success', 'message': 'Removido com sucesso.'});
			}
		).catch(function(erro){
			console.error(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});
	};

	controller.salvaCapacitacao = function(req, res){
			models.Capacitacao.findOne({where:{nome:req.body.nome}}).then(function(data){
			res.status(500).json({'status':'error', 'message':'A Capacitação '+data.nome+' já se encontra cadastrada', 'erro':data});
		}).catch(function(erro){
			Capacitacao.create(req.body).then(
				function(data){
					res.status(201).json({'status':'success', 'message':'Salvo com sucesso.', 'data':data});
				}
			).catch(function(erro){
				console.error(erro);
				res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
			});
		});
	};

	controller.updateCapacitacao = function(req, res){

		 models.Capacitacao.findOne({where:{nome: req.body.nome}}).then(function(data){

			if(req.body.id == data.id){

					Capacitacao.update(
							req.body,{fields:['nome','descricao'],where:{'id':req.params.id}}
					).then(function(data){
						res.status(201).json({'status':'success', 'message':'Alterado com sucesso.', 'data':data});
					}).catch(function(erro){
				 			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
					});
					//res.status(201).json({'status':'success', 'message':'Alterado com sucesso.', 'data':data});
			}
			if(req.body.id != data.id){
					res.status(500).json({'status':'error', 'message':'A Capacitação '+data.nome+' já se encontra cadastrada', 'erro':data});
			}

		 }).catch(function(erro){

					Capacitacao.update(
 							req.body,{fields:['nome','descricao'],where:{'id':req.params.id}}
 					).then(function(data){
 						res.status(201).json({'status':'success', 'message':'Alterado com sucesso.', 'data':data});
 					}).catch(function(erro){
 				 			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
 					});
   	 });
	};
	return controller;
};
