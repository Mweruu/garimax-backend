
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user',{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mobile: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    User.associate = function(models) {
      // associations can be defined here
      User.hasOne(models.SingleVendor, {
        foreignKey: 'userId',
        as: 'singleVendor',
        onDelete: 'CASCADE',
      });
      User.hasOne(models.CopVendor, {
        foreignKey: 'userId',
        as: 'copVendor',
        onDelete: 'CASCADE',
      });
      User.hasMany(models.Vehicle, {
        foreignKey: 'userId',
        as: 'vehicles',
        onDelete: 'CASCADE',
      });
    };
  return User;
};