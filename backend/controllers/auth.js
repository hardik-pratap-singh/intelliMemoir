const User = require("../models/auth.js")
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hardikps";
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// const uploadImage = require("../uploadImage.js");
var cloudinary = require("cloudinary");
const nodemailer = require("nodemailer")
//using bcrypt is next to cakewalk 
const bcrypt = require("bcryptjs");
//just 3 lines are required 


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nodemailer5901@gmail.com',
        //   pass: 'Jay@5901' //google ne apni koi to policy change kar di hai jiski wajah se ab 16 letters ka password
        // generate karana padta hai account se uske baad us password ko hum further use kar sakte hai 
        //agar password generate nhi kiya to nodemailer kaam nhi karega 
        //kar diya to -->  Email sent: 250 2.0.0 OK  1680855239 s7-20020a62e707000000b0062505afff9fsm2482941pfh.126 - gsmtp 
        pass: 'anuaatoyxexjnxln'
    }
});
//***********cloudinary starts ************ */

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};
const uploadImage = (image) => {
    //imgage = > base64
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (error, result) => {
            if (result && result.secure_url) {
                console.log(result.secure_url);
                return resolve(result.secure_url);
            }
            console.log(error.message);
            return reject({ message: error.message });
        });
    });
};

//***********cloudinary ends ************ */

const signup = async (req, res) => {

    const { name, email, password, image } = req.body;

    // console.log(image) ; 


    //express validator ka part hai ye to 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(500).json({ error: "Email Already Taken ! " });
        }

        // const {name , email , password } = req.body; 
        // console.log(name + email + password) ; 


        //await ke bina bhi chal rha hai below function 
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);
        uploadImage(image);
        user = await User.create({ name, email, password: secPass, image })


        // .then((url) => res.send(url))
        // .catch((err) => res.status(500).send(err));

        //         Common fields
        // from - The email address of the sender. All email addresses can be plain ‘sender@server.com’ or formatted '“Sender Name” sender@server.com', see Address object for details
        // to - Comma separated list or an array of recipients email addresses that will appear on the To: field
        // cc - Comma separated list or an array of recipients email addresses that will appear on the Cc: field
        // bcc - Comma separated list or an array of recipients email addresses that will appear on the Bcc: field
        // subject - The subject of the email
        // text - The plaintext version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘/var/data/…'})
        // html - The HTML version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘http://…'})
        // attachments - An array of attachment objects (see Using attachments for details). Attachments can be used for embedding images as well.
        var mailOptions = {
            from: 'nodemailer5901@gmail.com',
            to: email,
            subject: 'iNoteBook|SignUp|Confirm|NotesOnCloud',
            text: `Hey ${name} ! Welcome To iNoteBook. Your Credentials are as follows :- email : ${email} & password : ${password} `,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                // console.log(error);
                res.json({ "sucess": false })
            } else {
                res.json({ "sucess": false, "msg": "Email Sent" })
                // do something useful
            }
        });
        return res.status(200).json({ "success": true });



    }

    catch (err) {
        res.json({ error: "Internal Server Error .. " })
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ "success": false, "issue": "email" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        // let pass = user.password ; 
        if (!passwordCompare) {
            return res.status(401).json({ "success": false, "issue": "password" });
        }


        else {
            const data = {
                // id : user._id ,  //{ id: new ObjectId("6425883bd4472dcb3a9bd28d") }
                // id : user.id //{ id: '6425883bd4472dcb3a9bd28d' }
                user: {
                    id: user.id
                }
            }

            // console.log(data);

            const authToken = jwt.sign(data, JWT_SECRET);
            // console.log(data);
            // console.log(authToken); 
            return res.status(200).json({ "success": true, authToken });
        }

    }

    catch (err) {
        res.status(400).json({ error: "Internal Server Error .. " })
    }


}


const getuser = async (req, res) => {

    try {
        let userid = req.user.id;
        let data = await User.findById(userid).select('-password');
        res.status(200).json(data);
        // res.send("got it "); 

    } catch (err) {
        res.json({ "error": "getuser catch block" });
    }

}



module.exports = { signup, login, getuser }; 