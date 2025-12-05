const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {createUser, findUserByEmail} = require('../models/User');
const AppError = require('../utils/AppError'); // <------- needs to be created.

const signup = async (req, res) => {
    const {name, email, password, preferences} = req.body;

    // Basic Validation
    if (!name || !email || !password){
        return res.status(400).json({
            status: "fail",
            message: "Required fields: name, email, password"
        });
    }

    // Check if user already exists.
    if(findUserByEmail(email)) {
        return res.status(400).json({
            status: "fail",
            message: "Email already in use"
        });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = createUser({
        name,
        email,
        password: hashedPassword,
        preferences: preferences || []
    });

    // Generate JWT
    const token = jwt.sign(
        {id:user.id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );

    // user.password = undefined; // <------ we don't want to send passoword in token

    res.status(200).json({
        status: "success",
        token,
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                preferences: user.preferences
            }
        }
    });

};

const login = async (req,res) => {
    const {email, password} = req.body;

    // 1. Check if email and password were passed.
    if (!email || !password){
        return res.status(400).json({
            status: "fail",
            message: "Please provide email and password"
        });
    }

    // 2. Check if user exists.
    const user = findUserByEmail(email);
    if(!user){
        return res.status(401).json({
            status: "fail",
            message: "Invalid email or password"
        });
    }

    // 3. Check if password is correct.
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect){
        return res.status(401).json({
            status: "fail",
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign(
        {id:user.id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );

    res.status(200).json({
        status: "success",
        token
    });

}

module.exports = {signup, login};