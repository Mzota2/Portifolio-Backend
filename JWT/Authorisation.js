const {verify, sign} = require('jsonwebtoken');
require('dotenv').config();

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const generateAccessToken=(user)=>{
    const accessToken = sign({id:user._id}, accessTokenSecret, {expiresIn:'300s'})
    return accessToken;
}
const generateRefreshToken = (user)=>{
    const refreshToken = sign({id:user._id}, refreshTokenSecret, {expiresIn:'5d'})
    return refreshToken;
}

const verifyAccessToken = async(req, res, next)=>{
    const accessToken = req.headers['authorization']?.split(' ')[1];
    if(!accessToken){
        res.sendStatus(403);
    }
    else if(accessToken){
        verify(accessToken, accessTokenSecret, (error, decoded)=>{
            if(error){
                res.sendStatus(403);
            }
            else if(decoded){
                req.id = decoded.id;
                next()
            }
        })
    }

}

const refreshToken = async(req, res)=>{
    const refreshToken = req.cookies['refresh-token'];
    if(!refreshToken){
        res.sendStatus(401);
    }
    if(refreshToken){
        verify(refreshToken, refreshTokenSecret, (error, decoded)=>{
            if(error){
                res.sendStatus(403);
            }
            else if(decoded){
                const accessToken = sign({id:decoded.id}, accessTokenSecret, {expiresIn:'300s'});
                res.json(accessToken)
            }
        })
    }

}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    refreshToken
}