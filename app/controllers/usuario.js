'use strict';
var models = require('../models');
module.exports = function(app){

	var Usuario = models.Usuario;

	var controller = {};

	controller.obtemUsername = function(req, res){
        if (validaAutenticacao(req.decoded)){
            Usuario.findOne({attributes:['id','nome','email','senha'],where:{email:req.params.username}}).then(function(data){
                if(!data) throw new Error("Usuário não encontrado");
                res.json({'data':data, 'status':'success'});
            }).catch(function(erro){
                res.status(404).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
            });    
        }else{
            res.status(403).json({'status':'error', 'message':'Usuáro sem permissão de acesso!'});
        }
	};

	controller.listaTodos = function(req, res){
        if (validaAutenticacao(req.decoded)){
            Usuario.all().then(function(data){
                res.json({'data':data || [], 'status':'success'});
            });    
        }else{
            res.status(403).json({'status':'error', 'message':'Usuáro sem permissão de acesso!'});
        }
	};

	controller.obtemUsuario = function(req, res){
        if (validaAutenticacao(req.decoded)){
            Usuario.findById(req.params.id).then(function(data){
                if(!data) throw new Error("Usuário não encontrado - teste");
                res.json({'data':data, 'status':'success'});
            }).catch(function(erro){
                res.status(404).json({'status':'error', 'message': erro.message||'Internal Server Error', 'error':erro});
            });
        }else{
            res.status(403).json({'status':'error', 'message':'Usuáro sem permissão de acesso!'});
        }
	};

	controller.removeUsuario = function(req, res){
        if (validaAutenticacao(req.decoded)){
            Usuario.destroy({where:{"id":req.params.id}}).then(function(data){
                res.json({'status':'success', 'message': 'Removido com sucesso.'});
            }).catch(function(erro){
                res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
            });
        }else{
            res.status(403).json({'status':'error', 'message':'Usuáro sem permissão de acesso!'});
        }
	};

	controller.salvaUsuario = function(req, res){
        if (validaAutenticacao(req.decoded)){
            req.body.senha = '103fadb3be608826d2386d700cae3cec';
		    Usuario.create(req.body).then(function(data){
                res.status(201).json({'status':'success', 'message':'Salvo com sucesso.', 'data':data});
            }).catch(function(erro){
                console.error(erro);
                res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
            });    
        }else{
            res.status(403).json({'status':'error', 'message':'Usuáro sem permissão de acesso!'});
        }             
	};

	controller.updateUsuario = function(req, res){
        if (validaAutenticacao(req.decoded)){
            Usuario.update(req.body, {where:{'id':req.params.id}}).then(function(data){
                res.json({'status':'success', 'message':'Alterado com sucesso.', 'data':data});
            }).catch(function(erro){
                console.error(erro);
                res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
            });    
        }else{
            res.status(403).json({'status':'error', 'message':'Usuáro sem permissão de acesso!'});    
        }
	};
    
    function validaAutenticacao (decoded){
        if(decoded.cargo !== 'Responsável Técnico'){
            return false;
        }else{
            return true;
        }
    }
    
	return controller;
};
