// controllers/financeController.js
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

// Créer un compte
exports.createAccount = async (req, res) => {
    const { name, initial_balance, currency, description } = req.body;

    try {
        const account = await Account.create({
            name,
            initial_balance,
            balance: initial_balance, // Le solde commence avec le solde initial
            currency,
            description,
            user_id: req.userId // ID de l'utilisateur connecté
        });
        res.status(201).json(account);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Récupérer tous les comptes d'un utilisateur
exports.getAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll({ where: { user_id: req.userId } });
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Récupérer un compte par ID
exports.getAccountById = async (req, res) => {
    try {
        const account = await Account.findOne({
            where: { id: req.params.id, user_id: req.userId }
        });
        if (!account) {
            return res.status(404).json({ message: 'Compte non trouvé' });
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Mettre à jour un compte
exports.updateAccount = async (req, res) => {
    try {
        const { name, description } = req.body;
        const account = await Account.findOne({
            where: { id: req.params.id, user_id: req.userId }
        });
        if (!account) {
            return res.status(404).json({ message: 'Compte non trouvé' });
        }

        account.name = name || account.name;
        account.description = description || account.description;
        await account.save();

        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Supprimer un compte
exports.deleteAccount = async (req, res) => {
    try {
        const account = await Account.findOne({
            where: { id: req.params.id, user_id: req.userId }
        });
        if (!account) {
            return res.status(404).json({ message: 'Compte non trouvé' });
        }
        await account.destroy();
        res.status(200).json({ message: 'Compte supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Ajouter une transaction
exports.addTransaction = async (req, res) => {
    const { account_id, type, amount, description, date } = req.body;

    try {
        const account = await Account.findOne({ where: { id: account_id, user_id: req.userId } });
        if (!account) {
            return res.status(404).json({ message: 'Compte non trouvé' });
        }

        const transaction = await Transaction.create({
            account_id,
            type,
            amount,
            description,
            date,
        });

        // Mettre à jour le solde du compte
        account.balance = type === 'income' ? account.balance + amount : account.balance - amount;
        await account.save();

        res.status(201).json({
            transaction,
            balance_after_transaction: account.balance
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Récupérer toutes les transactions d'un utilisateur
exports.getAllTransactions = async (req, res) => {
    try {
        const accounts = await Account.findAll({ where: { user_id: req.userId } });
        const accountIds = accounts.map(account => account.id);

        const transactions = await Transaction.findAll({
            where: { account_id: accountIds }
        });

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Récupérer une transaction par ID
exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ where: { id: req.params.id } });
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction non trouvée' });
        }

        // Vérifier si l'utilisateur a accès à cette transaction
        const account = await Account.findOne({ where: { id: transaction.account_id, user_id: req.userId } });
        if (!account) {
            return res.status(403).json({ message: 'Accès interdit' });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Récupérer les transactions d'un compte spécifique
exports.getTransactions = async (req, res) => {
    try {
        const account = await Account.findOne({
            where: { id: req.params.account_id, user_id: req.userId }
        });
        if (!account) {
            return res.status(404).json({ message: 'Compte non trouvé' });
        }

        const transactions = await Transaction.findAll({
            where: { account_id: req.params.account_id }
        });

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Mettre à jour une transaction
exports.updateTransaction = async (req, res) => {
    const { amount, description, type } = req.body;

    try {
        const transaction = await Transaction.findOne({ where: { id: req.params.id } });
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction non trouvée' });
        }

        const account = await Account.findOne({ where: { id: transaction.account_id, user_id: req.userId } });
        if (!account) {
            return res.status(403).json({ message: 'Accès interdit' });
        }

        // Réajuster le solde en supprimant l'ancien montant
        account.balance = transaction.type === 'income'
            ? account.balance - transaction.amount
            : account.balance + transaction.amount;

        // Mettre à jour la transaction
        transaction.amount = amount !== undefined ? amount : transaction.amount;
        transaction.description = description !== undefined ? description : transaction.description;
        transaction.type = type || transaction.type;

        // Réajuster le solde avec le nouveau montant
        account.balance = transaction.type === 'income'
            ? account.balance + transaction.amount
            : account.balance - transaction.amount;

        await transaction.save();
        await account.save();

        res.status(200).json({
            transaction,
            balance_after_transaction: account.balance
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Supprimer une transaction
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ where: { id: req.params.id } });
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction non trouvée' });
        }

        const account = await Account.findOne({ where: { id: transaction.account_id, user_id: req.userId } });
        if (!account) {
            return res.status(403).json({ message: 'Accès interdit' });
        }

        // Réajuster le solde avant de supprimer la transaction
        account.balance = transaction.type === 'income'
            ? account.balance - transaction.amount
            : account.balance + transaction.amount;

        await transaction.destroy();
        await account.save();

        res.status(200).json({
            message: 'Transaction supprimée',
            balance_after_transaction: account.balance
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
