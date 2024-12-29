const mongoose = require("mongoose");

const conn = async()=>{
    try{
        const response = await mongoose.connect(`${process.env.MONGO_URL}`);
        if(response){
        console.log("Connected to db");
    }
    }catch(error){
        console.log("An Error occured ",error)
    }
}
conn();
