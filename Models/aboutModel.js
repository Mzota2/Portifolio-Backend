const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutSchema = new Schema({
    about_title:{
        type:String,
    },

    about_description:{
        type:String,
       
    },
    about_skills:{
        type:String
    },
    about_image:{
        type:String
    },

});


const About = mongoose.model('about', aboutSchema);

module.exports = {About}