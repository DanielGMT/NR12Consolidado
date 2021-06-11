module.exports = function(sequelize, DataTypes){
	var Maquina =  sequelize.define('Maquina', {
		id: {
			type:DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		nome: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args:[3,45],
					msg: "Tamanho deve ter entre 3 e 45 caracteres"
				}
			}
		},
		modelo: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args:[0,45],
					msg: "O campo deve ter no máximo 45 caracteres."
				}
			}
		},
		numeroSerie: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args:[0,45],
					msg: "O campo deve ter no máximo 45 caracteres."
				}
			}
		},
		numeroPatrimonio: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args:[0,45],
					msg: "O campo deve ter no máximo 45 caracteres."
				}
			}
		},
		capacidade: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args:[0,45],
					msg: "O campo deve ter no máximo 45 caracteres."
				}
			}
		},
		ano: {
			type: DataTypes.INTEGER

		},
		fabricante: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args:[0,45],
					msg: "O campo deve ter no máximo 45 caracteres."
				}
			}
		},
		setor: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args:[0,45],
					msg: "O campo deve ter no máximo 45 caracteres"
				}
			}
		},
		genero: {
			type: DataTypes.STRING,
		},
		fotofront: {
			type: DataTypes.STRING,
		},
		fotold: {
			type: DataTypes.STRING,
		},
		fotole: {
			type: DataTypes.STRING,
		},
		fotopost: {
			type: DataTypes.STRING,
		}
	},
	{
		freezeTableName: true,
		timestamps: false,
		name:{singular:"maquina", plural:"maquinas"},
		tableName:'maquina',
		classMethods: {
			associate: function(models){
				Maquina.belongsTo(models.Cliente);
				Maquina.belongsTo(models.TipoMaquina);
			}
		}
	});

	return Maquina;

};
