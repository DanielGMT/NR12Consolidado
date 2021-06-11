'use strict';
var models = require('../models');
module.exports = function(app){

	var Pergunta = models.Pergunta;

	var controller = {};

	controller.listaTodos = function(req, res){

		Pergunta.findAll({where:{TipoDispositivoId:req.params.id}}).then(function(data){
			if(!data) throw new Error("Tipo Dispositivo não encontrado");
			res.json({'data':data, 'status':'success'});
		}).catch(function(erro){
			console.error(erro);
			res.status(404).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
		});
	};

	controller.obtemPergunta = function(req, res){
		Pergunta.findOne({
			where: {
				id: req.params.id
			},
			//include: [models.Resposta]
			include: [{all:true}]
		}).then(function(data){
			data.get()
			if(!data) throw new Error("Pergunta não encontrada");
			res.json({'data':data, 'status':'success'});
		}).catch(function(erro){
			console.error(erro);
			res.status(404).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
		});
/*
		Pergunta.findById(req.params.id).then(function(data){
			if(!data) throw new Error("Pergunta não encontrada");
			res.json({'data':data, 'status':'success'});
		}).catch(function(erro){
			console.error(erro);
			res.status(404).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
		});*/
	};

	/*
	controller.removePergunta2 = function(req, res){
		Pergunta.findById(req.params.id).then(
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
		models.PerguntaResposta.destroy({where:{"perguntaId":req.params.id}}).then(function(data){
			Pergunta.destroy({where:{"id":req.params.id}}).then(function(data){
				res.json({'status':'success', 'message': 'Removido com sucesso.'});
			}).catch(function(erro){
				console.error(erro);
				res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
			});
		}).catch(function(erro){
			console.error(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});
	};


	// testado funciona tbm
	controller.salva = function(req, res){
		// Funciona
		Pergunta.create(req.body).then(function(data){
			
			models.Resposta.findAll({
				where:{
					id:{ $in : req.body.respostas.map(function(item){
						return item.id;
					})}
				}
			}).then(function(respostas){
				data.addRespostas(respostas);
			});
			res.status(201).json({'status':'success', 'message':'Salvo com sucesso.', 'data':data});
		}).catch(function(erro){
			console.error(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});
	};

	// Funciona
	controller.salva1 = function(req, res){
		// Funciona
		Pergunta.create(req.body).then(function(data){
			if (req.body.respostas) {
				req.body.respostas.forEach(function(item){
					data.addResposta(models.Resposta.build(item));
				});
			}
			res.status(201).json({'status':'success', 'message':'Salvo com sucesso.', 'data':data});
		}).catch(function(erro){
			console.error(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});
	};

	controller.update = function(req, res){
		Pergunta.update(req.body,{where:{'id':req.params.id}}).then(function(){
			Pergunta.findById(req.params.id).then(function(data){
				models.Resposta.findAll({
					where:{
						id:{ $in : req.body.respostas.map(function(item){
							return item.id;
						})}
					}
				}).then(function(respostas){
					data.setRespostas(respostas);
					res.json({'status':'success', 'message':'Alterado com sucesso.', 'data':data});
				}).catch(function(erro){
					console.error(erro);
					res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
				});
			}).catch(function(erro){
				console.error(erro);
				res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
			});
		}).catch(function(erro){
			console.error(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});
	};
	return controller;
};



/*
{
	"id": 1,
	"pergunta": "Pergunta A?",
	"TipoDispositivoId": 1,
	"Resposta": [
	{

		"id": 1,
		"resposta": "SIM",
		"PerguntaResposta": {
			"perguntaId": 1,
			"respostaId": 1,
			"correta": true
		}
	}, {
		"id": 2,
		"resposta": "NÃO",
		"PerguntaResposta": {
			"perguntaId": 1,
			"respostaId": 2,
			"correta": false
		}
	}, {
		"id": 3,
		"resposta": "NA",
		"PerguntaResposta": {
			"perguntaId": 1,
			"respostaId": 3,
			"correta": false

		}
	}
	]
}
*/
