'use strict';
var models = require('../models');
module.exports = function(app){
	var TipoMaquina = models.TipoMaquina;
	var controller = {};

	controller.listaTodos = function(req, res){
		models.TipoMaquina.all({include:[models.Capacitacao]}).then(
			function(data){
						res.json({'data':data||[], 'status':'success'});
						}
					).catch(function(erro){
				console.error(erro);
				res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error': erro});
				});
	};

	controller.obtemTipoMaquina = function(req, res){
			models.TipoMaquina.findOne({
			where: {
				id: req.params.id
			},
			include: [models.Capacitacao]
		}).then(
			function(data){
				console.error(data.nome);
				if(!data) throw new Error("Tipo de maquina não encontrado");
				res.json({'data':data, 'status':'success'});
			}
		).catch(function(erro){
			console.log(erro);
			res.status(500).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
		});
	};

	controller.removeTipoMaquina = function(req, res){
		var _id = req.params.id;

		TipoMaquina.destroy({where:{"id": _id}}).then(
			function(data){
			res.json({'status':'success', 'message':'Removido com sucesso.', 'data':data});
			}
		).catch(function(erro){
			//console.error(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});
	};

	controller.salvaTipoMaquina = function(req, res){

		models.TipoMaquina.findOne({
			where: {
				nome: req.body.nome
			},
			include: [models.Capacitacao]
		}).then(function(data){
			 res.status(500).json({'status':'error', 'message':'O Tipo de Máquina '+data.nome+' já se encontra cadastrado', 'erro':data});
		}).catch(function(erro){
			//res.status(500).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
			TipoMaquina.create(req.body).then(function(data){
					res.status(201).json({'status': 'success', 'message':'Salvo com sucesso.', 'data': data});
				}).catch(function(erro){
				  console.error(erro);
					res.status(500).json({'status':'error', 'message':'Internal server error', 'erro':erro});
			});
		});
	};

	controller.updateTipoMaquina = function(req, res){
		models.TipoMaquina.findOne({where:{nome:req.body.nome}}).then(function(data){
			if(req.body.id == data.id){
				console.log("PARAM ID", req.body.id);
				console.log("DATA ID", data.id);
				console.log("IGUAL");
				models.TipoMaquina.update(
					req.body,{fields:['nome', 'descricao', 'CapacitacaoId'], where:{'id':req.params.id}}
				).then(function(data){
					res.status(201).json({'status':'success', 'message':'Alterado com sucesso.', 'data':data});
				}).catch(function(erro){
					res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
				});
			}

			if(req.body.id != data.id){
				console.log("DIFERENTE");
				res.status(500).json({'status':'error', 'message':'O Tipo de Máquina '+data.nome+' já se encontra cadastrado', 'erro':data});
			}
		}).catch(function(erro){
			models.TipoMaquina.update(
				req.body,{fields:['nome', 'descricao', 'CapacitacaoId'], where:{'id':req.params.id}}
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
