// models/Account.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Account = sequelize.define('Account', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    initial_balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'EUR'
    },
    description: {
        type: DataTypes.TEXT
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
});

// Association avec l'utilisateur
Account.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Account, { foreignKey: 'user_id' });

module.exports = Account;
