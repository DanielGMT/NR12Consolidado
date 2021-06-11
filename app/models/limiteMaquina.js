module.exports = function(sequelize, DataTypes){
	var LimiteMaquina =  sequelize.define('LimiteMaquina',{
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
					msg: "Limite de máquina deve ter entre 3 e 45 caracteres."
				}
			}
		},
		descricao: {
			type: DataTypes.STRING,
			validate:{
				len:{
					args:[3,],
					msg: "Limite de máquina deve ter no mínimo 3 caracteres."
				}
			}
		}
	},
	{
		freezeTableName: true,
		timestamps: false,
		name:{singular:'limiteMaquina', plural:'limitesMaquinas'},
		tableName:'limitemaquina',
		
	});
	return LimiteMaquina;
};
