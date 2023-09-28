const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const UserSchema = require("../Module/User");

const signup = async(req,res)=>{
    try {
        const userDetails= req.body;
        const secret = speakeasy.generateSecret({
            name:"avivaAdmin"
        })
        const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url)
        const user = await UserSchema.create({...userDetails,secret:secret.base32,qrurl:qrCodeUrl});
        if(user){
            res.status(201).json({user})
        }else{
            res.status(400).json({error:"unable to create user"})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const signin = async(req,res)=>{
    try {
        const {email,password,token} = req.body;
        const user = await UserSchema.findOne({email});
        if(user && user.password == password){
            const verified = await speakeasy.totp.verify({
                secret:user.secret,
                encoding:"base32",
                token
            })
            if(verified){
                res.status(200).json({message:"user logged in successfully",user})
            }else{
                res.status(400).json({error:"validator error...please retry"})
            }
        }else{
            res.status(400).json({error:"invalid credentials"})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports = {signup,signin}