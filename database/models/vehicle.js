
module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define('vehicle',{
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false
      },
      make: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      yearOfManufactor: {
        type: DataTypes.DATE,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      vehicleType: {
        type: DataTypes.STRING,
        allowNull: true
      },
      condition: {
        type: DataTypes.STRING,
        allowNull: false
      },
      transmission: {
        type: DataTypes.ENUM,
        values: ['Automatic', 'Manual'],
        allowNull: false
      },
      engineSize: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mileage: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      foreignUsed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      localUsed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      additionalFeatures: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
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
        Vehicle.associate = function(models) {
            // associations can be defined here
            Vehicle.belongsTo(models.user, {
                foreignKey: 'userId'
              })
        };
    return Vehicle;
  };