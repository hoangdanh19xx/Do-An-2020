module.exports = (sequelize, DataTypes) => {
    const Ratio = sequelize.define('Ratio', {
        // Model attributes are defined here
        chuyenNganh: {
          type: DataTypes.STRING,
          allowNull: true
        },
        gvhd1: {
            type: DataTypes.INTEGER,
            allowNull: true
            // allowNull defaults to true
        },
        gvhd2: {
            type: DataTypes.INTEGER,
            allowNull: true
            // allowNull defaults to true
        },
        gvhd3: {
            type: DataTypes.INTEGER,
            allowNull: true
            // allowNull defaults to true
        },
        gvhdtong: {
            type: DataTypes.INTEGER,
            allowNull: true
            // allowNull defaults to true
        },
        gvpb1: {
            type: DataTypes.INTEGER,
            allowNull: true
            // allowNull defaults to true
        },
        gvpb2: {
            type: DataTypes.INTEGER,
            allowNull: true
            // allowNull defaults to true
        },
        gvpb3: {
            type: DataTypes.INTEGER,
            allowNull: true
            // allowNull defaults to true
        },
        gvpbtong: {
            type: DataTypes.INTEGER,
            allowNull: true
            // allowNull defaults to true
        }
      },
      {
        tableName: 'ratios',
    });

    return Ratio;
}