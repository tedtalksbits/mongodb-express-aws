import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // check for token cookie
    // if (!req.cookies.token) {
    //     return res.status(401).json({
    //         error: true,
    //         status: 401,
    //         errorMsg: 'Unauthorized',
    //     });
    // }

    // // verify token
    // const token = req.cookies.token;
    // const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // // check if token is valid
    // if (!decodedToken) {
    //     return res.status(401).json({
    //         error: true,
    //         status: 401,
    //         errorMsg: 'Unauthorized',
    //     });
    // }

    // console.log(decodedToken);

    console.log(req.cookies);

    next();
};
