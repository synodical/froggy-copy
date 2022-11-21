module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "image",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      targetType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      targetId: {
        type: DataTypes.BIGINT,
      },
      squareUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      mediumUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      shelvedUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
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
      tableName: "image",
    }
  );
