module.exports = function(sequelize, DataTypes){
	var Capacitacao =  sequelize.define('Capacitacao', {
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
					msg: "O campo deve ter entre 3 e 45 caracteres."
				}
			}
		},
		descricao: {
			type: DataTypes.STRING,

			validate:{
				len:{
					args:[3,5000],
					msg: "O campo deve ter entre 3 e 5000 caracteres."
				}
			}
		}
  	},
  	{
		freezeTableName: true,
		timestamps: false,
		tableName:'capacitacao'
  	});
	return Capacitacao;
};
