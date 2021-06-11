var Sequelize = require('Sequelize');
var sequelize = new Sequelize('nr12', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define:{
    timestamps: false
  }
});
module.exports = sequelize;
