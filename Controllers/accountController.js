const Account = require('../Model/Account.js');

const accounts = [
    { name: "LDAP"},
    { name: "Active Directory"}
];

const seedInitialAccounts = async (req,res) => {
    accounts.forEach(u => Account.create(u));
    res.json(accounts);
}

const getAllAccounts = async (req,res) => {
    const account = await Account.findAll();
    res.json(account);
}

const getSingleAccount = async (req,res) => {
    const account = await Account.findByPk(req.params.id);
    res.json(account);
}

const createNewAccount = async (req,res) => {
    const account = await Account.create(req.body);
    res.json(account);
}

const updateAccount = async (req,res) => {
    const { name} = req.body;

    const account = await Account.findByPk(req.params.id);
    await account.update({name});
    await account.save();
    res.json(account);
}

const deleteAccount = async (req,res) => {
    const account = await Account.findByPk(req.params.id);
    await account.destroy();
    res.json({data: `The account with id of ${req.params.id} is removed.`})
}

module.exports = {
    seedInitialAccounts,
    getAllAccounts,
    getSingleAccount,
    createNewAccount,
    updateAccount,
    deleteAccount
}