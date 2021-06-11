module.exports = function(sequelize, DataTypes){
  var NormaPontoPerigo = sequelize.define('NormaPontoPerigo', {
    normaId: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true
    },
    pontoperigoId: {
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
    name:{singular:'normaPontoperigo', plural:'normaPontoperigos'},
    tableName:'normapontoperigo',
    classMethods:{
      associate: function(models){
        NormaPontoPerigo.hasOne(models.PontoPerigo, {onDelete:'cascade', foreignKey: 'id'});
        NormaPontoPerigo.hasOne(models.NormaRegulamentadora, {onDelete:'cascade', foreignKey: 'id'});
      }
    }
  });
  return NormaPontoPerigo;
};
