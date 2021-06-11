module.exports = function(sequelize, DataTypes){
	var NormaRegulamentadora =  sequelize.define('NormaRegulamentadora',{
		id:{
			type:DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		item:{
			type: DataTypes.STRING,
			validate:{
				len:{
					args:[3, 10],
					msg: "O campo deve ter entre 3 e 10 caracteres."
				}
			}
		},
		norma:{
			type: DataTypes.STRING,
			allowNull: false,
			//defaultValue: null,
			validate:{
				len:{
					args:[3, 5000],
					msg: "O campo deve ter no mínimo 3 caracteres."
				}
			}
		}
	},
	{
		freezeTableName: true,
		timestamps: false,
		createdAt: false,
		updatedAt: false,
		name:{singular:'norma', plural:'normas'},
		tableName:'normaregulamentadora',
		classMethods: {
			associate: function(models){
				//NormaRegulamentadora.belongsToMany(models.Dispositivo, {through:'NormaDispositivo', foreignKey:'normaId', targetKey:'id'});
				//NormaRegulamentadora.belongsToMany(models.PontoPerigo, {through:'NormaPontoPerigo', foreignKey:'normaId'/*, targetKey:'id'*/});
				//NormaRegulamentadora.belongsToMany(models.Perigo, {through:'NormaPerigo', foreignKey:'normaId', targetKey:'id'});
			}
		}
	});
	//NormaRegulamentadora.sync();
	return NormaRegulamentadora;
};
