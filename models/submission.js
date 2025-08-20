'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    static associate(models) {}
  }
  Submission.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "First name is required" },
        notEmpty: { msg: "First name cannot be empty" }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Last name is required" },
        notEmpty: { msg: "Last name cannot be empty" }
      }
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Department is required" },
        notEmpty: { msg: "Department cannot be empty" }
      }
    },
    years: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Years is required" },
        notEmpty: { msg: "Years cannot be empty" }
      }
    },
    average: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: { args: [0], msg: "Average must be >= 0" },
        max: { args: [5], msg: "Average must be <= 5" }
      }
    }
  }, {
    sequelize,
    modelName: 'Submission',
  });
  return Submission;
};
