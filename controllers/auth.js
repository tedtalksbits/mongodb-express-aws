// auth controller

import User from '../model/User.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    // validation
    if (!username) return res.status(400).send('Username is required');
    if (!password || password.length < 6)
        return res
            .status(400)
            .send('Password is required and should be min 6 characters long');
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).json({ error: 'Email is taken' });
    let usernameExist = await User.findOne({
        username: username.toLowerCase(),
    }).exec();
    if (usernameExist)
        return res.status(400).json({ error: 'Username is taken' });

    // register
    const newUser = new User(req.body);
    try {
        await newUser.save();
    } catch (error) {
        return res.status(400).json(error.message);
    }
    console.log('newUser => ', newUser);
    return res.status(201).json({ ok: true, user: newUser });
};
