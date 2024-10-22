const express = require('express');
const financeController = require('../controllers/financeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware); // Protection par JWT

router.post('/accounts', financeController.createAccount);
router.get('/accounts', financeController.getAccounts);
router.put('/accounts/:id', financeController.updateAccount);
router.delete('/accounts/:id', financeController.deleteAccount);
router.get('/accounts/:id', financeController.getAccountById);

router.post('/transactions', financeController.addTransaction);
router.get('/transactions', financeController.getAllTransactions);
router.get('/transactions/:id', financeController.getTransactionById);

router.get('/accounts/:account_id/transactions', financeController.getTransactions);

module.exports = router;
