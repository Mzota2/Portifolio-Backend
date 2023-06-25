const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    project_title:{
        type:String,
    }
    ,
    project_link:{
        type:String,
    },

    project_image:{
        type:String,
       
    }
});


const Project = mongoose.model('project', projectSchema);

module.exports = {Project}