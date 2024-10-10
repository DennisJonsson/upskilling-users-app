const {Model, DataTypes} = require('sequelize');
const sequelize = require('../Config/database');
const {User} = require('../Model/User');

class Account extends Model {
    static associate() {
        this.belongsTo(User, {foreignKey: 'userId'});
    }
}
Account.init({
    name: DataTypes.STRING,

}, {sequelize,modelName: 'account'});

module.exports = Account;
