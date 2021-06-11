module.exports = function(sequelize, DataTypes){
	var Perigo =  sequelize.define('Perigo', {
		id: {
			type:DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		nome: {
			type:DataTypes.STRING,
			validate: {
				len: {
					args:[3,45],
					msg: "Tamanho deve ter entre 3 e 45 caracteres"
				}
			}
		},
		descricao: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args:[3,500],
					msg: "Tamanho deve ter entre 3 e 500 caracteres"
				}
			}
		}
	},
	{
		freezeTableName: true,
		timestamps: false,
		createdAt: false,
		updatedAt: false,
		tableName:'perigo',
		classMethods: {
			associate: function(models){
				Perigo.belongsToMany(models.Risco, { through : 'PerigoRisco', foreignKey : 'perigo', targetKey:'id' });
				Perigo.belongsToMany(models.NormaRegulamentadora, { through : 'NormaPerigo', foreignKey : 'perigoId', targetKey:'id' });
				Perigo.belongsToMany(models.PontoPerigo, { through : 'PerigoPontoPerigo', foreignKey : 'perigoId', targetKey:'id' }, {constraints:false});
				//Perigo.belongsTo(models.TipoMaquina, {constraints:false});
			}
		}
	});

	return Perigo;

};
