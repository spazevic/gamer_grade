'use strict';
let bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Nani?????? What is your name?'
        }
      }
    },
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Please put email or i dont work'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 32],
          msg: 'pw or bust'
        }
      }
    },
    bio: DataTypes.TEXT,
    username: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Need username bruh'
        }
      }
    },
    birthday: DataTypes.DATE,
    admin: DataTypes.BOOLEAN,
    pic: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate:  pendingUser => {
        //hash the password
        let hashedPassword = bcrypt.hashSync(pendingUser.password, 12)
        //reassign the hashed password (overwrite the plain text password)
        pendingUser.password = hashedPassword
      }
    }
  });

  user.associate = function(models) {
    // associations can be defined here
    models.user.hasMany(models.rating)
  };

user.prototype.validPassword = function(typedInPassword) {
  //determine if password typed in hashes to same thing as existing hash
  let correctPassword = bcrypt.compareSync(typedInPassword, this.password)
  //returns boolean in password matches existing password
  return correctPassword

}

  return user;
};