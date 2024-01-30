const { DataTypes } = require("sequelize");
const sequelize = require("../services/DatabaseService");

// Definição do modelo para a tabela no banco de dados
const Awards = sequelize.define("Awards", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  studios: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  producers: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  winner: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Awards;
