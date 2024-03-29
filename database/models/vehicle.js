
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
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      yearOfManufacture: {
        type: DataTypes.DATE,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      bodyType: {
        type: DataTypes.STRING,
        allowNull: true
      },
      driveTrain: {
        type: DataTypes.STRING,
        allowNull: true
      },
      inspectionCert: {
        type: DataTypes.STRING,
        allowNull: true
      },
      usage: {
        type: DataTypes.ENUM,
        values: ['Locally Used', 'Foreign Used'],
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
      enginePower: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fuelType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      steering: {
        type: DataTypes.STRING,
        allowNull: true
      },
      vinNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
      mileage: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isDutyPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isSold: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      condition: {
        type: DataTypes.ENUM,
        values: ['Used', 'Brand New'],
        allowNull: false
      },
      accessories: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      assessment: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
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
            Vehicle.belongsTo(models.user,{
                foreignKey: 'userId'
                
              });
               
        };
    return Vehicle;
  };