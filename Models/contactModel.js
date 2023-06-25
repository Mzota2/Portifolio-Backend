const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    contact_icon:{
        type:String,
    },

    contact_title:{
        type:String,
       
    },
    contact_description:{
        type:String
    },

    contact_link:{
        type:String
    }
});

const directContactSchema = new Schema({
    username:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
       
    },
    message:{
        type:String
    }
});



const directContact = mongoose.model('directContact', directContactSchema);
const Contact = mongoose.model('contact', contactSchema);
module.exports = {directContact, Contact}