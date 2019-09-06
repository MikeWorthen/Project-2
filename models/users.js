// Used to hide users password in our database
var bcrypt = require("bcryptjs");

// Create user
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", { // username must exist, can not be empty.
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // Password can not be empty
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // User bio
        bio: DataTypes.STRING,
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 5
            }
        },
        // Profile images
        profileImage: DataTypes.STRING,
        galleryImage1: DataTypes.STRING,
        galleryImage2: DataTypes.STRING,
        galleryImage3: DataTypes.STRING
    });

    // Check if encrypted passwords are the same
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    // Encrypt a users password before it is created.
    User.addHook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    return User;
};
