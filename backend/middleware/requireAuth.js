const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const requireAuth = async(req, res, next) => {

    // Verify authentication
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({error: 'Authorization required'})
    }
    // Splits Bearer and token
    const token = authorization.split(' ')[1]

    try {
       const { _id } = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findOne({_id}).select('_id')
        next()

    } catch(error) {

        res.status(401).json({error: error.message})
    }
}

module.exports = requireAuth