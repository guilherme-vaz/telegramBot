const jwt = require('jsonwebtoken');
const secretKey = "secret";

function authenticateToken(req, res, next) {
    const token = req.headers.authorization;;

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' })
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.admin = decoded.admin;
        next();
    });

}

module.exports = authenticateToken;
