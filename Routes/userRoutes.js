const express = require('express');
const {seedInitialUsers,getAllUsers,getSingleUser,createNewUser,updateUser,deleteUser,assignAccount,unAssignAccount} = require('../Controllers/userController');

const router = express.Router();

router.get('/users/seeds', seedInitialUsers); 
router.get('/users',getAllUsers);
router.get('/users/:id',getSingleUser);

router.post('/users', createNewUser);
router.post('/users/:id/accounts', assignAccount);

router.put('/users/:id',updateUser);

router.delete('/users/:id', deleteUser);
router.delete('/users/:id/accounts', unAssignAccount);

module.exports = router;
