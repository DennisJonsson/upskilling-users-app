const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Config/database');

class User extends Model {}

User.init({
    name: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isBadass: DataTypes.BOOLEAN,

}, {sequelize,modelName: 'user'});

module.exports = User;