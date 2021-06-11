module.exports = function(sequelize, DataTypes){
    var Configuracoes =  sequelize.define('Configuracoes', {
        id: {type:DataTypes.INTEGER, primaryKey: true},
        portaria: {
            type: DataTypes.STRING,
            allowNull: true,
            validate:{
                len:{
                    args:[5],
                    msg: "portaria deve ter no mínimo 5 caracteres."
                }
            }
        },
        dispositivos: {
            type: DataTypes.STRING,
            allowNull: true,
            validate:{
                len:{
                    args:[5],
                    msg: "O campo deve conter no mínimo 5 caracteres."
                }
            }
        },
        resptecnica:{
            type: DataTypes.STRING,
            allowNull: true,
            validate:{
                len:{
                    args:[5],
                    msg: "O campo deve conter no mínimo 5 caracteres."
                }
            }
        },
        disposicaofinal:{
            type: DataTypes.STRING,
            allowNull: true,
            validate:{
                len:{
                    args:[3],
                    msg: "O campo deve conter no mínimo 3 caracteres."
                }
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
        tableName:'configuracoes'
    });
    return Configuracoes;
};
