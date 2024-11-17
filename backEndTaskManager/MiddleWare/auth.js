
const jwt= require("jsonwebtoken")

module.exports= function (req,res,next){
 
    const token =  req.header("x-auth-token")
    if(!token) return res.send("token not provided")

        try{
            console.log("before token provided")
            const decoded =  jwt.verify(token,"mysecureKey")
            req.user=decoded
            next()
        }
        catch(ex){
          res.status(401).send("invalid token")

        }



}

