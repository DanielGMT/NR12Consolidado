module.exports = function(sequelize, DataTypes){
	var RespostaDispositivo =  sequelize.define('RespostaDispositivo', {
		perguntaId: {
			type:DataTypes.INTEGER,
			primaryKey: true,
			foreignKey: true
		},
		dispositivoId: {
			type:DataTypes.INTEGER,
			primaryKey: true,
			foreignKey: true
		},
		respostaId: {
			type:DataTypes.INTEGER,
			primaryKey: true,
			foreignKey: true
		}
		
	},
	{
		freezeTableName: true,
		timestamps: false,
		//name:{singular:'respostaDispositivo', plural:'respostaDispositivos'},
		tableName:'respostadispositivo',
		classMethods: {
			associate: function(models){
				RespostaDispositivo.hasOne(models.Dispositivo, {onDelete:'cascade', foreignKey: 'id'});
				RespostaDispositivo.hasOne(models.Pergunta, {onDelete:'cascade', foreignKey: 'id'});
				RespostaDispositivo.belongsTo(models.Resposta);
			}
		}
	});
	//RespostaDispositivo.sync();
	return RespostaDispositivo;

};
