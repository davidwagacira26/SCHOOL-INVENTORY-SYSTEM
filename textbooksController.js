const { DataTypes, Model } = require('sequelize');
const sequelize = require('./database'); 

class Textbook extends Model {}

Textbook.init({
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
  textbook_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize, 
  modelName: 'Textbook', 
  tableName: 'textbooks', 
  timestamps: false 
});

Textbook.getTextbookByBarcode = async function(barcode) {
  try {
    const textbook = await Textbook.findOne({ where: { barcode: barcode } });
    return textbook;
  } catch (error) {
    console.error('Error retrieving textbook by barcode:', error);
    throw error;
  }
}

module.exports = Textbook;
