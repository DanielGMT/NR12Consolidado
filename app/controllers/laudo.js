'use strict';
var http = require('http');
var models = require('../models');
var fs = require('fs');
var mkdirp = require('mkdirp');
var accent = require('remove-accents');
var toUpper = require('to-upper');
var env       = process.env.NODE_ENV || 'development';
var config    = require('../../config/serverJava.json')[env];

module.exports = function(app){
	var path_novo = './files/';
	var Laudo = models.Laudo;
	var pathAntigo = "";
	var controller = {};
	var laudoId = "";
	var codigo = "";

	controller.geraPdf = function(req, res){

		console.log("%%%%%%%%%%% geraPdf %%%%%%%%%");
		var id = req.params.id;

/*
		var options = {
			hostname: 'localhost',
  			port: 8080,
  			path: '/NR12/rest/relatorio/gerar/'+id,
  			method:'GET'
		};
*/
		var url = config.urlRelatorio + id;

		//var caminho = "http://10.3.79.235:8081";
		console.log("url Java: ",url);

		http.get(url, function(response) {
			

			let body = [];
			response.on('data', function(chunk) {
				console.log("chunk:", chunk);
				body.push(chunk);
			}).on('end', function(){
				console.log("body:", body.toString());
				body = Buffer.concat(body).toString().replace('"',"").replace('"',"");



				var novaUrl = config.url + body;

				res.json({'data': novaUrl, 'status':'success'});

				//res.header("Access-Control-Allow-Origin", "*");
			    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
			    //res.header('content-type', 'application/pdf');
				//res.redirect(novaUrl);
/*
				http.get(novaUrl, function(resp) {
			        var chunks = [];
			        resp.on('data', function(chunk) {
			            console.log('downloading');
			            chunks.push(chunk);
			        });
			        resp.on("end", function() {
			            console.log('downloaded');
			            var jsfile = new Buffer.concat(chunks);//.toString('base64');
			            res.header("Access-Control-Allow-Origin", "*");
			            res.header("Access-Control-Allow-Headers", "X-Requested-With");
			            res.header('content-type', 'application/pdf');
			            res.send(jsfile);
			        });
			    }).on("error", function(erro) {
			        res.status(404).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
			    });
*/

			});
		}).on("error", function(erro) {
	        res.status(404).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
	    });

		/*
		var request = http.get(options, function(resp){
			console.log("resposta: ", resp);
            res.json({'data':"okkkk", 'status':'success'});
            res.json({'data':resp.value, 'status':'success'});
		});
 		*/

/*
		var request = http.request(options, function(response){
			//console.log("STATUS: ", resp.statusCode);
			//console.log("HEADERS: ", JSON.stringify(resp.headers));

//			console.log("RESP: ", resp);
			//resp.setEncoding('utf8');
			var url = "http://localhost:8080";

			let body = [];

			response.on('data', function(chunk){
				body.push(chunk);
			}).on('end', function(){
				body = Buffer.concat(body).toString().replace('"',"").replace('"',"");
				var teste = url + body;
				console.log(teste);
				http.get(teste, function(resp) {
			        //var data = '';
			        var chunks = [];
			        resp.on('data', function(chunk) {
			            console.log('downloading');
			            //data += chunk;
			            chunks.push(chunk);
			        });
			        resp.on("end", function() {
			            console.log('downloaded');
			            var jsfile = new Buffer.concat(chunks);//.toString('base64');
			            res.header("Access-Control-Allow-Origin", "*");
			            res.header("Access-Control-Allow-Headers", "X-Requested-With");
			            res.header('content-type', 'application/pdf');
			            //res.send(data);
			            res.send(jsfile);
			        });
			    }).on("error", function(erro) {
			        //callback(null);
			        res.status(404).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
			    });

			});



		});

		request.on("error", function(erro){
			console.log('problemas com request: ', erro.message)
			res.status(404).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
		});
		request.end();
*/

	};

	controller.listaTodos = function(req, res){
		Laudo.all({include: [{model:models.Maquina, include:[{model:models.Cliente}]}]}).then(
			function(data){

					res.json({'data':data || [], 'status':'success'});
			}
		);
	};
  controller.listaPorConta = function(req, res){
    Laudo.findAll
  }

  controller.listaPorConta = function(req, res){
    console.log("REQUISICAO POR CONTA ", req);
    // Laudo.findAll({
    //   group:[]
    // });
  };

	controller.obtemLaudo = function(req, res){
		var id = req.params.id;
		// Busca Laudo com as tabelas necessarias

		// Busca laudo com todas as tabelas - COMPLETO
		//Laudo.findById(id,{include:[{all:true, nested:true}]}).then(


		Laudo.findById(id,{include:[{
			model:models.Maquina, include:[{
				model:models.Cliente
			}]
		},{
			model:models.PontoPerigo, include:[{
				model:models.Perigo, include:[{model:models.Risco}]
			},{
				model:models.Risco
			},{
				model:models.NormaRegulamentadora
			}]
		},{
			model:models.Dispositivo, include:[{
				model:models.TipoDispositivo
			},{
				model:models.Pergunta, include:[{
					model:models.Resposta
				}]
			},{
				model:models.NormaRegulamentadora
			}]
		},{
			model:models.Usuario
		},{
			model:models.NormaTecnica
		}]}).then(


			function(data){
				if(!data) throw new Error("Laudo não encontrado");
				res.json({'data':data, 'status':'success'});
			}
		).catch(function(erro){

			res.status(404).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
		});
	};

	controller.removeLaudo = function(req, res){
		Laudo.findById(req.params.id, {include:[{model:models.Dispositivo}]}).then(function(data){

			if(data.status === "Aprovado") {
				res.status(500).json({'status':'error', 'message':'Laudo aprovado não pode ser excluído'});
			}else{
				data.dispositivos.forEach(function(disp){
					if (disp.imagem){
						controller.deleteFolderRecursive('./files/dispositivos/'+disp.id);
					}
				});
				if(data.pontoPerigos != undefined){
					data.pontoPerigos.forEach(function(pontop){
						controller.deleteFolderRecursive('./files/dispositivos/'+pontop.id);
					});
				}

				Laudo.destroy({where:{"id":req.params.id}}).then(function(data){
					controller.deleteFolderRecursive(path_novo+'limite/'+req.params.id);
					res.json({'status':'success', 'message': 'Removido com sucesso.'});
				}).catch(function(erro){
					console.error(erro);
					res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
				});
			}
		})
	};

	controller.salvaLaudo = function(req, res){

        //atribui o id do token ao usuario do laudo
        req.body.usuarioId = req.decoded.id;

    var fotopp01, fotopp02, fotopp03;
		var imagem;
		var sub_path;
		var path;
		var path_novo = './files/';

        req.body.data_inicial = new Date().toUTCString(); 
	console.log("Date: ", new Date());
		// Renomeia a imagem dos dispositivos
		req.body.dispositivos.forEach(function(disp){
			if (disp.imagem){
				disp.pathAntigo = disp.imagem.path;
				disp.imagem = disp.imagem.nome;
			}
		});
			// Renomeia a imagem de Limites da Maquina
			if(req.body.imagem){
				req.body.pathAntigo = req.body.imagem.path;
				req.body.imagem = req.body.imagem.nome;
			}
			// Renomeia as imagens dos Pontos de Perigos
			req.body.pontoPerigos.forEach(function(pp){

				if(pp.fotopp01 != undefined){
					pp.pathAntigo1 = pp.fotopp01.path;
					pp.fotopp01 = pp.fotopp01.nome;
				}

				if(pp.fotopp02 != undefined){
					pp.pathAntigo2 = pp.fotopp02.path;
					pp.fotopp02 = pp.fotopp02.nome;
				}

				if(pp.fotopp03 != undefined){
					pp.pathAntigo3 = pp.fotopp03.path;
					pp.fotopp03 = pp.fotopp03.nome;
				}
			});

			models.Maquina.all({include:[models.Cliente]}).then(function(machineData){
				var codigo = "";
				var cidadeCode = "";
				var clienteCode = "";
				var reportSeqCode = "";
				var d = new Date();

				machineData.forEach(function(maquina){

					if(req.body.maquinaId == maquina.id){
						cidadeCode = maquina.cliente.cidade.slice(0, 3);
						clienteCode = maquina.cliente.nome.slice(0, 3);

						cidadeCode = accent(cidadeCode);
						clienteCode = accent(clienteCode);

						cidadeCode = toUpper(cidadeCode);
						clienteCode = toUpper(clienteCode);

						codigo = cidadeCode+"-"+clienteCode;
						req.body.codigo = codigo;
					}
				});

				Laudo.all({include: [{model:models.Maquina, include:[{model:models.Cliente}]}]}).then(
					function(data){
						var arrayCode = [];
						var numberCode = "";
						var result = "";
						var element = "";

						if(data.length == 0){
							req.body.codigo += "-001-"+d.getFullYear();
						}
						data.forEach(function(report){

							if(req.body.codigo == report.codigo.slice(0, 7) && (report.codigo.slice(8, 11) != null || report.codigo.slice(8, 11) != undefined)){
								
								element = report.codigo.slice(8, 11);
								arrayCode.push(element);
								numberCode = Math.max.apply(Math, arrayCode);
								numberCode = parseInt(numberCode);
								numberCode = numberCode + 1;
								numberCode = numberCode.toString();
							}

						});

						if(arrayCode.length == 0 && req.body.codigo.slice(0, 16).length == 7){
							req.body.codigo += "-001-"+d.getFullYear();;
						}
						if(numberCode.length == 1){
							req.body.codigo += "-00"+numberCode+"-"+d.getFullYear();
						}
						if(numberCode.length == 2){
							req.body.codigo += "-0"+numberCode+"-"+d.getFullYear();
						}
						if(numberCode.length == 3){
							req.body.codigo += "-"+numberCode+"-"+d.getFullYear();
						}

					}
				).then(
					function(data){
					Laudo.create(req.body, {include:[{model:models.Dispositivo},{model:models.PontoPerigo}]}).then(function(laudo){

						 if(fotopp01 != undefined){
						 	sub_path = '/fotopp01/';
							laudoId = laudo.id;

						 	controller.salvaImagemPontoPegigo(path_novo, req.body.pathAntigo,
								req.body.pontoPerigos.fotopp01, sub_path, laudo.id, false);
						 }

						 if(fotopp02 != undefined){
						 sub_path = '/fotopp02/';
						 laudoId = data.id;
						 controller.salvaImagemPontoPegigo(path_novo, req.body.pathAntigo,
								req.body.pontoPerigos.fotopp02, sub_path, laudo.id, false);
						}

						if(fotopp03 != undefined){
						 sub_path = '/fotopp03/';
						 laudoId = data.id;
						 controller.salvaImagemPontoPegigo(path_novo, req.body.pathAntigo,
								req.body.pontoPerigos.fotopp03, sub_path, laudo.id, false);
						}

			        // Associação da tabela dispositivo com filhos
					laudo.get().dispositivos.forEach(function(dispositivo){
							req.body.dispositivos.forEach(function(disp){
								if(dispositivo.get().dispositivo == disp.dispositivo){
									//salva a imagem aqui pq tem que pegar o id do obj dispositivo e as outras inf do obj disp. by Guilherme
									if (disp.imagem){
										controller.salvaImagem(path_novo, disp.pathAntigo, disp.imagem, dispositivo.id,false);
									}
									if(disp.perguntas){
										disp.perguntas.forEach(function(perg){
											dispositivo.addPergunta(perg.id, {respostaId:perg.RespostaDispositivo.respostaId});
											//dispositivo.addPergunta(models.Pergunta.build(perg), {respostaId:perg.RespostaDispositivo.respostaId});
										});
									}
									// Cadastra as normas para o Dispositivo
									if(disp.normas){
										disp.normas.forEach(function(norma){
											dispositivo.addNorma(norma.id);
										});
									}
								}
							});
						});
						// Salva a imagem Limites da maquina na pasta do laudo
						if(req.body.imagem){
							laudoId = laudo.get().id;
							var pathAntigo = req.body.pathAntigo;
							var imagem = imagem = req.body.imagem;
							controller.salvaImagemLimite(path_novo, pathAntigo, laudoId, imagem, false);
						}

						laudo.get().pontoPerigos.forEach(function(pontoperigo){
							req.body.pontoPerigos.forEach(function(pontop){
								if(pontoperigo.get().pontoperigo == pontop.pontoperigo){
									// salva as imagens de ponto de perigo
									if (pontop.fotopp01){
										sub_path = '/fotopp01/';
										controller.salvaImagemPontoPerigo(path_novo, pontop.pathAntigo1,
											 pontop.fotopp01, pontoperigo.id, sub_path, laudo.id, false);
									}
									if (pontop.fotopp02){
										sub_path = '/fotopp02/';
									 		controller.salvaImagemPontoPerigo(path_novo, pontop.pathAntigo2,
											 pontop.fotopp02, pontoperigo.id, sub_path, laudo.id,false);
									}
									if (pontop.fotopp03){
										sub_path = '/fotopp03/';
										controller.salvaImagemPontoPerigo(path_novo, pontop.pathAntigo3,
											 pontop.fotopp03, pontoperigo.id, sub_path, laudo.id, false);
									}


									// Cadastra as normas de ponto de perigo
									if(pontop.normas){
										pontop.normas.forEach(function(norma){
											pontoperigo.addNorma(norma.id);
										});
									}
									// Cadastra o perigos
									if(pontop.Perigos){
										pontop.Perigos.forEach(function(perigo){
											pontoperigo.addPerigo(perigo.id);
										});
									}
									// Cadastra os riscos
									if(pontop.Riscos){
										pontop.Riscos.forEach(function(risco){
											pontoperigo.addRisco(risco.id);
										});
									}
								}
							});
						});

						// Associação laudo com  a tabela normatecnicaLaudo
						if(req.body.normasTecnicas){
							req.body.normasTecnicas.forEach(function(normaTecnica, index){
								laudo.addNormaTecnica(normaTecnica.id);
							});
						}

						if(req.body.limitesMaquinas){
							req.body.limitesMaquinas.forEach(function(limiteMaquina, index){
								laudo.addLimiteMaquina(limiteMaquina.id);
							});
						}

						res.status(201).json({'status':'success', 'message':'Salvo com sucesso.', 'data':laudo});
					}).catch(function(erro){
						console.error(erro);

						res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
					});
				});



		});
	};

	controller.updateLaudo = function(req, res){
		var sub_path;
		var pathAntigo;
		if(req.body.imagem){
			pathAntigo = req.body.imagem.path;
			req.body.imagem = req.body.imagem.nome;
		}

		// Atualiza os dados do laudo
		Laudo.update(req.body, {where:{'id':req.params.id}}).then(function(){

			// Busca o objeto Laudo
			return Laudo.findById(req.params.id/*,{include:[{all:true, nested:true}]}*/).then(function(laudo){

				if(!laudo){
					throw new Error("Laudo não encontrado!!!!");
				}
				if(req.body.imagem){
					controller.salvaImagemLimite(path_novo, pathAntigo, req.body.id, req.body.imagem, true);
				}

				//Remove os disposivos excluidos
				if(req.body.destroyDispositivos){
					req.body.destroyDispositivos.forEach(function(dispositivo){
						controller.deleteFolderRecursive('./files/dispositivos/'+dispositivo.id);
						models.Dispositivo.destroy({where:{id:dispositivo.id}});
					});
				}

				 if(req.body.destroyPontoPerigo){
				 	req.body.destroyPontoPerigo.forEach(function(pontop){

				 		if(pontop.fotopp01 != undefined){
				 		 	 controller.deleteFolderRecursive('./files/laudos/'+laudo.id+'/pontoPerigo/'+pontop.id);

				 		 }

				 		 if(pontop.fotopp02 != undefined){
 			 			 	 controller.deleteFolderRecursive('./files/laudos/'+laudo.id+'/pontoPerigo/'+pontop.id);

 			 			 }

				 		 if(pontop.fotopp03 != undefined){
 			 			 	 controller.deleteFolderRecursive('./files/laudos/'+laudo.id+'/pontoPerigo/'+pontop.id);

 			 			 }
				 		 models.PontoPerigo.destroy({where:{id:pontop.id}});
				 	});
				 }

				if(req.body.dispositivos){

					req.body.dispositivos.forEach(function(dispositivo){
						if (dispositivo.imagem){
							dispositivo.pathAntigo = dispositivo.imagem.path;
							dispositivo.imagem = dispositivo.imagem.nome;
						}
						// se dispositivo tiver id então update senao create
						// atualiza os dispositivo existentes com id
						if(dispositivo.id){
							models.Dispositivo.update(dispositivo, {where:{id:dispositivo.id}}).then(function(){
								if (dispositivo.imagem){
									controller.salvaImagem(path_novo,dispositivo.pathAntigo, dispositivo.imagem, dispositivo.id, true);
								}
								// busca o dispositivo pois o update nao retorna o objeto
								models.Dispositivo.findById(dispositivo.id, {include:[models.Pergunta]}).then(function(newDispositivo) {
									// associa as  respostas
									// Apaga as pergutas/resposta do dispositivo
									newDispositivo.setPerguntas([]).then(function() {
										dispositivo.perguntas.forEach(function(pergunta){
											// associa as pergutas/resposta do dispositivo
											newDispositivo.addPergunta(pergunta.id, {respostaId:pergunta.RespostaDispositivo.respostaId})
										});
									});
									// associa as normas
									// Apaga as normas do dispositivo
									newDispositivo.setNormas([]).then(function(){
										if(dispositivo.normas){
											dispositivo.normas.forEach(function(norma){
												// associa as normas do dispositivo
												newDispositivo.addNorma(norma.id);
											});
										}
									});
								});
							});
						}else{
							// Cadastra os novos dispositivos
							// cria uma instancia de dispositivo
							var disp = models.Dispositivo.build(dispositivo);
							// associa o laudo ao novo dispositivo
							disp.laudoId = laudo.id;
							// persiste no banco o novo dispositivo
							disp.save().then(function(newDispositivo){
								if (dispositivo.imagem){
									controller.salvaImagem(path_novo, dispositivo.pathAntigo, dispositivo.imagem, newDispositivo.id, false);
								}
								dispositivo.perguntas.forEach(function(pergunta){
									newDispositivo.addPergunta(pergunta.id, {respostaId:pergunta.RespostaDispositivo.respostaId});
								});
								// Cadastra as normas para o Dispositivo
								if(dispositivo.normas){
									dispositivo.normas.forEach(function(norma){
										newDispositivo.addNorma(norma.id);
									});
								}
							});
						}
					});
				}

				if(req.body.pontoPerigos){

						req.body.pontoPerigos.forEach(function(pontop){
						if(pontop.fotopp01){

						 	pontop.pathAntigo1 = pontop.fotopp01.path;
						 	pontop.fotopp01 = pontop.fotopp01.nome;
						 }
						 if(pontop.fotopp02){

 						 	pontop.pathAntigo2 = pontop.fotopp02.path;
 						 	pontop.fotopp02 = pontop.fotopp02.nome;
 						 }
						 if(pontop.fotopp03){

 						 	pontop.pathAntigo3 = pontop.fotopp03.path;
 						 	pontop.fotopp03 = pontop.fotopp03.nome;
 						 }
						 // atualiza ponto perigo
						  if(pontop.id){

						 	 models.PontoPerigo.update(pontop, {where:{id:pontop.id}}).then(function(){

						 			 if(pontop.fotopp01 != undefined){
										 sub_path = "/fotopp01/"
								      controller.salvaImagemPontoPerigo(path_novo, pontop.pathAntigo1, pontop.fotopp01, pontop.id, sub_path, laudo.id, true);
						 			 }

									 if(pontop.fotopp02 != undefined){
										sub_path = "/fotopp02/"
										controller.salvaImagemPontoPerigo(path_novo, pontop.pathAntigo2, pontop.fotopp02, pontop.id, sub_path, laudo.id, true);
									}

									if(pontop.fotopp03 != undefined){
										sub_path = "/fotopp03/"
										controller.salvaImagemPontoPerigo(path_novo, pontop.pathAntigo3, pontop.fotopp03, pontop.id, sub_path, laudo.id, true);
									}
						 	 models.PontoPerigo.findById(pontop.id).then(function(newPontoPerigo){

						 		  newPontoPerigo.setPerigos([]).then(function(){
										if(pontop.Perigos){
											pontop.Perigos.forEach(function(perigo){
												newPontoPerigo.addPerigo(perigo.id);
											});
										}
						 		  });

						 			newPontoPerigo.setRiscos([]).then(function(){
										if(pontop.Riscos){
											pontop.Riscos.forEach(function(risco){
												newPontoPerigo.addRiscos(risco.id);
											});
										}
									});

								  newPontoPerigo.setNormas([]).then(function(){

										  	if(pontop.normas){
													pontop.normas.forEach(function(norma){
														newPontoPerigo.addNorma(norma.id)
													});
										 		}
						 		  });
						 	 });
						 		});
						  }else{  // cria novo ponto perigo
							var pontoperigo = models.PontoPerigo.build(pontop);

							pontoperigo.laudoId = laudo.id;

							pontoperigo.save().then(function(newPontoPerigo){

								if(pontop.fotopp01 != undefined){
									sub_path = "/fotopp01/"
									controller.salvaImagemPontoPerigo(path_novo, pontop.pathAntigo1, pontop.fotopp01, newPontoPerigo.id, sub_path, laudo.id, false);
								}
								if(pontop.fotopp01 != undefined){
									sub_path = "/fotopp02/"
									controller.salvaImagemPontoPerigo(path_novo, pontop.pathAntigo2, pontop.fotopp02, newPontoPerigo.id, sub_path, laudo.id, false);
								}
								if(pontop.fotopp01 != undefined){
									sub_path = "/fotopp03/"
									controller.salvaImagemPontoPerigo(path_novo, pontop.pathAntigo3, pontop.fotopp03, newPontoPerigo.id, sub_path, laudo.id, false);
								}

								pontop.normas.forEach(function(norma){
									newPontoPerigo.addNorma(norma.id);
								});
								  pontop.Perigos.forEach(function(perigo){
								  	newPontoPerigo.addPerigo(perigo.id)
										perigo.Riscos.forEach(function(risco){
										newPontoPerigo.addRisco(risco.id);
										});
								  });
							});
						}
					})
				}

				/* Atualização normasTecnicas */
				if(req.body.normasTecnicas){
					// busca as normasTecnicas cadastradas no laudo
					models.NormaTecnica.findAll({
						where:{
							id:{ $in : req.body.normasTecnicas.map(function(item){
								return item.id;
							})}
						}
					}).then(function(normasTecnicas){
						// associa as normasTecnicas com o laudo
						laudo.setNormasTecnicas(normasTecnicas);
					});
				}

				if(req.body.limitesMaquinas){
					// busca as normasTecnicas cadastradas no laudo
					models.LimiteMaquina.findAll({
						where:{
							id:{ $in : req.body.limitesMaquinas.map(function(item){
								return item.id;
							})}
						}
					}).then(function(limitesMaquinas){
						// associa as normasTecnicas com o laudo
						laudo.setLimitesMaquinas(limitesMaquinas);
					});
				}
				
				return laudo;

				
			});
		}).then(function(laudo){
			res.json({'status':'success', 'message':'Alterado com sucesso.', 'data':laudo});
		}).catch(function(erro){
			console.error(erro);
			res.status(500).json({'status':'error', 'message':erro.message||'Internal Server Error', 'error':erro});
		});
	};

	controller.salvaImagem = function(path_novo, path_antigo, nomeImagem, idDispositivo, deletar){
		var path_novo_completo  = path_novo+'dispositivos/'+idDispositivo+'/';
		if (deletar){
			controller.deleteFolderRecursive(path_novo_completo);
		}
		mkdirp(path_novo_completo, function(err){

			if (err){
				return;
			}
			if (fs.existsSync(path_novo_completo)){
				fs.rename(path_antigo, (path_novo_completo+nomeImagem), function(err){
					if (err){
						console.log('Erro ao salvar o arquivo!');
					}
				});
			}
		});
	};

	controller.salvaImagemPontoPerigo = function(path_novo, path_antigo, nome, idPontoPerigo, sub_path, laudoId, deletar){

		var path_novo_completo = path_novo + 'laudos/'+laudoId+'/pontoPerigo/'+idPontoPerigo+sub_path;

		if (deletar){
			controller.deleteFolderRecursive(path_novo_completo);
		}
		mkdirp(path_novo_completo, function(err){
			if(err){
				console.log('erro ao criar pasta');
				return;
			}
			 if(fs.existsSync(path_novo_completo)){

					fs.rename(path_antigo, (path_novo_completo+nome), function(err){
						if(err){
							console.log(err);
							console.log('Erro ao salvar o arquivo');
						}
					});
				}
		});
	}

	controller.salvaImagemLimite = function(path_novo, path_antigo, laudoId, nomeImagem, deletar){

		var path_novo_completo = path_novo + 'laudos/'+laudoId+'/limite/';
		if (deletar){
			controller.deleteFolderRecursive(path_novo_completo);
		}
		mkdirp(path_novo_completo, function(err){
			if(err){
				console.log('erro ao criar pasta');
				return;
			}
			 if(fs.existsSync(path_novo_completo)){

			 		fs.rename(path_antigo, (path_novo_completo+nomeImagem), function(err){
			 			if(err){
			 				console.log(err);
			 				console.log('Erro ao salvar o arquivo');
			 			}
			 		});
			  }
		});
	}

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

    controller.confirma = function(req, res){
        Laudo.update({
            status : "Em Aprovação",
            data_final : Date()
        },
        {
            where:{
                'id':req.body.id
            }
        }).then(function(laudo){
            res.json({'status':'success', 'message':'Laudo enviado para aprovação.', 'data':laudo});
        });
    };

    controller.aprova = function(req, res){
        if(validaAutenticacao(req.decoded.cargo)){
            Laudo.update({
                status : "Aprovado",
                responsavelId : req.decoded.id
            },
            {
                where:{
                    'id':req.body.id
                }
            }).then(function(laudo){
                res.json({'status':'success', 'message':'Laudo aprovado com sucesso.', 'data':laudo});
            });
        }else{
            res.status(403).json({'status':'error', 'message':'Usuáro sem permissão de acesso!'});
        }

    };

    function validaAutenticacao (cargo){
        if(cargo !== 'Responsável Técnico'){
            return false;
        }else{
            return true;
        }
    }



	return controller;
};
