const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model.js');

const REGISTRATION_KEY = process.env.YOUR_SECRET_REGISTRATION_KEY || 'Chintu-Chapak-The-Chin-Tapak-Dum-Dum-King'

router.post('/register', async (req, res) => {
    try {
        const { username, password, registrationKey } = req.body;
        
        if(REGISTRATION_KEY !== REGISTRATION_KEY){
            return res.status(403). json({ message: 'Invalid Registration Key.' });
        }

        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res.status(400).json({ message: 'Username Already Exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User Registered Successfully!', user: { id: savedUser._id, username: savedUser.username }});

    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(400).json({ msg: 'Please enter all fields.' });
        }
        
        const user = await User.findOne({ username: username });
        if(!user){
            return res.status(400).json({ msg: 'No account with this username has been registered' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ msg: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
            },
        });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;