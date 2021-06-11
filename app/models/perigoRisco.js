module.exports = function(sequelize, DataTypes){
	var PerigoRisco =  sequelize.define('PerigoRisco', {
		perigo: {
			type:DataTypes.INTEGER,
			primaryKey: true,
			foreignKey: true
		},
		risco: {
			type:DataTypes.INTEGER,
			primaryKey: true,
			foreignKey: true
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		tableName:'perigorisco',
		classMethods: {
			associate: function(models){
				PerigoRisco.hasOne(models.Risco, {foreignKey: 'id'});
				PerigoRisco.hasOne(models.Perigo, {foreignKey: 'id'});
			}
		}
	});

	return PerigoRisco;

};
