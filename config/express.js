var express = require('express');
//var home = require('../app/routes/home');
var load = require('express-load');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var jwt = require('jsonwebtoken');

// mysql
var mysql = require('mysql');
var connection = require('express-myconnection');

module.exports = function(){
	var app = express();

	//Configuracao de ambiente
	app.set('port', 3000);

	app.set('superSecret', config.secret);

	//Configuracao de Middleware
	app.use(express.static('./public'));
	app.use(express.static('./files'));
	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());
	app.use(morgan('dev'));
    
    app.use(function(req, res, next){
        const PASSWORD = app.get('superSecret');
        if (req.url !== '/authenticate'){
            var auth = req.headers.authorization;
            if (!auth || !auth.startsWith('Bearer')){
                return res.status(401).json({'status':'error', 'message':'Usuário não autenticado!'});
            }
            auth = auth.split('Bearer').pop().trim().toString();
            jwt.verify(
                auth, 
                PASSWORD, 
                function(err, decoded){
                    if (err){
                        return res.status(401).json({'status':'error', 'message':'Autenticação Inválida!'});    
                    }
                    if (decoded){
                        req.decoded = decoded;
                        next();    
                    }
                }
            );
        }else{
            next();    
        }   
    });

	//load(app);
	//load('models', {cwd: 'app'})
	load('controllers', {cwd: 'app'})
	.then('routes')
	.into(app);

	// Definindo rota para erro 404
	app.get('*', function(req, res){
		res.status(404).render('404');
	});
	return app;
};
