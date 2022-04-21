const joi = require('joi')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.saveUser = async (req, res) => {
    //validating incoming request body
    const userSchema = joi.object({
        name: joi.string().min(5).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(5).required(),
        confirmPassword: joi.ref('password')
    })
    const { error } = userSchema.validate(req.body)
    if (error) {
        res.status(400).json({
            message: error.message,
            status: false
        })
    } else {
        try {
            const { name, email, password } = req.body

            // check if user already exist
            const checkUser =await User.findAll({ where: { email: email } })
            console.log(checkUser);
            if (checkUser.length > 0) {
                res.json({
                    message: 'This email is already registered',
                    status: false,
                })
            } else {
                //creating instance of User 
                const user = new User({
                    name: name,
                    email: email,
                    password: password
                })
                //save user
                const result = await user.save()
                res.status(201).json({
                    message: "Registered successfully!!!",
                    status: true
                })
            }

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                status: false
            })
        }
    }

}



exports.login =async (req, res) => {
    //validate incoming request body
    const userSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(5).required(),
    })

    const {error}=userSchema.validate(req.body)
    if(error){
        res.status(400).json({
            message:error.message,
            status:false
        })
    }else{
        const {email,password}=req.body
        try {
            const user=await User.findOne({where:{email:email}})
            if(user===null){
                res.status(400).json({
                    message:"Invalid email !!!",
                    status:false
                })  
            }else{
                 if(user.password==password){
                    let access_token=jwt.sign({id:user.user_id,email:user.email},'thisismysecret',{expiresIn:'3600s'})
                    res.json({access_token:access_token})
                 }else{
                   res.status(400).json({
                       message:"Invalid email or password",
                       status:false
                   })
                 }
            }
        } catch (error) {
            res.status(500).json({
                message:'Internal Server Error',
                status:false
            })
        }

    }
}