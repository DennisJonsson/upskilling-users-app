const User = require('./User');
const Account = require('./Account');
const UserAccounts = require('./UserAccounts');

User.belongsToMany(Account, {through: 'UserAccounts', foreignKey: 'userId'});
Account.belongsToMany(User, {through: 'UserAccounts', foreignKey: 'accountId'});


module.exports = {User, Account,UserAccounts};