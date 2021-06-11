'use strict'
var models = require('../models');
module.exports = function(app){
    var NormaTecnica = models.NormaTecnica;
    var controller = {};

    controller.listaTodos = function(req, res){

        NormaTecnica.all().then(
            function(data){
                if(!data) throw new Error("Norma Tecnica nao encontra")
                res.json({'data': data || [], 'status': 'success'});
            }
        );
    };

    controller.obtemNormaTecnica = function(req, res){
        var _id = req.params.id;
        NormaTecnica.findById(_id).then(
            function(data){
                if(!data) throw new Error('Noma técnica não encontrada');
                res.json({'data': data, 'status': 'success'});
            }
        ).catch(function(erro){
            res.status(500).json({'status':'error', 'message': erro.message || 'Internal server Error', 'error': erro });
        });
    };

    controller.salvaNormaTecnica = function(req, res){
        models.NormaTecnica.findOne({
            where: {
                nome: req.body.nome
            }
        }).then(function(data){
            res.status(500).json({'status':'error', 'message':'A Norma Técnica '+data.nome+' já se encontra cadastrada', 'erro':data});
        }).catch(function(erro){
            NormaTecnica.create(req.body).then(
                function(data){
                    res.status(201).json({'status': 'success', 'message': 'Salvo com sucesso', 'data': data});
                }
            ).catch(function(erro){
                console.error(erro);
                res.status(500).json({'status': 'error', 'message': 'Internal Server Error', 'error': erro});
            });
        })
    };

    controller.updateNormaTecnica = function (req, res){
        var _id = req.body.id;
        models.NormaTecnica.findOne({where:{nome:req.body.nome}}).then(function(data){
          if(req.body.id == data.id){
            NormaTecnica.update(
                req.body,
                {fields:['nome', 'descricao', 'tipo'],where:{'id': _id}}
            ).then(function(data){
                res.json({'status': 'success', 'message': 'Alterado com sucesso.', 'data': data});
            }).catch(function(erro){
                res.status(500).json({'status': 'error', 'message': 'Internal Server Error', 'error': erro});
            });
          }
          if(req.body.id != data.id){
            res.status(500).json({'status':'error', 'message':'A Norma Técnica '+data.nome+' já se encontra cadastrada', 'erro':data});
          }
        }).catch(function(erro){
          NormaTecnica.update(
              req.body,{fields:['nome', 'descricao', 'tipo'],where:{'id': _id}}
          ).then(function(data){
              res.json({'status': 'success', 'message': 'Alterado com sucesso.', 'data': data});
          }).catch(function(erro){
              res.status(500).json({'status': 'error', 'message': 'Internal Server Error', 'error': erro});
          });
        });
    };

    controller.removeNormaTecnica = function (req, res){
        var _id = req.params.id;

        NormaTecnica.destroy({where:{"id": _id}}).then(
            function(data){
                res.json({'status': 'success', 'message': 'Removido com sucesso.', 'data': data});
            }).catch(function(erro){
                res.status(500).json({'status': 'error', 'message': 'Internal Server Error', 'error': erro});
            });
        };
        return controller;
    };
