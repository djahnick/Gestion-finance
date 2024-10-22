// routes/financeRoutes.js
const express = require('express');
const financeController = require('../controllers/financeController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Toutes les routes sont protégées par JWT
router.use(authMiddleware);

// Routes pour la gestion des comptes
router.post('/accounts', financeController.createAccount);
router.get('/accounts', financeController.getAccounts);
router.get('/accounts/:id', financeController.getAccountById);
router.put('/accounts/:id', financeController.updateAccount);
router.delete('/accounts/:id', financeController.deleteAccount);

// Routes pour la gestion des transactions
router.post('/transactions', financeController.addTransaction);
router.get('/transactions', financeController.getAllTransactions);
router.get('/transactions/:id', financeController.getTransactionById);
router.put('/transactions/:id', financeController.updateTransaction);
router.delete('/transactions/:id', financeController.deleteTransaction);

// Récupérer les transactions d'un compte spécifique
router.get('/accounts/:account_id/transactions', financeController.getTransactions);

module.exports = router;
