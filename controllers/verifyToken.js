import jwt from 'jsonwebtoken';
import { fsLogger } from '../logger/index.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    //check for token cookie
    if (!token) {
        fsLogger(req, res);
        return res.status(401).json({
            error: true,
            status: 401,
            errorMsg: 'Unauthorized',
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            fsLogger(req, res);
            return res.status(401).json({
                error: true,
                status: 401,
                errorMsg: 'Unauthorized',
            });
        }
        fsLogger(req, res);
        req.user = decoded;
        next();
    });
};
