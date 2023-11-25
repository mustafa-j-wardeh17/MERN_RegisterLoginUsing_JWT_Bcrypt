import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const test = async (req, res) => {
    const users = await User.find()
    res.json(users)
}

export const loginController = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ err: 'Please enter all fields' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const loginHashedPassword = await bcrypt.hash(password, salt);
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ err: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ err: 'Wrong Password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
}

export const registerController = async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
        return res.status(400).json({ err: 'Please enter all fields' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ err: 'Passwords do not match' });
    }

    try {
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ err: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: newUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
}