module.exports = function(sequelize, DataTypes){
	var TipoDispositivo =  sequelize.define('TipoDispositivo',{
		id: {
			type:DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		tipo: {
			type: DataTypes.STRING,
			unique:true,
			allowNull: false,
			validate:{
				len:{
					args:[3,45],
					msg: "O campo deve ter entre 3 e 45 caracteres."
				},
				//notNull: true,
				notEmpty:true
			}
		}
	},
	{
		freezeTableName: true,
		timestamps: false,
		name:{singular:'tipoDispositivo', plural:'tiposDispositivos'},
		tableName:'tipodispositivo',
		classMethods: {
			associate: function(models){
				TipoDispositivo.hasMany(models.Pergunta);
			}
		}
	});
	return TipoDispositivo;
};
