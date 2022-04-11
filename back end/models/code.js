module.exports = (sequelize, DataTypes) => {
    const Code = sequelize.define('Code', {
        // Model attributes are defined here
        email: {
          type: DataTypes.STRING,
          allowNull: true
        },
        code: {
          type: DataTypes.STRING,
          allowNull: true
        },
      },
      {
        tableName: 'codes',
    });

    return Code;
}