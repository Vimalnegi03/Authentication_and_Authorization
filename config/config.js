const mongoose=require('mongoose')
const connectToDb=()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then((conn)=>{
        console.log("databse connected");
        console.log(`${conn.connection.host}`);
    })
    .catch((err)=>{
        console.error(`Error connecting to database: ${err}`)
    })
}

module.exports=connectToDb