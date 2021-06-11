module.exports = function(sequelize, DataTypes){
	var Pergunta =  sequelize.define('Pergunta',{
		id: {
			type:DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		pergunta: {
			type: DataTypes.STRING,
			validate:{
				len:{
					args:[3,55],
					msg: "O campo deve ter entre 3 e 55 caracteres."
				}
			}
		},
		respostaCorreta: {
			type:DataTypes.INTEGER
		}
	},
	{
		freezeTableName: true,
		timestamps: false,
		name: {singular:'pergunta', plural:'perguntas'},
		tableName:'pergunta',
		classMethods: {
			associate: function(models){
				Pergunta.belongsTo(models.TipoDispositivo);
				Pergunta.belongsToMany(models.Resposta, {through:'PerguntaResposta', foreignKey:'perguntaId'});
				Pergunta.belongsToMany(models.Dispositivo, {through:'RespostaDispositivo', foreignKey:'perguntaId'});
			}
		}
	});
	//Pergunta.sync();
	return Pergunta;
};
