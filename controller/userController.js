// import user
const users = require('../model/usermodel')

const jwt = require('jsonwebtoken')


// register
exports.register = async (req,res)=>{
    console.log('Inside register function ');
    const {username , email , password }= req.body
    console.log(username , email , password);
   
    try {
        const existingUsers = await users.findOne({email})
        if(existingUsers){
            res.status(406).json("User already Exists")
        }else{
            const newUser = new users({
                username,
                email,
                password,
            })
            newUser.save()
            await res.status(200).json(newUser)
        }
        
    } catch (error) {
        res.status(401).json(error)
    }   
}


// login
exports.login = async (req, res)=>{
    const {email,password} = req.body
    console.log(email,password);
    
    try {
        const existingUsers = await users.findOne({email,password})
        if(existingUsers){
            const token = jwt.sign({userId : existingUsers._id},"secretekey")
            res.status(200).json({existingUsers,token})

        }else{
            res.status(406).json("Incorrect Password")
        }
        
    } catch (error) {
        res.status(401).json(error)
        
    }
}