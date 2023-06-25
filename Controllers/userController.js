require('dotenv').config();
const {User} = require('../Models/usersModel');
const bcrypt = require('bcrypt');
const {generateAccessToken, generateRefreshToken} = require('../JWT/Authorisation');
const { verify } = require('jsonwebtoken');
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const signUp = async(req, res)=>{
    const {username, email, password}= req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        username:username,
        email:email,
        password:hash
    });
    res.json(newUser);
}
const signIn = async(req, res)=>{
    const {email, password} = req.body;
    const foundUser =await User.findOne({email});
    if (foundUser){
        const match = await bcrypt.compare(password, foundUser.password);
        if(match){
            const accessToken =  generateAccessToken(foundUser);
            const refreshToken = generateRefreshToken(foundUser);
            //
            res.cookie('refresh-token', refreshToken, {maxAge:60*60*24*5*1000, httpOnly:true}).json(accessToken);
        }
        else{
            res.sendStatus(403);
        }
    }
   

}

const getUser = async(req,res)=>{
    const userId = req.id;
    try {
        const foundUser = await User.findOne({_id:userId});
        if(foundUser){
            res.json({username:foundUser.username, email:foundUser.email})
        }
            
    } catch (error) {
        res.sendStatus(403)
    }

    
}
const logout = async(req, res)=>{
    const refreshToken = req.cookies['refresh-token'];
    if(!refreshToken){
            res.sendStatus(203);
    }
    else if(refreshToken){
        verify(refreshToken, refreshTokenSecret, (error, decoded)=>{
            if(error){
                res.sendStatus(203);
            }
            else if(decoded){
                res.clearCookie('refresh-token', {httpOnly:true}).json('Logged Out successfully')
            }
        })

    }
}

module.exports = {
    signIn, signUp, logout, getUser
}