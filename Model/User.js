const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Config/database');
const {Account} = require('../Model/Account');

class User extends Model {
    static associate() {
        this.hasMany(Account, { foreignKey : 'userId'});
    }
}
User.init({
    name: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isBadass: DataTypes.BOOLEAN,

}, {sequelize,modelName: 'user'});

module.exports = User;