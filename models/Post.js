const Sequelize=require('sequelize')
const sequelize=require('../database/connection')
module.exports=sequelize.define('Post',{

  post_id:{
    type:Sequelize.INTEGER(11),
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  },
  title:{
    type:Sequelize.STRING,
    allowNull:false
  },
  description:{
    type:Sequelize.TEXT,
    allowNull:false
  },
  image:{
    type:Sequelize.STRING,
    allowNull:false
  },
  author:{
    type:Sequelize.STRING,
    allowNull:false
  },
  createdAt:Sequelize.DATE,
  updatedAt:Sequelize.DATE
  
})