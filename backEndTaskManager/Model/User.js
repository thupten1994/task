

const mongoose = require("mongoose")
const Joi = require("joi")
JoiObjectid = require("joi-objectid")(Joi)
const jwt= require("jsonwebtoken")




const userSchema = mongoose.Schema({

        name : {
            type : String,
            required : true
        },
        password : {
            type : String ,
            minlength : 5,
            maxlength: 250
        },
        email :{
            type : String,
            unique : true,
            lowercase: true
        }

})



userSchema.methods.generateToken=function(){
  
    return jwt.sign({_id: this._id}, "mysecureKey")
}
const User = mongoose.model("User", userSchema)


function validateUser(v){

 const schema = Joi.object({

    name :Joi.string().required(),
    password : Joi.string().required(),
    email :Joi.string().required()

 }
 )

 return schema.validate(v)
}



module.exports = { User, validateUser };



