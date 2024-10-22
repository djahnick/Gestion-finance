// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Accès interdit : Aucun token fourni' });

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // On stocke l'ID de l'utilisateur pour les prochaines opérations
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token invalide' });
    }
};
