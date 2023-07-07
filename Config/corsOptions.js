const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin:(origin, callback)=>{
        if(allowedOrigins.indexOf(origin) !== -1){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },

    optionsSuccessStatus:200,
    credentials:true
}

// const corsOptions = {
//     origin:'*',
//     origin:'http://localhost:3000',
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

module.exports = corsOptions;