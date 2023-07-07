const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeSchema = new Schema({
    hello:{
        type:String,
    },

    description:{
        type:String,
       
    },
    backgroundImage:{
        type:Array
    },
    storedImages:{
        type:Array
    }
});


const Home = mongoose.model('home', homeSchema);

module.exports = {Home}