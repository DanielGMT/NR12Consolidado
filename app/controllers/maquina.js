'use strict';
var models = require('../models');
var fs = require('fs');
var mkdirp = require('mkdirp');
module.exports = function(app){

	var Maquina = models.Maquina;

	var controller = {};

	controller.listaTodos = function(req, res){
		Maquina.all({include:[models.Cliente]}).then(function(data){
			res.json({'data':data || [], 'status':'success'});
		});
	};

	controller.obtemMaquina = function(req, res){
		Maquina.findOne({
			where: {
				id: req.params.id
			},
			include: [{all:true}],

		}).then(function(data){
			if(!data) throw new Error("Maquina não encontrada");
			res.json({'data':data, 'status':'success'});
		}).catch(function(erro){
			res.status(404).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
		});
	};

	controller.removeMaquina = function(req, res){
		Maquina.destroy({where:{"id":req.params.id}}).then(function(data){
			controller.deleteFolderRecursive('./files/maquinas/'+req.params.id);
			res.json({'status':'success', 'message': 'Removido com sucesso.'});
		}).catch(function(erro){
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});
	};

	controller.salvaMaquina = function(req, res){
		var fotofront, fotole, fotold, fotopost;
		var sub_path;
		var path_novo = './files/';

		// foto frontal
		if (req.body.fotofront !== undefined){
			fotofront = req.body.fotofront;
			req.body.fotofront = fotofront.nome;
		}
		// foto lateral esquerda
		if (req.body.fotole !== undefined){
			fotole = req.body.fotole;
			req.body.fotole = fotole.nome;
		}
		// foto lateral direita
		if (req.body.fotold !== undefined){
			fotold = req.body.fotold;
			req.body.fotold = fotold.nome;
		}
		// foto posterior
		if (req.body.fotopost !== undefined){
			fotopost = req.body.fotopost;
			req.body.fotopost = fotopost.nome;
		}


		Maquina.create(req.body).then(function(data){
			//front
			if (fotofront !== undefined){
				sub_path = data.id + '/fotofront/';
				controller.salvaImagem(path_novo, fotofront.path, fotofront.nome, sub_path);
			}
			//lado esquerdo
			if (fotole !== undefined){
				sub_path = data.id + '/fotole/';
				controller.salvaImagem(path_novo, fotole.path, fotole.nome, sub_path);
			}
			//lado direito
			if (fotold !== undefined){
				sub_path = data.id + '/fotold/';
				controller.salvaImagem(path_novo, fotold.path, fotold.nome, sub_path);
			}
			//posterior
			if (fotopost !== undefined){
				sub_path = data.id + '/fotopost/';
				controller.salvaImagem(path_novo, fotopost.path, fotopost.nome, sub_path);
			}

			res.status(201).json({'status':'success', 'message':'Salvo com sucesso.', 'data':data});
		}).catch(function(erro){
			console.error(erro);
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});
	};

	controller.salvaImagem = function(path_novo, path_antigo, nome, sub_path){
		var path_novo_completo = path_novo + 'maquinas/' + sub_path;
		mkdirp(path_novo_completo, function(err){
			if (err){
				console.log('erro ao criar nova pasta');
				return;
			}
			if (fs.existsSync(path_novo_completo)){
				fs.rename(path_antigo, (path_novo_completo+nome), function(err){
					if (err){
						console.log(err);
						console.log('Erro ao salvar o arquivo!');
					}
				});
			}
		});
	}

	controller.updateMaquina = function(req, res){

		var fotofront, fotole, fotold, fotopost;
		var sub_path;
		var path_novo = './files/';

		// foto frontal
        if (req.body.fotofront){
            fotofront = req.body.fotofront;
		    req.body.fotofront = fotofront.nome;  
            if (fotofront.nome !== undefined){
                controller.deleteFolderRecursive(path_novo+'maquinas/'+req.body.id+'/fotofront');
                sub_path = req.params.id + '/fotofront/';
                controller.salvaImagem(path_novo, fotofront.path, fotofront.nome, sub_path);
            }
        }
		
		// foto lateral esquerda
        if (req.body.fotole){
            fotole = req.body.fotole;
            req.body.fotole = fotole.nome;
            if (fotole.nome !== undefined){
                controller.deleteFolderRecursive(path_novo+'maquinas/'+req.body.id+'/fotole');
                sub_path = req.params.id + '/fotole/';
                controller.salvaImagem(path_novo, fotole.path, fotole.nome, sub_path);
            }
        }
		
		// foto lateral direita
        if (req.body.fotold){        
            fotold = req.body.fotold;
            req.body.fotold = fotold.nome;
            if (fotold.nome !== undefined){
                controller.deleteFolderRecursive(path_novo+'maquinas/'+req.body.id+'/fotold');
                sub_path = req.params.id + '/fotold/';
                controller.salvaImagem(path_novo, fotold.path, fotold.nome, sub_path);
            }
        }
		
		// foto posterior
        if (req.body.fotopost){
            fotopost = req.body.fotopost;
            req.body.fotopost = fotopost.nome
            if (fotopost.nome !== undefined){
                controller.deleteFolderRecursive(path_novo+'maquinas/'+req.body.id+'/fotopost');
                sub_path = req.params.id + '/fotopost/';
                controller.salvaImagem(path_novo, fotopost.path, fotopost.nome, sub_path);
            }
        }
        
			

		Maquina.update(req.body, {where:{'id':req.params.id}})
		.then(function(data){
			res.json({'status':'success', 'message':'Alterado com sucesso.', 'data':data});
		}).catch(function(erro){
			res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
		});

	};

	controller.deleteFolderRecursive = function(path) {
	  if( fs.existsSync(path) ) {
		  fs.readdirSync(path).forEach(function(file) {
			var curPath = path + "/" + file;
			  if(fs.statSync(curPath).isDirectory()) { // recurse
				  controller.deleteFolderRecursive(curPath);
			  }else { // delete file
				  fs.unlinkSync(curPath);
			  }
		  });
		  fs.rmdirSync(path);
		}
	};

	return controller;
};
