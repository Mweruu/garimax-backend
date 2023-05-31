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
      isVendor: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: false
      }
    }, {});
      SingleVendor.associate = function(models) {
        // associations can be defined here
        SingleVendor.belongsTo(models.User, {
            foreignKey: 'userId'
          })
      };
    return SingleVendor;
};