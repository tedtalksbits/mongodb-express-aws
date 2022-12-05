// auth controller

import User from '../model/User.js';
import { usernameChecker } from '../util/usernameChecker.js';
import { pwCheck } from '../util/pwChecker.js';
import CryptoJS from 'crypto-js';
import { fsLogger } from '../logger/index.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    //  get info about client
    const deviceInfo = req.headers['user-agent'];
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const port = req.connection.remotePort;
    const host = req.headers.host;
    const method = req.method;
    const url = req.url;
    const date = new Date();
    const time = date.toLocaleTimeString();

    const clientReqInfo = `${date} ${time} ${deviceInfo} ${ip} ${port} ${host} ${method} ${url}`;

    const { username, email, password } = req.body;

    const emailExist = await User.findOne({ email }).exec();
    if (emailExist) {
        fsLogger(clientReqInfo + ' 400 - Email already exists');
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: 'Email is taken',
        });
    }

    const usernameExist = await User.findOne({
        username: username.toLowerCase(),
    }).exec();

    if (usernameExist) {
        fsLogger(clientReqInfo + ' 400 - Username already exists');
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: 'Username is taken',
        });
    }
    // validation
    const { error: usernameErr, message: usernameErrMsg } =
        usernameChecker(username);
    if (usernameErr) {
        fsLogger(clientReqInfo + ' 400 - ' + usernameErrMsg);
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: usernameErrMsg,
        });
    }
    const { error: pwErr, message: pwErrMsg } = pwCheck(password);
    if (pwErr) {
        fsLogger(clientReqInfo + ' 400 - ' + pwErrMsg);
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: pwErrMsg,
        });
    }

    // register
    const reqUser = {
        ...req.body,
        username: username.toLowerCase(),
        password: CryptoJS.AES.encrypt(
            password,
            process.env.SECRET_KEY
        ).toString(),
        ssn: CryptoJS.AES.encrypt(
            req.body.ssn,
            process.env.SECRET_KEY
        ).toString(),
    };

    const newUser = new User(reqUser);

    try {
        await newUser.save();
    } catch (error) {
        fsLogger(clientReqInfo + ' 500 - ' + error);
        return res.status(500).json({
            error: true,
            status: 500,
            errorMsg: error.message,
        });
    }
    fsLogger(clientReqInfo + ' 201 - User registered successfully');
    // destructure password and ssn from newUser
    // eslint-disable-next-line no-unused-vars
    const { password: pw, ssn, ...user } = newUser._doc;
    // const { password: _pw, _ssn, ...user } = newUser._doc;
    console.log(user);
    return res.status(201).json({
        ok: true,
        status: 201,
        data: user,
    });
};

// login

export const login = async (req, res) => {
    //  get info about client
    const deviceInfo = req.headers['user-agent'];
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const port = req.connection.remotePort;
    const host = req.headers.host;
    const method = req.method;
    const url = req.url;
    const date = new Date();
    const time = date.toLocaleTimeString();

    const clientReqInfo = `${date} ${time} ${deviceInfo} ${ip} ${port} ${host} ${method} ${url}`;

    const { username, password } = req.body;

    const user = await User.findOne({
        username: username.toLowerCase(),
    }).exec();

    if (!user) {
        fsLogger(clientReqInfo + ' 400 - User not found');
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: 'User not found',
        });
    }

    const decryptedPw = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPw !== password) {
        fsLogger(clientReqInfo + ' 401 - Incorrect password');
        return res.status(401).json({
            error: true,
            status: 401,
            errorMsg: 'Incorrect credentials',
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.SECRET_KEY,
        { expiresIn: '1hr' }
    );

    //const { password: pw, ssn, ...userWithoutPw } = user._doc;
    fsLogger(clientReqInfo + ' 200 - User logged in successfully');
    // return res.status(200).json({
    //     ok: true,
    //     status: 200,
    //     data: userWithoutPw,
    // });
    // return res
    //     .writeHead(200, {
    //         'Set-Cookie': `token=${token}; HttpOnly;`,
    //         'Access-Control-Allow-Credentials': true,
    //     })
    //     .send();

    return res
        .cookie('token', token, {
            httpOnly: true,
        })
        .send();
};
