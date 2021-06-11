'use strict';
var models = require('../models');
module.exports = function(app){

	var Dispositivo = models.dispositivo;

	var controller = {};

	controller.listaTodos = function(req, res){
		//Dispositivo.findAll().then(
		Dispositivo.all().then(
			function(data){
				res.json({'data':data || [], 'status':'success'});
			}
		);
	};

	controller.obtemDispositivo = function(req, res){
		var id = req.params.id;
		Dispositivo.findById(id).then(
			function(data){
				if(!data) throw new Error("Dispositivo não encontrado");
				//res.json(data);
				res.json({'data':data, 'status':'success'});
			}
		).catch(function(erro){
			//console.error(erro);
			res.status(404).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
		});
	};

	/*
	controller.removeDispositivo2 = function(req, res){
		Dispositivo.findById(req.params.id).then(
			function(dispositivo){
				dispositivo.destroy().then(
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

	controller.removeDispositivo = function(req, res){
		Dispositivo.destroy({where:{"id":req.params.id}}).then(
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

	controller.salvaDispositivo = function(req, res){
		Dispositivo.create(req.body).then(
			function(data){
				res.status(201).json({'status':'success', 'message':'Salvo com sucesso.', 'data':data});
			}
		).catch(function(erro){
			console.error(erro);
			//res.status(500).json(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});
	};

	controller.updateDispositivo = function(req, res){
		Dispositivo.update(
			req.body,
			{fields:['nome','descricao'],where:{'id':req.params.id}}
		).then(function(data){
			console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuupdate');
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
