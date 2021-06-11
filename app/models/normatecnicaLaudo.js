module.exports = function(sequelize, DataTypes){
	var NormatecnicaLaudo =  sequelize.define('NormatecnicaLaudo', {
		/*
		normaTecnicaId: {
			type:DataTypes.INTEGER,
			primaryKey: true,
			foreignKey: true
		},
		laudoId: {
			type:DataTypes.INTEGER,
			primaryKey: true,
			foreignKey: true
		}*/
	},
	{
		freezeTableName: true,
		timestamps: false,
		tableName:'normatecnicalaudo',
		classMethods: {
			associate: function(models){
				NormatecnicaLaudo.hasOne(models.Laudo, {onDelete:'cascade', foreignKey: 'id'});
				NormatecnicaLaudo.hasOne(models.NormaTecnica, {onDelete:'cascade', foreignKey: 'id'});
			}
		}
	});
	//NormatecnicaLaudo.sync();
	return NormatecnicaLaudo;

};
