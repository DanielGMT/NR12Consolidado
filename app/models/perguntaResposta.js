module.exports = function(sequelize, DataTypes){
	var PerguntaResposta =  sequelize.define('PerguntaResposta', {
		/*
		perguntaId: {
			type:DataTypes.INTEGER,
			primaryKey: true,
			foreignKey: true
		},
		respostaId: {
			type:DataTypes.INTEGER,
			primaryKey: true,
			foreignKey: true
		},*/

	},
	{
		freezeTableName: true,
		timestamps: false,
		name:{singular:'perguntaResposta', plural:'perguntasRespostas'},
		tableName:'perguntaresposta',
		classMethods: {
			associate: function(models){
				PerguntaResposta.hasOne(models.Pergunta, {onDelete:'cascade', foreignKey: 'id'});
				PerguntaResposta.hasOne(models.Resposta, {onDelete:'cascade', foreignKey: 'id'});
			}
		}
	});
	return PerguntaResposta;

};
