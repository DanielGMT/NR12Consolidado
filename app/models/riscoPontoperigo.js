module.exports = function(sequelize, DataTypes){
  var RiscoPontoPerigo = sequelize.define('RiscoPontoPerigo',{
    riscoId: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      foreignKey:true
    },
    pontoperigoId:{
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
   name:{singular:'riscoPontoPerigo', plural:'riscoPontoPerigos'},
   tableName:'riscopontoperigo',
   classMethods: {
     associate: function(models){
       RiscoPontoPerigo.hasOne(models.PontoPerigo, {onDelete:'cascade', foreignKey: 'id'});
       RiscoPontoPerigo.hasOne(models.Risco, {onDelete:'cascade', foreignKey: 'id'});
     }
   }
  });
  return RiscoPontoPerigo;
};
