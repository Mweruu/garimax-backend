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
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: null
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: null
      }
    }, {});
      CopVendor.associate = function(models) {
        // associations can be defined here
        CopVendor.belongsTo(models.user,{
            foreignKey: 'userId'
          });
        CopVendor.belongsTo(models.vehicle, {
          foreignKey: 'userId'
        });
      };
    return CopVendor;
};