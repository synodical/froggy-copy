module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "patternAttribute",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      attribute: {
        type: DataTypes.STRING(300),
        allowNULL: false,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      freezeTableName: true,
      paranoid: true.valueOf,
      tableName: "patternAttribute",
    }
  );
