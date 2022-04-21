const Sequelize=require('sequelize')
const sequelize=new Sequelize('testapi','root','',{
    host:'localhost',
    dialect:'mysql'
})

sequelize.authenticate()
.then(()=>{
    console.log('Database connected successfully!!!');
})
.catch((error)=>{
    console.log(error)
})

module.exports=sequelize
global.sequelize=sequelize