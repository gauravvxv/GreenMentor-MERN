const express = require("express");
const {connection} = require("./config/db")
const {userController} = require("./Routes/auth.route")
const {taskController} = require("./Routes/task.route")
const verifyToken = require("./middlewares/authMiddleware")
const bodyParser = require("body-parser");
const cors = require("cors");



const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

require("dotenv").config();
const PORT = process.env.port;

app.get("/",(req,res)=>{
    res.send("Welcome to the landing page");
})



app.use("/",taskController);


app.use("/",userController)

app.listen(PORT,async()=>{
    try {
        await connection;
        console.log("MONGODB is connected")
    } catch (error) {
        console.log(error);
    }
    console.log(`${PORT}  is running`)
})