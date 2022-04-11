module.exports = (sequelize, DataTypes) => {
    const TB = sequelize.define('TB', {
        // Model attributes are defined here
        tieuDe: {
          type: DataTypes.STRING,
          allowNull: true
        },
        noiDung: {
          type: DataTypes.STRING,
          allowNull: true
        },
      },
      {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
      },
      {
        tableName: 'tbs',
    });

    return TB;
}