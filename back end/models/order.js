module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        // Model attributes are defined here
        idMoi: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        idNhan: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
        idTopic: {
            type: DataTypes.INTEGER,
            allowNull: false
            // allowNull defaults to true
          },
        idNhan1: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        ck: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        ip: {
          type: DataTypes.INTEGER,
          allowNull: true
        },

      }, {
        tableName: 'orders',
    });

    Order.associate = function(models) {
      Order.belongsTo(models.Topic, {foreignKey: 'idTopic', otherKey: 'id'});
      Order.belongsTo(models.User, {foreignKey: 'idMoi', otherKey: 'id'});
    }
     return Order;
}