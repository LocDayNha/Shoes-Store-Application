const express = require ("express");
const mongoose = require ("mongoose");
const crypto = require ("crypto");
const nodemailer = require ("nodemailer");
const cookieParser = require('cookie-parser');


const app = express();
const port = 3000;
const cors = require ("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(cookieParser());


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const jwt = require ("jsonwebtoken");

//connect database
mongoose.connect('mongodb+srv://tungh3210:tung@cluster0.cmonbw2.mongodb.net/GraduationProject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));
  
app.listen(port,() => {
    console.log("Server is running on port 3000")
})

const User = require ("./models/user");
const Order = require ("./models/order");


//function to send verification email to the user
const sendVerificationEmail = async (email, verificationToken) => {
    //create a nodemailer transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "thefivemensshoesshop@gmail.com",
            pass: "ihor pimr pbgb niir"
        }
    })

    //compose the email message
    const mailOptions = {
        from: "thefivemensshoes.com",
        to: email,
        subject: "Email Verification",
        text: `Please click the following link to verify your account : http://localhost:3000/verify/${verificationToken}`
    };
    
    //send the email
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Error sending verification email", error);
    }
};


//endpoint to register in the app
app.post("/register",async(req,res) => {
    try {
        const {name, email, password} = req.body;

        //check if the email is already registered
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "Email already registered!"});
        }

        //create new user
        const newUser = new User({name,email,password});


        //generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        //save the user to the database
        await newUser.save();

        //send the verification email to the user
        sendVerificationEmail(newUser.email, newUser.verificationToken);
        res.status(200).json({message: "Registration successful! We sent you a verification in your email"});
    } catch (error) {
        console.log("error registering user!", error);
        res.status(500).json({message: "Registration failed!"});
    }
});

    //endpoint to verify email
    app.get("/verify/:token", async(req,res) => {
        try {
            const token = req.params.token;

            //find the user with the given verification token
            const user = await User.findOne({verificationToken: token});
            if(!user){
                return res.status(404).json({message: "Invalid verification token"});
            }

            //Mark the user as verified
            user.verified = true;
            user.verificationToken = undefined;

            await user.save();
            res.status(200).json({message: "Email verified successfully"})
        } catch (error) {
            res.status(500).json({message: "Email Verification Failed!"});
        }
    });

    const generateSecretKey = () =>{
        const secretKey = crypto.randomBytes(32).toString("hex");
        return secretKey;
    }
    const secretKey = generateSecretKey();

    //endpoint to login to the user
    app.post("/login", async(req,res) => {
        try {
            const {email, password} = req.body;

            //check if the user exist
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({message: "Invalid email!"});
            }

            //check if the password is correct
            if(user.password != password) {
                return res.status(400).json({message: "Invalid password!"});
            }

            //generate a token
            const token = jwt.sign({ userId: user._id }, secretKey);

            res.status(200).json({message: "Login Successfully!", token});
        } catch (error) {
            res.status(500),json({message: "Login Failed"});
        }
    })