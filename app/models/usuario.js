module.exports = function(sequelize, DataTypes){
	var Usuario =  sequelize.define('Usuario',{
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
		email: {
			type: DataTypes.STRING,
			validate:{
				len:{
					args:[0,60],
					msg: "O campo deve ter no máximo 60 caracteres."
				}
			}
		},
		senha:{
			type: DataTypes.STRING,
			validate:{
				len:{
					args:[0,45],
					msg: "O campo deve ter no máximo 45 caracteres."
				}
			}
		},
		cargo:{
			type: DataTypes.STRING,
			validate:{
				len:{
					args:[0,20],
					msg: "O campo deve ter no máximo 20 caracteres."
				}
			}
		},
		habilitacao:{
			type: DataTypes.STRING,
			validate:{
				len:{
					args:[0,45],
					msg: "O campo deve ter no máximo 45 caracteres."
				}
			}
		},
		crea:{
			type: DataTypes.STRING,
			validate:{
				len:{
					args:[0,15],
					msg: "O campo deve ter no máximo 15 caracteres."
				}
			}
		}
	}, {
		// Mantem o nome da tabela igual ao modelo
		freezeTableName: true,
		timestamps: false,
		name:{singular: 'usuario', plural:'usuarios'},
		tableName:'usuario'
	});
	return Usuario;
};
