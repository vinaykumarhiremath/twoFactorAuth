const {Schema,model} = require("mongoose");

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    secret:{
        type:String
    },
    qrurl:{
        type:String
    }
},{
    timestamps:true
})

module.exports = model("users",UserSchema)