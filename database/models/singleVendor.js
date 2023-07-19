module.exports = (sequelize, DataTypes) => {
    const SingleVendor = sequelize.define('singleVendor',{
      passportNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: null
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: null
      }
    }, {});
      SingleVendor.associate = function(models) {
        // associations can be defined here
        SingleVendor.belongsTo(models.user, {
            foreignKey: 'userId'
          })
        SingleVendor.belongsTo(models.vehicle, {
          // foreignKey: 'userId'
        });
      };
    return SingleVendor;
};