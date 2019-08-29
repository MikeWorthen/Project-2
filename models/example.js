// This may be confusing but here Sequelize (capital) references the standard library

module.exports = function(sequelize, DataTypes) {
  var project2 = sequelize.define("Bitmap", {
    username: DataTypes.STRING,
    bio: DataTypes.STRING,
    rating:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
          min: 0,
          max: 5
      }
  },
    profileImage: DataTypes.STRING,
  });
  return project2;
};

