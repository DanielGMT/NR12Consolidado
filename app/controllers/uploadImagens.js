'use strict';
var formidable = require('formidable');
var fs = require('fs');
module.exports = function(app){
	var diretorioTemp = './public/temp';
	var controller = {};

	controller.upload = function(req, res){
		if (!fs.existsSync(diretorioTemp)) {
			fs.mkdir(diretorioTemp);
		}
		var form = new formidable.IncomingForm({uploadDir:diretorioTemp});
		form.parse(req, function(err, fields, files){
			
			var imagem = files.file;
			var imagem_upload_path_antigo = imagem.path;
			var imagem_upload_nome = imagem.name;
			res.json({'path': imagem_upload_path_antigo, 'nome':imagem_upload_nome});
		});
	};
	
	return controller;
};
