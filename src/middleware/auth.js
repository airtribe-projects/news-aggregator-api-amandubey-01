const jwt = require('jsonwebtoken');
const {findUserById} = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    
    // 1. Get token from header.
    if(req.headers.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            status: "fail",
            message: "Your"
        })
    }

    try{
        // 2. Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Check if user still exists
        const currentUser = findUserById(decoded.id);
        if(!currentUser){
            return res.status(401).json({
                status: "fail",
                message: "The user belonging to this token no longer exists"
            });
        }

        // 4. Grant access - attach user to request
        req.user = currentUser;
        next();
    }
    catch(err){
        return res.status(401).json({
            status: "fail",
            message: 'Invalid token'
        });
    }
};

module.exports = {protect};