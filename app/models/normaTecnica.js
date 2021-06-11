module.exports = function(sequelize, DataTypes){
    var NormaTecnica = sequelize.define('NormaTecnica', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            validate:{
                len:{
                    args:[3, 45],
                    msg: "O campo dever ter entre 3 e 45 caracteres."
                }
            }
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
            validade:{
                len:{
                    args:[3,],
                    msg: "O campo deve ter no minimo 3 caracteres."
                }
            }
        },
        tipo: {
            type:DataTypes.STRING,
            validade: {
                uniqueOne: { type: DataTypes.STRING,  unique: 'A'},
                uniqueTwo: { type: DataTypes.STRING, unique: 'B'},
                uniqueThree: { type: DataTypes.STRING, unique: 'C'}
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
        name: {singular: 'normaTecnica', plural: 'normasTecnicas'},
        tableName:'normatecnica',
        classMethods: {
            associate: function(models){
                NormaTecnica.belongsToMany(models.Laudo, {through:'NormatecnicaLaudo', foreignKey:'normaTecnicaId'});
            }
        }
    });

    return NormaTecnica;

};
