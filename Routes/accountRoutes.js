const express = require('express');
const {seedInitialAccounts,getAllAccounts,getSingleAccount,createNewAccount,updateAccount,deleteAccount} = require('../Controllers/accountController');

const router = express.Router();

router.get('/accounts/seeds', seedInitialAccounts); 
router.get('/accounts',getAllAccounts);
router.get('/accounts/:id',getSingleAccount);

router.post('/accounts', createNewAccount);

router.put('/accounts/:id',updateAccount);

router.delete('/accounts/:id', deleteAccount);

module.exports = router;
