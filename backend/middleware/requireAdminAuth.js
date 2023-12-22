const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const requireAdminAuth = async(req, res, next) => {

    // Verify authentication
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({error: 'Authorization required'})
    }
    // Splits Bearer and token
    const token = authorization.split(' ')[1]

    try {
       const { _id } = jwt.verify(token, process.env.JWT_SECRET)

       const currentUser = await User.findOne({_id})

       if(!currentUser || currentUser.status !== 'Admin') {
        throw new Error()
       }

        req.user = currentUser._id
        next()

    } catch(error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAdminAuth