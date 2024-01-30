const { Sequelize } = require("sequelize");
require('../models/Awards')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
  });
  
module.exports = sequelize;
