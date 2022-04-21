const express=require('express')
const router=express.Router()
const controller=require('../controllers/controllers')
const multer=require('multer')
const auth=require('../middlewares/auth')
const swaggerJsDoc=require('swagger-jsdoc')
const swaggerUI=require('swagger-ui-express')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})
const upload=multer({storage:fileStorageEngine})

/** 
* @swagger
* definitions:
*  Post:
*   type: object
*   properties:
*    title:
*     type: string
*     description: title of the post
*     example: 'First Post'
*    description:
*     type: string
*     description: description of the post
*     example: 'This is my first post'
*    image:
*     type: string
*     format: binary
*     description: image of the post
*     example: '1648900882821--image1.jpg'
*    author:
*     type: string
*     description: author of the post
*     example: 'Admin'
*/


/** 
* @swagger
* /post:
*  get:
*   summary: get all the posts
*   description: This gets all the blog post.
*   responses:
*    200:
*     descrition: Success
*    500:
*     description: Failure
*/

router.get('/',controller.getPosts)

/** 
* @swagger
* /post/{id}:
*  get:
*   parameters:
*    - in: path
*      name: id
*      schema: 
*       type: integer
*      required: true
*   summary: get post by id
*   description: This api gets blog post by id.
*   responses:
*    200:
*     descrition: Success
*    500:
*     description: Failure
*/

router.get('/:id',controller.getPostById)

/** 
* @swagger
* /post/addPost:
*  post:
*   summary: create post
*   description: This api creates blog post.
*   requestBody:
*    content:
*     multipart/form-data:
*      schema:
*       $ref: '#definitions/Post'
*   responses:
*    201:
*     description: post created successfully
*    500:
*     description: Internal server error
*/

router.post('/addPost',upload.single('image'),controller.addPost)

/** 
* @swagger
* /post/updatePost/{id}:
*  put:
*   parameters:
*    - in: path
*      name: id
*      schema: 
*       type: integer
*      required: true
*   summary: update post
*   description: This api updates blog post.
*   requestBody:
*    content:
*     multipart/form-data:
*      schema:
*       $ref: '#definitions/Post'
*   responses:
*    201:
*     description: post updated successfully
*    500:
*     description: Internal server error
*/
router.put('/updatePost/:id',upload.single('image'),controller.updatePost)

/** 
* @swagger
* /post/{id}:
*  delete:
*   parameters:
*    - in: path
*      name: id
*      schema: 
*       type: integer
*      required: true
*   summary: delete post
*   description: This api deletes blog post.
*   responses:
*    200:
*     description: post deleted successfully
*    500:
*     description: Internal server error
*/

router.delete('/:id',controller.deletePost)

module.exports=router