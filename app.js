const express = require('express')
const app = express()
const routes=require('./routes/routes')
const authRoutes=require('./routes/auth')
const morgan=require('morgan')
const swaggerJsDoc=require('swagger-jsdoc')
const swaggerUI=require('swagger-ui-express')

const swaggerOptions={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Nodejs API Training',
            version:'1.0.0',
            description:'API development using swagger ui documentation',
            contact:{
                name:'Prasanna KB',
                url:'https://www.linkedin.com/in/prasanna-kumar-baniya-9a91a5179/',
                email:'prasannakb440@gmail.com'
            },
            servers:["http://localhost:3000"]
        },
    },
    apis:['./routes/routes.js']
}

const swaggerDocs=swaggerJsDoc(swaggerOptions)



app.use(express.json())

//database
require('./database/connection')

app.use(morgan('tiny'))
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs))
app.use('/post',routes)
app.use(authRoutes)


app.use((req,res,next)=>{
    res.status(404).send('Page Not Found')
})

const PORT = 5000 || process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is listening at PORT: ${PORT}`)
})