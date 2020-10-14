const jwt = require('jsonwebtoken')
const Doctor = require('../../models/doctor')
const { response } = require('express')
const auth = async (req,res,next)=>{
        const token = req.header('Authorization').replace('Bearer ','')
        if  (token == null){
            return response.status(401).send('Invalid token')
        }
        jwt.verify(token,'nachiketabg',(err, decoded)=>{
            if(err){
                return res.status(500).send('Failed to authenticate')
            }
            req.id = decoded
            console.log('NACHI : '+decoded)
            next();
        }) 
}

module.exports = auth
