
const express = require("express")
const router = express.Router()
const {Task, validateTask }= require("../Model/task")
const auth = require("../MiddleWare/auth")
const { User } = require("../Model/User")


router.get("/", async(req,res)=>{
      
    const task = await Task.find()
    res.send(task)

})
router.get("/:id", async(req,res)=>{
      
    const task =  await Task.findById(req.params.id)
    if(!task) return res.send("not a valid task ")
    res.send(task)

})


router.post("/",[auth], async(req,res)=>{

    const{error}= validateTask(req.body)
    if(error) return res.status(404).send(error.message)
     
    const task =  await new Task({
        owner : req.user._id,
        title:req.body.title,
        description:req.body.description,
        completed:req.body.completed,
        priority:req.body.priority
    })
       
    res.send(await task.save()) 
       
})

router.put("/:id", async(req,res)=>{

            const {error} = validateTask(req.body)
            if(error) return res.status(400).send(error.message)

            const task =  Task.findByIdAndUpdate(req.body.params,{
                            id: req.body.id,
                            title:req.body.title,
                            description:req.body.description,
                            completed:req.body.completed,
                            priority:req.body.priority
                         })
            res.send( await task.save())



})
router.delete("/:id", async(req,res)=>{

    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(400).send("no task")
    res.send(task)
})











module.exports = router