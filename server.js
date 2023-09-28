const express = require("express");
const {databaseConnect} = require("./database");
const authRoutes = require("./routes/auth")
const app = express();

const startServer = () => {
    try {
        databaseConnect();
  
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
  
      app.use("/api/auth", authRoutes);
  
      app.listen(5050, (err) => {
        if (err) throw err;
        console.log("server is running on 5050");
      });
    } catch (err) {
      console.log(err);
    }
};
startServer();
