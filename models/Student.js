const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Student = sequelize.define('student', {
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  student_name: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false 
});

module.exports = Student;
