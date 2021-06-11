'use strict';
var models = require('../models');
module.exports = function (app) {

	//var Risco = models.risco;
	var controller = {};

	controller.listaRisco = function(req, res) {
		models.Risco.all().then(
			function(data){
				res.json({'data':data||[], 'status':'success'});
			}
		).catch(function(erro){
			console.error(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error','error':erro});
		});
	};

	controller.obtemRisco = function(req, res){
		models.Risco.findById(req.params.id).then(
			function(data){
				if(!data) throw new Error("Risco não encontrado");
				res.json({'data':data, 'status':'success'});
			}
		).catch(function(erro){
			res.status(404).json({'status':'error', 'message':erro.message||'Internal Server Error', 'error':erro});
		});
	};

	controller.removeRisco = function(req, res){
		models.Risco.destroy({where:{"id":req.params.id}}).then(
			function(data){
				res.json({'status':'success', 'message':'Removido com sucesso', 'data':data});
			}
		).catch(function(erro){
			console.error(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});
	};

	controller.salvaRisco = function(req, res){
		models.Risco.findOne({
			where:{
				nome: req.body.nome
			}
		}).then(function(data){
			res.status(500).json({'status':'error', 'message':'O Risco '+data.nome+' já se encontra cadastrado', 'erro':data});
		}).catch(function(erro){
			models.Risco.create(req.body).then(
				function(data){
					res.status(201).json({'status':'success', 'message':'Salvo com sucesso.', 'data':data});
				}
			).catch(function(erro){
					res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
				});
		 })
	};

	controller.updateRisco = function (req, res){
		models.Risco.findOne({where:{nome:req.body.nome}}).then(function(data){
			if(req.body.id == data.id){
				models.Risco.update(req.body, {fields:['nome', 'descricao'], where:{'id':req.body.id}}).then(
						function(data){
							res.json({'status':'success', 'message':'Alterado com sucesso.', 'data':data});
						}
					).catch(function(erro){
						console.error(erro);
						res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
					});
			}
			if(req.body.id != data.id){
				res.status(500).json({'status':'error', 'message':'O Risco '+data.nome+' já se encontra cadastrado', 'erro':data});
			}
		}).catch(function(erro){
			models.Risco.update(req.body, {fields:['nome', 'descricao'], where:{'id':req.body.id}}).then(
					function(data){
						res.json({'status':'success', 'message':'Alterado com sucesso.', 'data':data});
					}
				).catch(function(erro){
					console.error(erro);
					res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
				});
		});

	};

	return controller;
};
