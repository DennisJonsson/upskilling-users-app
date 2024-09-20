const express = require('express');
const {seedInitialUsers,getAllUsers,getSingleUser,createNewUser,updateUser,deleteUser} = require('../Controllers/userController');

const router = express.Router();

router.get('/seeds', seedInitialUsers); 
router.get('/users',getAllUsers);
router.get('/users/:id',getSingleUser);

router.post('/users', createNewUser);

router.put('/users/:id',updateUser);

router.delete('/users/:id', deleteUser);

module.exports = router;
