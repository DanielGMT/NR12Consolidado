'use strict';

// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
var models = require('../models');
module.exports = function(app){

	var jwt = require('jsonwebtoken');
	var Usuario = models.Usuario;
	var md5 = require('md5');

	var controller = {};

	controller.authenticate = function(req, res){
        var msg;
        var senhaPadrao = false;
		var senha = new Buffer(req.body.senha,'base64').toString();
        if (senha === 'senai12345'){
            senhaPadrao = true;
            msg = 'Redefina sua Senha!';
        }
        console.log("@@@@@@@@@ teste @@@@@@@@@@@\n", req.body);
		Usuario.findOne({
			attributes:['id','nome','email','senha','cargo', 'habilitacao', 'crea'],
			where:{email:req.body.email}
		}).then(function(user){
			if(!user){ //throw new Error("Usuário não encontrado");
				res.json({ status: 'error', message: 'A autenticação falhou. Usuário não encontrado.' });
			}else if(user){
				// verifica se a senha coincide
				if(user.senha != md5(senha)){
					res.json({ status: 'error', message: 'A autenticação falhou. Senha incorreta.' });
				}else{
					// Se o usuário for encontrado e a senha estiver correta
					// Cria um tokem
					var usuario = {
						id: user.id,
						cargo: user.cargo
					};
					var token = jwt.sign(usuario, app.get('superSecret'), {expiresIn: 86400});
					// retorna as informações incluindo token como JSON
					return res.json({
						status:'success',
						message: msg || 'Sucesso no Login',
						token: token,
                        senhaPadrao,
                        usuario: user.nome
					});
				}
			}
			//res.json({'data':data, 'status':'success'});
		}).catch(function(erro){
			console.log(erro);
			res.status(500).json({'status':'error', 'message':'Authentication failed. User not found.', 'error':erro});
		});
	};

	controller.password = function(req, res){
		var senhaAtual = new Buffer(req.body.senhaAtual,'base64').toString();
		var novaSenha = new Buffer(req.body.novaSenha,'base64').toString();
        if (md5(novaSenha) !== '103fadb3be608826d2386d700cae3cec'){
            Usuario.findOne({
                attributes:['id','nome','email','senha'],
                where:{id:req.decoded.id}
            }).then(function(user){
                if(!user){ //throw new Error("Usuário não encontrado");
                    res.status(500).json({ status: 'error', message: 'Usuário não encontrado.' });
                }else if(user){
                    // verifica se a senha coincide
                    if(user.senha != md5(senhaAtual)){
                        res.status(500).json({ status: 'error', message: 'Senha atual incorreta.' });
                    }else{
                        user.update({
                            senha:md5(novaSenha)
                        }).then(function(data){
                            res.json({'status':'success', 'message':'Senha alterada!!!!'});
                        }).catch(function(erro){
                            console.error(erro);
                            res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
                        });
                    }
                }
            }).catch(function(erro){
                console.log(erro);
                res.status(500).json({'status':'error', 'message':'Usuario não encontrado.', 'error':erro});
            });    
        }else{
            res.status(500).json({'status':'error', 'message':'Senha padrão deve ser alterada!', 'error':'Erro'});    
        } 
	};

	controller.logout = function(req, res){
		res.render('login', {home: 'Express'});
	};

	return controller;
};
