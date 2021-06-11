'use strict';
var models = require('../models');
var fs = require('fs');
var mkdirp = require('mkdirp');
module.exports = function(app){

	var Cliente = models.Cliente;
	var controller = {};

	controller.listaTodos = function(req, res){
		Cliente.all().then(function(data){
			res.json({'data':data || [], 'status':'success'});
		});
	};

	controller.obtemCliente = function(req, res){
		Cliente.findById(req.params.id, {include:[models.Maquina]}).then(function(data){
			if(!data) throw new Error("Cliente não encontrado");
			res.json({'data':data, 'status':'success'});
		}).catch(function(erro){
			res.status(404).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
		});
	};

	controller.removeCliente = function(req, res){
		var imagem;
		var sub_path;
		var path_novo = './files/';
		Cliente.destroy({where:{"id":req.params.id}}).then(function(data){

			controller.deleteFolderRecursive(path_novo+'cliente/'+req.params.id);
			res.json({'status':'success', 'message': 'Removido com sucesso.'});
		}).catch(function(erro){
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});
	};

	controller.salvaCliente = function(req, res){

		var imagem;
		var sub_path;
		var path_novo = './files/';


		if(req.body.imagem !== undefined){
			console.log("IMAGEM");
			imagem = req.body.imagem;
			req.body.imagem = imagem.nome;
		}

		Cliente.findOne({
			where:{
				cnpj: req.body.cnpj
			}
		}).then(function(data){
			res.status(500).json({'status':'error', 'message':'O cliente '+data.nome+' já possui o CNPJ '+data.cnpj+' cadastrado', 'erro':data});
		}).catch(function(erro){
			Cliente.create(req.body).then(function(data){

				if(imagem !== undefined){
					console.log("SALVA CLIENTE");
					sub_path = data.id + '/imagem/';
					controller.salvaImagem(path_novo, imagem.path, imagem.nome, sub_path);
				}
				res.status(201).json({'status':'success', 'message':'Salvo com sucesso.', 'data':data});
			}).catch(function(erro){
				console.error(erro);
				res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
			});

		});

	};

	controller.salvaImagem = function(path_novo, path_antigo, nome, sub_path){
		console.log("SUBPATH", sub_path);

		var path_novo_completo = path_novo + 'cliente/' + sub_path;
		mkdirp(path_novo_completo, function(err){
			if(err){
				console.log('erro ao criar pasta');
				return;
			}
			if(fs.existsSync(path_novo_completo)){
				console.log("SYNC");
					fs.rename(path_antigo, (path_novo_completo+nome), function(err){
						if(err){
							console.log(err);
							console.log('Erro ao salvar o arquivo');
						}
					});
			 }
		});
	}

	controller.updateCliente = function(req, res){

		var imagem;
		var sub_path;
		var path_novo = './files/';

		imagem = req.body.imagem;

		req.body.imagem = imagem.nome;

		if(imagem.nome !== undefined){
			console.log("UPDATE IMAGEM");
			controller.deleteFolderRecursive(path_novo+'cliente/'+req.body.id);//+'/imagem');
			sub_path = req.params.id + '/imagem/';
			controller.salvaImagem(path_novo, imagem.path, imagem.nome, sub_path);
		}

		Cliente.update(req.body, {where:{'id':req.params.id}})
		.then(function(data){
			res.json({'status':'success', 'message':'Alterado com sucesso.', 'data':data});
		}).catch(function(erro){
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});

	};
	controller.deleteFolderRecursive = function(path){
		if(fs.existsSync(path)){
			fs.readdirSync(path).forEach(function(file){
				var curPath = path + "/" + file;
				if(fs.statSync(curPath).isDirectory()){
					controller.deleteFolderRecursive(curPath);
				}else{
					fs.unlinkSync(curPath);
				}
			});
			fs.rmdirSync(path);
		}
	};
	return controller;
};
