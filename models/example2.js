module.exports = function(sequelize, DataTypes) {
    var Project2 = sequelize.define("Bitmaps2", {
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
      galleryImage1: DataTypes.STRING,
      galleryImage2: DataTypes.STRING,
      galleryImage3: DataTypes.STRING,
      
    });
  
    
    return Project2;
  };