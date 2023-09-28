const {connect} = require("mongoose");

const databaseConnect = async ()=>{
    try {
        await connect("mongodb://localhost:27017",{useNewUrlParser: true,});
        console.log("database connected successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {databaseConnect}