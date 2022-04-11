const moment= require('moment') ;
module.exports = (sequelize, DataTypes) => {
    const Topic = sequelize.define('Topic', {
        // Model attributes are defined here
        tenDoAn: {
          type: DataTypes.STRING,
          allowNull: false
        },
        nenTang: {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
          },
        loai: {
          type: DataTypes.STRING,
          allowNull: false
          // allowNull defaults to true
        },
        chuyenNganh: {
          type: DataTypes.STRING,
          allowNull: false
          // allowNull defaults to true
        },
        moTa: {
          type: DataTypes.STRING,
          allowNull: false
          // allowNull defaults to true
        },
        ngDK: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        ngayNop: {
            type: DataTypes.DATE,
            allowNull: true,
            get: function() {
              return moment(this.getDataValue('ngayNop')).format('DD/MM/YYYY')
           }
        },
        phong: {
          type: DataTypes.STRING,
          allowNull: true
        },
        ngTao: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        link: {
          type: DataTypes.STRING,
          allowNull: true
        },
      },
      {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
      },
       {
        tableName: 'topics',
    });
    Topic.associate = function(models) {
      Topic.belongsToMany(models.User, {as: 'user', through: 'User_Topic', foreignKey: 'topicId', otherKey: 'userId' });
    }
    

     return Topic;
}