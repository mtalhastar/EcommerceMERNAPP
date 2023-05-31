const jwt = require('jsonwebtoken');

let DecodeUser = (req, res, next) => {
    let token = req.headers['token']
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=> {
        if(!err){
            req.decoded = decoded
            next()
        }
        else {
            res.status(403).send({"Message": "You are not authorized"})
        }
    })    
}
let checkAdmin = (req, res, next) => {
    if(req.decoded.role=='admin'){
        next()
    }else{
        res.status(403).send({message:"no permissions"})
    }
}
let checkBuyer= (req, res, next) => {
    if(req.decoded.role=='admin' || req.decoded.role=='buyer' ){
        next()
    }else{
        res.status(403).send({message:"no permissions"})
    }
}
let checkSeller= (req, res, next) => {
    if(req.decoded.role=='admin' || req.decoded.role=='seller' ){
        next()
    }else{
        res.status(403).send({message:"no permissions"})
    }
}
let checkRider= (req, res, next) => {
    if(req.decoded.role=='admin' || req.decoded.role=='rider' ){
        next()
    }else{
        res.status(403).send({message:"no permissions"})
    }
}
module.exports={
  DecodeUser,checkAdmin,checkBuyer, checkSeller,checkRider
}