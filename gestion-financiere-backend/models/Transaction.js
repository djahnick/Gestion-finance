// models/Transaction.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Account = require('./Account');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false
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
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: true
});

// Association avec le compte
Transaction.belongsTo(Account, { foreignKey: 'account_id' });
Account.hasMany(Transaction, { foreignKey: 'account_id' });

module.exports = Transaction;
