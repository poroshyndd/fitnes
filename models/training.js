// backend/models/training.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Training extends Model {
    static associate(models) {
      // каждая тренировка принадлежит пользователю
      Training.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  Training.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'Users', key: 'id' }
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      intensity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Duration in minutes'
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Training',
      tableName: 'Trainings',
      timestamps: true
    }
  );

  return Training;
};
