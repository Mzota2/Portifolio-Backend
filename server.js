const express = require('express');
require('dotenv').config();
const domRoutes = require('./Routes/domRoutes');
const userRoutes = require('./Routes/userRoutes');
const {verifyAccessToken, refreshToken} =require('./JWT/Authorisation');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./MongoDB/DB');
const corsOptions = require('./Config/corsOptions')
const credentials = require('./Middleware/credentials')
const {getUser} = require('./Controllers/userController');
const bodyParser = require('body-parser');
const path = require('path')
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.use(cors({origin:[ "http://localhost:3000",
"http://localhost:2000",
"http://127.0.0.1:5500",
"https://portifolio-admin.onrender.com",],  credentials:true}));
app.use(express.static('/uploads'));

app.get('/uploads/:filename',(req, res)=>{
    const {filename} = req.params;
    res.sendFile(path.resolve(`uploads/${filename}`));
} )

//all routes
app.get('/refresh', refreshToken);
app.use('/', userRoutes);
app.get('/me', verifyAccessToken, getUser)
app.use('/',domRoutes);

const port = process.env.PORT;
connectDB();
app.listen(port,() =>{
    console.log('Listening to port '+ port);
});

