const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Student = require('./Student');
const InventoryItem = require('./InventoryItem');
const CheckoutRecord = sequelize.define('CheckoutRecord', {
    checkout_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    student_name: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    item_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    check_out_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    check_in_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'checkoutrecords',
    timestamps: false
});
CheckoutRecord.belongsTo(Student, { foreignKey: 'student_id', as: 'CheckoutStudent' });
CheckoutRecord.belongsTo(InventoryItem, { foreignKey: 'item_id', as: 'InventoryItem' });

module.exports = CheckoutRecord;
