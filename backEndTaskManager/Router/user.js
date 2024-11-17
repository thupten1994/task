const express = require("express")
const router = express.Router()
const {User, validateUser}= require("../Model/User")
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")
const _= require("lodash")


router.get("/", async(req,res)=>{

    const user = await User.find()
    res.send(user)

})
router.get("/:id", async(req,res)=>{
      
    const user =  await User.findById(req.params.id)

    res.send(user)

})


router.post("/register", async(req,res)=>{

    const{error}= validateUser(req.body)
    if(error) return res.status(404).send(error.message)
                    
    let  user = await User.findOne({email: req.body.email})
    if(user) res.send("users already registered")
    user=  await new User({
            name : req.body.name,
            password : req.body.password,
            email :req.body.email
    })
    
    const salt =  await bcrypt.genSalt(10)
    const hash =  await bcrypt.hash(req.body.password,salt)
    user.password=hash
    
       
    res.send(await user.save()) 
       
})

router.post("/login", async(req,res)=>{
  
        const user = await User.findOne({email : req.body.email})
        if(!user ) return res.status(400).send(" user not avaible")
         
        const valid = await bcrypt.compare(req.body.password,user.password)
        if(!valid) return  res.status(400).send(" not a valited password ")
        
        const token = user.generateToken()

        res.header("x-auth-token",token)
        res.send(_.pick(user,["name","email"]))

})

router.put("/:id", async(req,res)=>{

            const {error} = validateUser(req.body)
            if(error) return res.status(400).send(error.message)

            const user =  User.findByIdAndUpdate(req.body.params,{
                            id: req.body.id,
                            title:req.body.title,
                            description:req.body.description,
                            completed:req.body.completed,
                            priority:req.body.priority
                         })
            res.send( await user.save())



})
router.delete("/:id", async(req,res)=>{

    const user = await User.findByIdAndDelete(req.params.id)
    if(!user) return res.status(400).send("no User")
    res.send(user)
})











module.exports = router