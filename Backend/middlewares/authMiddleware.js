const jwt = require("jsonwebtoken");

require("dotenv").config();
const secretKey = process.env.SECRET_KEY;


const verifyToken = (req,res,next) => {

    try {
        const token = req.header("Authorization");
        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).send({message: "Authentication failed" , error: error.message});
    }
}

module.exports = verifyToken;