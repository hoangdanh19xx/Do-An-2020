module.exports = (sequelize, DataTypes) => {
    const UserTopic = sequelize.define('User_Topic', {
        // Model attributes are defined here
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        topicId: {
            type: DataTypes.INTEGER,
            allowNull: false
            // allowNull defaults to true
        },
        important: {
          type: DataTypes.INTEGER,
          allowNull: true
          // allowNull defaults to true
        },
        lan1: {
          type: DataTypes.INTEGER,
          allowNull: true
          // allowNull defaults to true
        },
        lan2: {
          type: DataTypes.INTEGER,
          allowNull: true
          // allowNull defaults to true
        },
        lan3: {
          type: DataTypes.INTEGER,
          allowNull: true
          // allowNull defaults to true
        }

      }, {
        tableName: 'users_topics',
    });

     return UserTopic;
}