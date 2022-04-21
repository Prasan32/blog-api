const Post = require('../models/Post') //Model 

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll()
        if(posts){
            res.status(200).json({
                "message": "Data Found Successfully!",
                "data": posts
            })
        }
    } catch (error) {
        res.status(500).json({
            "message": "Something went wrong",
            "data": []
        })
    }
}

exports.getPostById =async (req, res) => {
    const id=req.params.id
    try {
        const post=await Post.findAll({
            where:{
                post_id:id
            }
        })
        if(post.length!==0){
            res.status(200).json({
                "message": "Data Found Successfully!",
                "data": post
            })
        }else{
            res.status(500).json({
                "message": "No data found with the given id",
                "status":false
            })
           }
    } catch (error) {
        res.status(500).json({
            "message": "Something went wrong",
            "data": {}
        })
    }

}


exports.addPost = (req, res) => {
    const { title, description, author } = req.body
    let post = {
        title: title,
        description: description,
        image: req.file.filename,
        author: author
    }

    Post.create(post)
        .then((result) => {
            res.status(201).json({
                "message": "Data saved successfully",
                "data": result
            })
        })
        .catch((error) => {
            res.status(500).json({
                "message": "Something went wrong",
                "data": {}
            })
        })

}

exports.updatePost=async (req,res)=>{
    const {title,description,author}=req.body
    const updatedPost={title,description,image:req.file.filename,author}
    try {
       const post=await Post.update(updatedPost,{
           where:{
               post_id:req.params.id
           }
       })
       if(post[0]===1){
        res.status(201).json({
            "message": "Data updated successfully",
            "data": updatedPost
        })
       }else{
        res.status(500).json({
            "message": "No data found with the given id",
            "status":false
        })
       }
    } catch (error) {
        res.status(500).json({
            "message": "Something went wrong",
            "data": {}
        })
    }
}

exports.deletePost=async (req,res)=>{
    const id=req.params.id

    try {
           let postDelete=await Post.destroy({
               where:{
                   post_id:id
               }
           })
           if(postDelete){
            res.status(201).json({
                "message": "Data deleted successfully",
                "status": true
            })
           }else{
            res.status(500).json({
                "message": "No data found with the given id",
                "status":false
            })
           }
    } catch (error) {
        res.status(500).json({
            "message": "Something went wrong",
            "data": {}
        })
    }
}