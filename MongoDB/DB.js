const mongoose = require('mongoose');

const connectDB = async()=>{
    await mongoose.connect(process.env.MONGODB_URL, {}).then((res)=>{
        console.log('Connected to MongoDB Successfully');
    })
}

module.exports = connectDB;