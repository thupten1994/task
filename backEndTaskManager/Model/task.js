

const mongoose = require("mongoose")
const Joi = require("joi")
JoiObjectid = require("joi-objectid")(Joi)
const User = require("./User")



const Enum = ["high","medium","low"]
const taskSchema = mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true 

    },
    title: {
        type : String,
        required : true 
    },
    description:{
        type : String,
        required : true 
    },
    completed:{
        type : Boolean,
        required : true
    },
    dueDate: Date,
    priority: {
        type : String, 
        enum : Enum,
        default : "low"
    },
    createdAt: {
        type :Date,
        default : Date.now
    },
    updatedAt: Date
})

const Task = mongoose.model("Task",taskSchema)

function validateTask(v){

    const schema = Joi.object({
        title: Joi.string().required(),
        description:Joi.string().required(),
        completed: Joi.boolean().required(),
        priority:Joi.string().valid(...Enum).required(),

    })
    return  schema.validate(v)
}

module.exports = { Task, validateTask };