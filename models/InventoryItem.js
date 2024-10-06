const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const InventoryItem = sequelize.define('InventoryItem', {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  item_category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  item_barcode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  item_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  tableName: 'inventory_items',
  timestamps: false
});

module.exports = InventoryItem;
