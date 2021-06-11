module.exports = function(sequelize, DataTypes){
  var PerigoPontoPerigo = sequelize.define('PerigoPontoPerigo', {
    perigoId:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      foreignKey:true
    },
    pontoperigoId:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      foreignKey: true
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName:'perigopontoperigo',
    name:{singular:'PerigoPontoPerigo', plural:'PerigoPontoPerigos'},
    classMethods: {
      associate: function(models){
        PerigoPontoPerigo.hasOne(models.Perigo, {onDelete:'cascade', foreignKey: 'id'});
        PerigoPontoPerigo.hasOne(models.PontoPerigo, {onDelete:'cascade', foreignKey: 'id'});
      }
    }
  });
  return PerigoPontoPerigo;
};
