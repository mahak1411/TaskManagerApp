const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    jwt.verify(token, "secret", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token is invalid or expired" });
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
