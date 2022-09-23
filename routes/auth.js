const express=require('express')
const router=express.Router()
const authController=require('../controllers/authController')

//authentications register routes here
//check 

router.post('/register',authController.saveUser)

router.post('/login',authController.login)

module.exports=router