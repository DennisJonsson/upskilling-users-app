const {Model, DataTypes} = require('sequelize');
const sequelize = require('../Config/database');

class Account extends Model {}
Account.init({
    name: DataTypes.STRING,

}, {sequelize,modelName: 'account'});

module.exports = Account;
