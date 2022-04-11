const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        // Model attributes are defined here
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
          // allowNull defaults to true
        },
        ten: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        isGV: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        }, 
        isAdminPM: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isAdminM: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      }, 
      {
        tableName: 'users',
        hooks: {
          beforeSave: async(User) => {
            const salt = await bcrypt.genSalt(10);
            User.password = await bcrypt.hash(User.password, salt);
          }
        }
      },
      {
        charset: 'utf8',
        collate: 'utf8_general_ci'
      },
    );

    User.prototype.validPassword = async function validPassword(password) {
      const vaid = await bcrypt.compare(password, this.password);
      return vaid;
    } 

    User.associate = function(models) {
      User.belongsToMany(models.Topic, {as: 'topic', through: 'User_Topic', foreignKey: 'userId', otherKey: 'topicId' });
    }

     return User;
}