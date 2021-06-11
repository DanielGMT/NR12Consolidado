'use strict'
var models = require('../models');
module.exports = function(app){

    var NormaReg = models.NormaRegulamentadora;
    var controller = {};

    controller.listaTodos = function(req, res){
        NormaReg.all().then(
            function(data){
                if(!data) throw new Error("Item da norma não encontrado");
                res.json({'data': data, 'status': 'success'});
            }
        );
    };

    controller.obtemNormaReg = function(req, res){
        var id = req.params.id;
        NormaReg.findById(id).then(
            function(data){
                console.error(data.item);
                if(!data) throw new Error("Item da norma não encontrado");
                res.json({'data': data, 'status': 'success'});
            }
        )
        .catch(function(erro){
            console.log(erro);
            res.status(500).json({'status': 'error', 'message': erro.message || 'Internal Server Error', 'error':erro})
        });
    };

    controller.removeNormaReg = function(req, res){
        var id = req.params.id;

        NormaReg.destroy({where:{"id": id}}).then(
            function(data){

                res.json({'status': 'sucess', 'message': 'Removido com sucesso.', 'data': data});
            }
        )
        .catch(function(erro){
            res.status(500).json({'status': 'error', 'message': 'Internal Server Error', 'error':erro})
        });
    };

    controller.salvaNormaReg = function(req, res){
        console.log("ID DANORMA REGULAMENTADORA");
        console.log(req.body.item);
        models.NormaRegulamentadora.findOne({
            where: {
                item: req.body.item
            }
        }).then(function(data){
            res.status(500).json({'status':'error', 'message':'A Norma Regulamentadora '+data.item+' já se encontra cadastrada', 'erro':data});
        }).catch(function(data){
            NormaReg.create(req.body).then(
                function(data){
                    res.status(201).json({'status': 'success', 'message':'Salvo com sucesso.', 'data': data})
                }
            )
            .catch(function(erro){
                console.error(erro);
                res.status(500).json({'status': 'error', 'message': 'Internal Server Error', 'erro':erro});
            });
        })
    };

    controller.updateNormaReg = function(req, res){
      //  var id = req.body.id;
        models.NormaRegulamentadora.findOne({where:{item: req.body.item}}).then(function(data){
          if(req.body.id == data.id){
            NormaReg.update(
                req.body,
                {fields: ['item', 'norma'], where:{'id':req.body.id}}
            ).then(function(data){
                res.json({'status': 'success', 'message': 'Alterado com sucesso', 'data': data});
            })
            .catch(function(erro){
                res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
            });
          }
          if(req.body.id != data.id){
            res.status(500).json({'status':'error', 'message':'A Norma Regulamentadora '+data.item+' já se encontra cadastrada', 'erro':data});
          }
        }).catch(function(erro){
          NormaReg.update(
              req.body,
              {fields: ['item', 'norma'], where:{'id':req.body.id}}
          ).then(function(data){
              res.json({'status': 'success', 'message': 'Alterado com sucesso', 'data': data});
          })
          .catch(function(erro){
              res.status(500).json({'status':'error', 'message':'Internal Server Error', 'error':erro});
          });
        });


    };
    return controller;
};
