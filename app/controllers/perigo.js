'use strict';
var models = require('../models/');
module.exports = function(app) {

	var controller = {};

	controller.listaPerigo = function(req, res){
		models.Perigo.all({include:[models.Risco]}).then(
			function(data){
				res.json({'data':data||[],'status':'success'});
			}
		).catch(function(erro){
			console.error(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error': erro});
		});
	};

	controller.obtemPerigo = function(req, res){
		models.Perigo.findOne({
			where: {
				id: req.params.id
			},
			include: [models.Risco]
		}).then(
			function(perigo){
				if(!perigo) throw new Error("Perigo não encontrado");
				res.json({'data':perigo, 'status':'success'});
			}
		).catch(function(erro){
			res.status(404).json({'status':'error', 'message':erro.message||'Internal Server Error', 'error':erro});
		});
	};

	controller.removePerigo = function(req, res){
		models.Perigo.destroy({where:{"id":req.params.id}}).then(
			function(data){
				res.json({'status':'success', 'message':'Removido com sucesso', 'data':data});
			}
		).catch(function(erro){
			console.error(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});
	};

	controller.salvaPerigo = function(req, res){
		models.Perigo.findOne({
			where: {
				nome: req.body.nome
			}
		}).then(function(data){
			res.status(500).json({'status':'error', 'message':'O Perigo '+data.nome+' já se encontra cadastrado', 'erro':data});
		}).catch(function(erro){
			models.Perigo.create(req.body).then(function(perigo){
				//Verificar se existe riscos vinculados ao Perigo. Se tiver, adiciona.
				if (req.body.Riscos) {
					req.body.Riscos.forEach(function(item){
						perigo.addRisco(models.Risco.build(item));
					})
				}
				res.status(201).json({'status':'success', 'message': 'Salvo com sucesso.', 'data':perigo});
			}).catch(function(erro){
				console.log(erro);
				res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
			});
		})
	};

	controller.updatePerigo = function (req, res){
		models.Perigo.findOne({where:{nome:req.body.nome}}).then(function(data){
            console.log(req.body.id);
			//  verifica se data é null ou se o id da consulta é igual ao body 
            if((!data) ||(req.body.id == data.id)){
				models.Perigo.update(req.body, {fields : ['nome', 'descricao'], where : {'id' : req.params.id}})
				.then(function(){
					models.Perigo.find({
						where: {id: req.params.id}
					}).then(function(perigo){
						models.Risco.findAll({
							where:{id: {$in: req.body.Riscos.map(function(item){return item.id;})}}
						}).then(function(riscos){
							perigo.setRiscos(riscos);
						});
						res.status(201).json({'status':'success', 'message':'Alterado com sucesso.', 'data':perigo});
					});

				}).catch(function(erro){
					console.log(erro);
					res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
				});
			} else {
				res.status(500).json({'status':'error', 'message':'O Perigo '+data.nome+' já se encontra cadastrado', 'erro':data});   
			}
		}).catch(function(erro){
			console.error(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		})
	};

	return controller;
};
