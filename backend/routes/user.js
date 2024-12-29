const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');

// Sign in route
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
    const existingUser = await User.findOne({ username});
    const existingEmail = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Username Already Exist" })
    } else if (username.length < 3) {
        return res.status(400).json({ message: "Username should have more than 3 character" })
    }
    if (existingEmail) {
        return res.status(400).json({ message: "Email Already Exist" })
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({
         username: req.body.username,
         email :req.body.email,
         password:hashedPassword
    });

    await newUser.save();
    return res.json({message : "Signed In Successfully! New User created"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : "Internal Server Error"});
    }
});

// Login route
router.post("/login",async (req,res)=>{
    const {username , password} = req.body;
    const existingUser = await User.findOne({ username});
    if (!existingUser) {
        return res.status(400).json({ message: "Invalid credential" });
    }
    bcrypt.compare(password,existingUser.password,(err,data)=>{
        if(data){
            const authClaims = [{name : username},{jti : jwt.sign({},"secret")}];
            const token = jwt.sign({authClaims},"secret" , {expiresIn : "2d"});
            return res.status(200).json({id: existingUser._id , token : token});
        }else{
            return res.status(400).json({ message: "Invalid credential" });
        }
    })
})



module.exports = router;