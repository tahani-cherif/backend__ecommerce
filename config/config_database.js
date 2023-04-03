const mongoose=require('mongoose')


const config_data=()=>mongoose.connect(process.env.DB_URL,
    { useNewUrlParser: true ,useUnifiedTopology: true })
    .then(()=>
    console.log('mongosse connected'))
   

module.exports= config_data;    