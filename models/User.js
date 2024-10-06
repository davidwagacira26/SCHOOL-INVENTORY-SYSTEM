const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    lastname: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    is_staff: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    tableName: 'user', 
    modelName: 'User', 
    timestamps: false 
});

module.exports = User;
