module.exports = function(sequelize, DataTypes){
	var TipoMaquina =  sequelize.define('TipoMaquina',{
		id: {
			type:DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: 'true'
		},
		nome: {
			type: DataTypes.STRING,
			validate:{
				len:{
					args:[3,45],
					msg: "Tipo de máquina deve ter entre 3 e 45 caracteres."
				}
			}
		},
		descricao: {
			type: DataTypes.STRING,
			validate:{
				len:{
					args:[3,],
					msg: "Tipo de máquina deve ter no mínimo 3 caracteres."
				}
			}
		}
	},
	{
		freezeTableName: true,
		timestamps: false,
		name:{singular:'tipoMaquina', plural:'tiposMaquinas'},
		tableName:'tipomaquina',
		classMethods: {
			associate: function(models){
				TipoMaquina.belongsTo(models.Capacitacao);
			}
		}
	});
	return TipoMaquina;
};
