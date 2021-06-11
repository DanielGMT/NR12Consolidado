module.exports = function(sequelize, DataTypes){
	var Cliente =  sequelize.define('Cliente',{
		id: {
			type:DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
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
		cnpj:{
			type: DataTypes.STRING,
			validate:{
				len:{
					args:[0,14],
					msg: "O campo deve ter 14 caracteres."
				}
			}
		},
		endereco:{
			type: DataTypes.STRING,
			allowNull: true,
			validate:{
				len:{
					args:[0,60],
					msg: "O campo deve ter no máximo 60 caracteres."
				}
			}
		},
		numero:{
			type:DataTypes.INTEGER,
			allowNull: true,
			validate:{
				len:{
					args:[0,6],
					msg: "O campo deve ter no máximo 6 caracteres."
				}
			}
		},
		bairro:{
			type: DataTypes.STRING,
			allowNull: true,
			validate:{
				len:{
					args:[3,45],
					msg: "O campo deve ter entre 3 e 45 caracteres."
				}
			}
		},
		cidade:{
			type: DataTypes.STRING,
			allowNull: true,
			validate:{
				len:{
					args:[3,45],
					msg: "O campo deve ter entre 3 e 45 caracteres."
				}
			}
		},
		estado:{
			type: DataTypes.STRING,
			allowNull: true,
			validate:{
				len:{
					args:[0,2],
					msg: "O campo deve ter 2 caracteres."
				}
			}
		},
		cep:{
			type: DataTypes.STRING,
			allowNull: true,
			validate:{
				len:{
					args:[0,8],
					msg: "O campo deve ter 8 caracteres."
				}
			}
		},
		telefone:{
			type: DataTypes.STRING,
			allowNull: true,
			validate:{
				len:{
					args:[0,11],
					msg: "O campo deve ter no máximo 11 caracteres."
				}
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
			validate:{
				len:{
					args:[0,60],
					msg: "O campo deve ter no máximo 60 caracteres."
				}
			}
		},
		 imagem:{
		 	type: DataTypes.STRING,
		 }
	},
	{
		freezeTableName: true,
		timestamps: false,
		name:{singular:'cliente', plural:'clientes'},
		tableName:'cliente',
		classMethods: {
			associate: function(models){
				Cliente.hasMany(models.Maquina);
				//Cliente.hasMany(models.Laudo,{foreignKey:'clienteId', sourceKey:'id'});
			}
		}
	});
	return Cliente;
};
