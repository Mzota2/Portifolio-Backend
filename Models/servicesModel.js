const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    service_title:{
        type:String,
    },

    service_icon:{
        type:String,
       
    },
    service_description:{
        type:String
    }
});


const Service = mongoose.model('service', serviceSchema);

module.exports = {Service}