const userSchema = require('./UserSchema');
const jwt = require('jsonwebtoken');
const secretKey = "ManoharKumarSinghManoharKumarSinghManoharKumarSinghManoharKumarSingh";

const verifyToken = (req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        res.status(401).json({mesaage:"Token is absent"})
        return;
    }
    try{
        const isVerified = jwt.verify(token,secretKey);
        if(!isVerified)
        {
            res.status(401).json({mesaage:"Authentication Failed"})
            return;
        }
        req.userEmail = isVerified.email;
        next();
    }catch(err)
    {
        console.log(err);
        res.status(401).json({mesaage:"Authentication Failed"})
        return;
    }
}

module.exports = verifyToken;