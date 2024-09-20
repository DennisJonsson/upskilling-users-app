const User = require('../Model/User');

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
    const users = await User.findAll();
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

module.exports = {
    seedInitialUsers,
    getAllUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser
}