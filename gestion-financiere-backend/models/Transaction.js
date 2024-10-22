const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Account = require('./Account');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.ENUM('income', 'expense'),
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
});

// Relation entre Account et Transaction
Transaction.belongsTo(Account, { foreignKey: 'accountId', as: 'account' });
Account.hasMany(Transaction, { foreignKey: 'accountId', as: 'transactions' });

module.exports = Transaction;
