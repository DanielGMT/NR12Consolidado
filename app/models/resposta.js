module.exports = function(sequelize, DataTypes){
	var Resposta =  sequelize.define('Resposta',{
		id: {
			type:DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		resposta: {
			type: DataTypes.STRING,
			validate:{
				len:{
					args:[2,45],
					msg: "O campo deve ter entre 2 e 45 caracteres."
				}
			}
		}
	},
	{
	    freezeTableName: true,
	    timestamps: false,
	    name:{singular:'resposta', plural:'respostas'},
	    tableName:'resposta',
		classMethods: {
			associate: function(models){
				Resposta.belongsToMany(models.Pergunta, {through:'PerguntaResposta', foreignKey:'respostaId'});
			}
		}
	});
	return Resposta;
};
