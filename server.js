const express=require('express')
const dotenv=require('dotenv')
const morgan=require('morgan')
dotenv.config({path:'config.env'})
const ApiError=require('./utils/apiError')
const globalError=require('./middlewares/errorMiddleware')
const DBconnection =require('./config/config_database')
const categoryRoute=require('./routes/categoryRoute')
const subcategoryRoute=require('./routes/subcategoryRoutes')
const brandsRoute=require('./routes/brandRoutes')
const productRoute=require('./routes/productRoute')

//connection database
DBconnection()

const app=express()
// middlewares  
app.use(express.json())
if(process.env.NODE_ENV==='dev')
{
    app.use(morgan('dev'))
    console.log(`mode: ${process.env.NODE_ENV}`)
} 


//route                                                                             )
app.get('/',(req,res)=>{
    res.send('route API routes')
})
app.use("/api/categories",categoryRoute)
app.use("/api/subcategories",subcategoryRoute)
app.use("/api/brands",brandsRoute)
app.use("/api/products",productRoute)
app.all("*",(req,res,next)=>{
    //create error and send it to error handling middleware
    // const error=new Error(`can't find this route : ${req.originalUrl}`);
    // next(error.message);
     next(new ApiError(`can't find this route : ${req.originalUrl}`,400));
})
// Global error handling middleware for express
app.use(globalError);


const PORT=process.env.PORT || 8000
const server=app.listen(PORT,
    console.log("App running on port 8000"));


// error handling Rejection outside express
process.on("unhandledRejection",(err=>{
             console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
             server.close(()=>{
                console.log('shutting down....')
                process.exit(1);})
           
}));