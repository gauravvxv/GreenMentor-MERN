const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {Router} = require("express");
const {AuthModel} = require("../model/Auth.model");

const userController = Router();

require("dotenv").config();

userController.post("/signup",(req,res)=>{

const {firstName,lastName,email,phone,password} = req.body;

bcrypt.hash(password, 10 , async function(err, hash) {
   
    if(err){
        res.status(500).send(err);
    }

    const user = new AuthModel({
        firstName,
        lastName,
        email,
        phone,
        password: hash
    });

    try {
        await user.save();
        res.status(201).send("User profile is Created")

    } catch (error) {
        console.log(error);
        res.status(500).send("Signup Failed");
    }
})
})

// LOGIN PART 

userController.post("/login", async (req,res)=>{
    const {email,password} = req.body;

    const user = await AuthModel.findOne({email});

    if(!user){
        res.status(404).send("Invalid Credentials");
        return;
    }

    const hash = user.password;

    bcrypt.compare(password, hash, function(err, result) {
    if(err){
        res.status(500).send(err)
    }

    if(result){
        const token = jwt.sign({userID: user._id }, process.env.SECRET_KEY);
        res.status(200).send({message: "Login Successful",token: token,userId:user._id})
    }
    else{
        res.status(404).send("Invalid Credentials");
    }
    });
})




userController.get("/profile", async  (req,res)=>{
    try {
        const userId = req.query.id;

        if(!userId){
            return res.status(400).send("User ID is required");
        }

        const profileData = await AuthModel.findById(userId);

        if(!profileData){
            return res.status(400).send("User not found");
        }

        res.status(200).send(profileData);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
})

userController.patch("/profile/:ID",async (req,res)=>{
    try {
        const id = req.params.ID;
        const userData = req.body;

        if(userData.password){

            bcrypt.hash(userData.password,10,async function(err,hash){
                if(err){
                    res.status(500).send(err);
                    return;
                }
                userData.password=hash;
    
                await AuthModel.findByIdAndUpdate(id,userData);
    
                res.status(200).send("Your profile is updated successfully");
            })
    
        }
        else{
            await AuthModel.findByIdAndUpdate(id,userData);
            res.status(200).send("Your profile is updated successfully");

        }
    } catch (error) {
console.log(error);
res.status(500).send("Something went wrong")        
    }
})

module.exports={
    userController
}