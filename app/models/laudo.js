module.exports = function(sequelize, DataTypes){
	var Laudo =  sequelize.define('Laudo', {
		id: {
			type:DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		codigo: {
			type:DataTypes.STRING
		},
		status: {
			type: DataTypes.STRING
		},
		data_inicial: {
			type: DataTypes.DATE,
		},
		data_final: {
			type: DataTypes.DATE,
		},
		limitesMaquina: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args:[3,5000],
					msg: "Tamanho deve ter entre 3 e 5000 caracteres"
				}
			}
		},
		imagem: {
			type: DataTypes.STRING,
		}
	},
	{
		freezeTableName: true,
		timestamps: false,
		name: {singular: 'laudo', plural: 'laudos'},
		tableName:'laudo',
		classMethods: {
			associate: function(models){
				Laudo.belongsTo(models.Usuario);
                Laudo.belongsTo(models.Usuario, {as : 'responsavel'});
				//Laudo.belongsTo(models.Cliente);
				Laudo.belongsTo(models.Maquina);
				Laudo.hasMany(models.Dispositivo, {foreignKey:'laudoId', sourceKey: 'id'});
				Laudo.hasMany(models.PontoPerigo, {foreignKey:'laudoId', sourceKey: 'id'});
				Laudo.belongsToMany(models.NormaTecnica, {through:'NormatecnicaLaudo', foreignKey:'laudoId'});
			}
		}
	});
	return Laudo;
};
