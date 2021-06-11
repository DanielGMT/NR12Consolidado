module.exports = function(sequelize, DataTypes){
	var PontoPerigo =  sequelize.define('PontoPerigo',{
		id: {
			type:DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		pontoperigo:{
			type:DataTypes.STRING
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
		anexo1:{
			type: DataTypes.BOOLEAN
		},
		NBR14153:{
			type: DataTypes.BOOLEAN
		},
		severidade:{
			type:DataTypes.STRING
		},
		frequencia:{
			type:DataTypes.STRING
		},
		possibilidade:{
			type:DataTypes.STRING
		},
		pe:{
			type:DataTypes.STRING
		},
		fe:{
			type:DataTypes.STRING
		},
		pmp:{
			type:DataTypes.STRING
		},
		np:{
			type:DataTypes.STRING
		},
		nivelRisco:{
			type:DataTypes.FLOAT
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
		fotopp01: {
			type: DataTypes.STRING
		},
		anexo1: {
			type: DataTypes.STRING
		}/*
		fotopp02: {
			type: DataTypes.STRING
		},
		fotopp03: {
			type: DataTypes.STRING
		}*/
	},
	{
		freezeTableName: true,
		timestamps: false,
		createdAt: false,
		updatedAt: false,
		name:{singular:'pontoPerigo', plural:'pontoPerigos'},
		tableName:'pontoperigo',
		classMethods: {
			associate: function(models){
				PontoPerigo.belongsTo(models.SistemaSeguranca);
				PontoPerigo.belongsTo(models.Laudo, {foreignKey:'laudoId', targetKey:'id'});
				PontoPerigo.belongsToMany(models.Perigo, {through:'PerigoPontoPerigo', foreignKey:'pontoperigoId'});
				PontoPerigo.belongsToMany(models.Risco, {through:'RiscoPontoPerigo', foreignKey:'pontoperigoId'});
				PontoPerigo.belongsToMany(models.NormaRegulamentadora, {through:'NormaPontoPerigo', foreignKey:'pontoperigoId'});
				//PontoPerigo.hasMany(models.ImagemPontoPerigo, {foreignKey:'pontoperigoId', sourceKey: 'id'});
			}
		}
	});
	//PontoPerigo.sync();
	return PontoPerigo;
};
