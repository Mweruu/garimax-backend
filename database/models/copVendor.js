const User = require("./user");

module.exports = (sequelize, DataTypes) => {
    const CopVendor = sequelize.define('copVendor',{
      companyName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      kraPin: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dealerLicense: {
        type: DataTypes.STRING,
        allowNull: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
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
      CopVendor.associate = function(models) {
        // associations can be defined here
        CopVendor.belongsTo(models.User, {
            foreignKey: 'userId'
          })
      };
    return CopVendor;
};