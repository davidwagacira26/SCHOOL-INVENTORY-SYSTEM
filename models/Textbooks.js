const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Textbook = sequelize.define('Textbook', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true
  },
  barcode: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  image_path: { 
    type: DataTypes.STRING,
    allowNull: true 
  },
  textbook_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'textbooks',
  timestamps: false
});

module.exports = Textbook;
