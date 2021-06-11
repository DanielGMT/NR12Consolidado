module.exports = function(sequelize, DataTypes){
  var NormaPerigo = sequelize.define('NormaPerigo', {
    perigoId:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      foreignKey:true
    },
    normaId:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      foreignKey: true
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  //  createdAt: false,
  //  updatedAt: false,
    name:{singular:'normaPerigo', plural:'normaPerigos'},
    tableName:'normaperigo',
    classMethods: {
      associate: function(models){
        NormaPerigo.hasOne(models.Perigo, {onDelete:'cascade', foreignKey: 'id'});
        NormaPerigo.hasOne(models.PontoPerigo, {onDelete:'cascade', foreignKey: 'id'});
      }
    }
  });
  return NormaPerigo;
};
