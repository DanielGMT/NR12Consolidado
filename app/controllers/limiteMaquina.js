'use strict';
var models = require('../models');
module.exports = function(app){
	var LimiteMaquina = models.LimiteMaquina;
	var controller = {};

	controller.listaTodos = function(req, res){
		controller.listaTodos = function(req, res){
		//Capacitacao.findAll().then(
		Capacitacao.all().then(
			function(data){
				res.json({'data':data || [], 'status':'success'});
			}
		);
	};
		models.LimiteMaquina.all().then(
			function(data){
						res.json({'data':data||[], 'status':'success'});
						}
					).catch(function(erro){
				console.error(erro);
				res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error': erro});
				});
	};

	controller.obtemLimiteMaquina = function(req, res){
			models.LimiteMaquina.findOne({
			where: {
				id: req.params.id
			}
		}).then(
			function(data){
				console.error(data.nome);
				if(!data) throw new Error("Limite de maquina não encontrado");
				res.json({'data':data, 'status':'success'});
			}
		).catch(function(erro){
			console.log(erro);
			res.status(500).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
		});
	};

	controller.removeLimiteMaquina = function(req, res){
		var _id = req.params.id;

		LimiteMaquina.destroy({where:{"id": _id}}).then(
			function(data){
			res.json({'status':'success', 'message':'Removido com sucesso.', 'data':data});
			}
		).catch(function(erro){
			//console.error(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});
	};

	controller.salvaLimiteMaquina = function(req, res){

		models.LimiteMaquina.findOne({
			where: {
				nome: req.body.nome
			}
		}).then(function(data){
			 res.status(500).json({'status':'error', 'message':'O Limite de Máquina '+data.nome+' já se encontra cadastrado', 'erro':data});
		}).catch(function(erro){
			//res.status(500).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
			LimiteMaquina.create(req.body).then(function(data){
					res.status(201).json({'status': 'success', 'message':'Salvo com sucesso.', 'data': data});
				}).catch(function(erro){
				  console.error(erro);
					res.status(500).json({'status':'error', 'message':'Internal server error', 'erro':erro});
			});
		});
	};

	controller.updateLimiteMaquina = function(req, res){
		models.LimiteMaquina.findOne({where:{nome:req.body.nome}}).then(function(data){
			if(req.body.id == data.id){
				console.log("PARAM ID", req.body.id);
				console.log("DATA ID", data.id);
				console.log("IGUAL");
				models.LimiteMaquina.update(
					req.body,{fields:['nome', 'descricao'], where:{'id':req.params.id}}
				).then(function(data){
					res.status(201).json({'status':'success', 'message':'Alterado com sucesso.', 'data':data});
				}).catch(function(erro){
					res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
				});
			}

			if(req.body.id != data.id){
				console.log("DIFERENTE");
				res.status(500).json({'status':'error', 'message':'O Limite de Máquina '+data.nome+' já se encontra cadastrado', 'erro':data});
			}
		}).catch(function(erro){
			models.LimiteMaquina.update(
				req.body,{fields:['nome', 'descricao'], where:{'id':req.params.id}}
			).then(function(data){
				//console.log(data);
				//res.end();
				res.json({'status':'success', 'message':'Alterado com sucesso.', 'data':data});
			}).catch(function(erro){
				//console.error(erro);
				res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
			});
		});

	};
 return controller;
};
