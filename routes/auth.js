const express=require('express')
const router=express.Router()
const authController=require('../controllers/authController')

//authentications routes here

router.post('/register',authController.saveUser)

router.post('/login',authController.login)

module.exports=router