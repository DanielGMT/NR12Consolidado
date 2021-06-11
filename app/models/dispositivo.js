module.exports = function(sequelize, DataTypes){
	var Dispositivo =  sequelize.define('Dispositivo',{
		id: {
			type:DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		dispositivo: {
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				len:{
					args:[3,45],
					msg: "O campo deve ter entre 3 e 45 caracteres."
				},
				notEmpty:true
			}
		},
		face:{
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				len:{
					args:[3,45],
					msg: "O campo deve ter entre 3 e 45 caracteres."
				},
				notEmpty:true
			}
		},
		analiseProtecao:{
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				len:{
					args:[3,5000],
					msg: "O campo deve ter entre 3 e 5000 caracteres."
				},
				notEmpty:true
			}
		},
		indicacaoSolucao:{
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				len:{
					args:[3,5000],
					msg: "O campo deve ter entre 3 e 5000 caracteres."
				},
				notEmpty:true
			}
		},
		imagem: {
			type: DataTypes.STRING,
		}
	},
	{
		freezeTableName: true,
		timestamps: false,
		name:{singular:'dispositivo', plural:'dispositivos'},
		tableName:'dispositivo',
		classMethods: {
			associate: function(models){
				Dispositivo.belongsToMany(models.Pergunta, {through:'RespostaDispositivo', foreignKey:'dispositivoId'/*, otherKey:'perguntaId'*/});
				Dispositivo.belongsToMany(models.NormaRegulamentadora, {through:'NormaDispositivo', foreignKey:'dispositivoId', otherKey:'normaId'});
				Dispositivo.belongsTo(models.TipoDispositivo,{constraints:false});
				Dispositivo.belongsTo(models.Laudo, {foreignKey:'laudoId', targetKey:'id'});
				//Dispositivo.belongsToMany(models.Resposta, {through:'RespostaDispositivo', foreignKey:'dispositivoId'});
			}
		}
	});
	//Dispositivo.sync();
	return Dispositivo;
};
