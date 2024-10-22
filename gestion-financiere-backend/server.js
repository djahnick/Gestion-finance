const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const financeRoutes = require('./routes/financeRoutes');
const bcrypt = require('bcryptjs'); // Pour hacher le mot de passe
const User = require('./models/User'); // Le modèle User

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/finance', financeRoutes);

// Fonction pour initialiser un utilisateur par défaut
const initializeDefaultUser = async () => {
    try {
        // Vérifiez si l'utilisateur par défaut existe déjà
        const defaultUser = await User.findOne({ where: { email: 'admin@example.com' } });

        if (!defaultUser) {
            // Hachez le mot de passe par défaut
            const hashedPassword = await bcrypt.hash('adminpassword', 10);

            // Créez l'utilisateur par défaut
            await User.create({
                email: 'admin@example.com',
                password: hashedPassword
            });

            console.log('Utilisateur par défaut créé : admin@example.com');
        } else {
            console.log('L\'utilisateur par défaut existe déjà.');
        }
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur par défaut', error);
    }
};

// Synchroniser la base de données et créer l'utilisateur par défaut
sequelize.sync().then(async () => {
    await initializeDefaultUser(); // Initialiser l'utilisateur par défaut

    app.listen(3000, () => {
        console.log('Le serveur tourne sur le port 3000');
    });
});
