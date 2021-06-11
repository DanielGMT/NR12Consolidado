'use strict';
var models = require('../models');
module.exports = function(app){

	var TipoDispositivo = models.TipoDispositivo;
	var Pergunta = models.Pergunta;

	var controller = {};

	controller.listaTodos = function(req, res){
		console.log("listaTodos TipoDispositivo");
		TipoDispositivo.all().then(
			function(data){
				//console.log(data);
				res.json({'data':data || [], 'status':'success'});
			}
		);
	};

	controller.obtemItem = function(req, res){
		//console.log(req.param);
		TipoDispositivo.findOne({
			where: {
				id: req.params.id
			},
			include: [{model: models.Pergunta, include:[models.Resposta]}]
			//include: [{all:true}]
		}).then(
			function(data){
				if(!data) throw new Error("Tipo Dispositivo não encontrado");
				res.json({'data':data, 'status':'success'});
			}
		).catch(function(erro){
			res.status(404).json({'status':'error', 'message':erro.message||'Internal Server Error', 'error':erro});
		});


		/**/
	};

	/*
	controller.removeTipoDispositivo2 = function(req, res){
		TipoDispositivo.findById(req.params.id).then(
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

	controller.removeItem = function(req, res){
		TipoDispositivo.destroy({where:{"id":req.params.id}}).then(function(data){
			res.json({'status':'success', 'message': 'Removido com sucesso.'});
		}).catch(function(erro){
			console.error(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});
	};

	controller.salva = function(req, res){
		models.TipoDispositivo.findOne({where:{tipo:req.body.tipo}}).then(function(data){
			res.status(500).json({'status':'error', 'message':'O tipo de dispositivo '+data.tipo+
			' já se encontra cadastrado', 'erro':data});
		}).catch(function(erro){
			TipoDispositivo.create(req.body).then(function(data){
				//data.id = data.null;
				res.status(201).json({'status':'success', 'message':'Salvo com sucesso.', 'data':data});
			}).catch(function(erro){
				console.error(erro);
				res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
			});
		});

	};

	controller.updateItem = function(req, res){
		models.TipoDispositivo.findOne({where:{tipo:req.body.tipo}}).then(function(data){
			if(req.body.id == data.id){
				TipoDispositivo.update(req.body,{where:{'id':req.params.id}})
				.then(function(data){
					res.json({'status':'success', 'message':'Alterado com sucesso.', 'data':data});
				}).catch(function(erro){
					console.error(erro);
					res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
				});
			}
			if(req.body.id != data.id){
				res.status(500).json({'status':'error', 'message':'O tipo de dispositivo '+data.tipo+
				' já se encontra cadastrado', 'erro':data});
			}
		}).catch(function(erro){
			TipoDispositivo.update(req.body,{where:{'id':req.params.id}})
			.then(function(data){
				res.json({'status':'success', 'message':'Alterado com sucesso.', 'data':data});
			}).catch(function(erro){
				console.error(erro);
				res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
			});
		});


	};
	return controller;
};
