const {User,Account} = require('../Model/associations');

const users = [
    { name: "Dutch",  isAdmin: true , isBadass: true},
    { name: "Blaine", isAdmin: false,  isBadass: true},
    { name: "Billy", isAdmin: false,   isBadass: true},
    { name: "Mac", isAdmin: false ,  isBadass: true},
    { name: "Dillon", isAdmin: false, isBadass: true}
];

const seedInitialUsers = async (req,res) => {
    users.forEach(u => User.create(u));
    res.json(users);
}

const getAllUsers = async (req,res) => {
    const users = await User.findAll({include: Account});
    res.json(users);
}

const getSingleUser = async (req,res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
}

const createNewUser = async (req,res) => {
    const user = await User.create(req.body);
    res.json(user);
}

const updateUser = async (req,res) => {
    const { name, isAdmin, isBadass} = req.body;

    const user = await User.findByPk(req.params.id);
    await user.update({name, isAdmin, isBadass});
    await user.save();
    res.json(user);
}

const deleteUser = async (req,res) => {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.json({data: `The user with id of ${req.params.id} is removed.`})
}

const assignAccount = async (req,res) => {
    const { accountId } = req.body;

    try {
        const user = await User.findByPk(req.params.id);
        const account = await Account.findByPk(accountId);

        if (!user || !account) {
            return res.status(404).json({ message : "User or Account not found", user: user, account: account});
        }

        await user.addAccount(account);

        res.status(200).json({ message: "Account assigned successfully"});
    } catch (error) {
        console.error("Error assigning account: ", error);
        res.status(500).json({ message: "Internal server error"});
    }
    
}

const unAssignAccount = async (req,res) => {
    const { accountId } = req.body;
    
    try {
        const user = await User.findByPk(req.params.id);
        const account = await Account.findByPk(accountId);

        if (!user || !account) {
            return res.status(404).json({ message : "User or Account not found", user: user, account: account});
        }

        await user.removeAccount(account);

        res.status(200).json({ message: "Account removed successfully"});
    } catch (error) {
        console.error("Error removing account: ", error);
        res.status(500).json({ message: "Internal server error"});
    }
}

module.exports = {
    seedInitialUsers,
    getAllUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser,
    assignAccount,
    unAssignAccount
}