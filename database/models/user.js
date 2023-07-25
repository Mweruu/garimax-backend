
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
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    companyUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isVendor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordHash:{
      type: DataTypes.STRING,
      allowNull: false,
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    User.associate = function(models) {
      // associations can be defined here
      User.hasOne(models.singleVendor, {
        foreignKey: 'userId' });
      User.hasOne(models.copVendor, {
        foreignKey: 'userId' });
      User.hasMany(models.vehicle, {
        foreignKey: 'userId' });
    };
  return User;
};