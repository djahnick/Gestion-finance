const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

// Création d'un compte financier
exports.createAccount = async (req, res) => {
    try {
        const { name, initial_balance, currency, description } = req.body;
        const account = await Account.create({
            name,
            balance: initial_balance,
            currency,
            description,
            userId: req.userId // Utilisateur connecté
        });
        res.status(201).json(account);
    } catch (error) {
        res.status(500).json({ error: 'Error creating account' });
    }
};

// Récupérer tous les comptes financiers
exports.getAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll({ where: { userId: req.userId } });
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching accounts' });
    }
};

// Modifier un compte financier
exports.updateAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const account = await Account.findOne({ where: { id, userId: req.userId } });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        account.name = name || account.name;
        account.description = description || account.description;
        await account.save();
        res.json(account);
    } catch (error) {
        res.status(500).json({ error: 'Error updating account' });
    }
};

// Supprimer un compte financier
exports.deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await Account.findOne({ where: { id, userId: req.userId } });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        await account.destroy();
        res.json({ message: 'Account deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting account' });
    }
};

// Ajouter une transaction (dépense ou revenu)
exports.addTransaction = async (req, res) => {
    try {
        const { account_id, type, amount, date, description } = req.body;
        const account = await Account.findOne({ where: { id: account_id, userId: req.userId } });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        const transaction = await Transaction.create({
            accountId: account_id,
            type,
            amount,
            date,
            description
        });
        // Mettre à jour le solde du compte
        if (type === 'expense') {
            account.balance -= amount;
        } else if (type === 'income') {
            account.balance += amount;
        }
        await account.save();
        res.status(201).json({ transaction, new_balance: account.balance });
    } catch (error) {
        res.status(500).json({ error: 'Error adding transaction' });
    }
};

// Récupérer toutes les transactions d'un compte
exports.getTransactions = async (req, res) => {
    try {
        const { account_id } = req.params;
        const transactions = await Transaction.findAll({ where: { accountId: account_id } });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions' });
    }
};

// Récupérer un compte par son ID
exports.getAccountById = async (req, res) => {
    try {
        const account = await Account.findByPk(req.params.id);
        if (!account) {
            return res.status(404).json({ message: 'Compte non trouvé' });
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// Récupérer toutes les transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// Récupérer une transaction par son ID
exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction non trouvée' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
