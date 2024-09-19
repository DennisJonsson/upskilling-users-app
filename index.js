const express = require("express");
const cors = require("cors");
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

class User extends Model {}
User.init({
    name: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isBadass: DataTypes.BOOLEAN,

}, {sequelize,modelName: 'user'});

sequelize.sync();

const users = [
    { name: "Dutch",  isAdmin: true , isBadass: true},
    { name: "Blaine", isAdmin: false,  isBadass: true},
    { name: "Billy", isAdmin: false,   isBadass: true},
    { name: "Mac", isAdmin: false ,  isBadass: true},
    { name: "Dillon", isAdmin: false, isBadass: true}
];

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("react-frontend/dist"));

app.get("/", (req, res) => {
    res.json({ data: 'Hello Ikea!'});
});

app.get('/api/seeds', async (req, res) => {
    users.forEach(u => User.create(u));
    res.json(users);
});

app.get('/api/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.get('/api/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
});

app.post('/api/users', async(req,res) => {
    const user = await User.create(req.body);
    res.json(user);
});

app.put('/api/users/:id', async(req,res) => {
    const { name, isAdmin, isBadass} = req.body;

    const user = await User.findByPk(req.params.id);
    await user.update({name, isAdmin, isBadass});
    await user.save();
    res.json(user);
});

app.delete('/api/users/:id', async(req,res) => {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.json({data: `The user with id of ${req.params.id} is removed.`})
});

const port = process.env.PORT || 8080;
app.listen(port, async () => {
    console.log(`Server started at ${port}`);
});
