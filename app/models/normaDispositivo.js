module.exports = function(sequelize, DataTypes){
	var NormaDispositivo =  sequelize.define('NormaDispositivo', {
		normaId: {
			type:DataTypes.INTEGER,
			primaryKey: true,
			foreignKey: true
		},
		dispositivoId: {
			type:DataTypes.INTEGER,
			primaryKey: true,
			foreignKey: true
		}
	},
	{
		freezeTableName: true,
		timestamps: false,
		createdAt: false,
		updatedAt: false,
		name:{singular:'normaDipositivo', plural:'normasDipositivos'},
		tableName:'normadispositivo',
		classMethods: {
			associate: function(models){
				NormaDispositivo.hasOne(models.Dispositivo, {onDelete:'cascade', foreignKey: 'id'});
				NormaDispositivo.hasOne(models.NormaRegulamentadora, {onDelete:'cascade', foreignKey: 'id'});
			}
		}
	});
	//NormaDipositivo.sync();
	return NormaDispositivo;
};
