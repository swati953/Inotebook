const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');
//using json web token to give user a complete authentication
var jwt = require('jsonwebtoken');
const { json } = require('express');
//this is a signature part of jwt
const JWT_SECRET = "harryisagoodboy";

//Route 1: creating a user using POST : "/api/auth/createuser" login is not requirde
router.post('/createuser', [

        body('name', 'enter a valid name').isLength({ min: 3 }),
        body('email', 'enter a valid email').isEmail(),
        body('password').isLength({ min: 5 }),
    ],
    async(req, res) => {
        let success = false;
        // if there is any error 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        // check whether the user with same email exist or not
        //we put it into try-catch so that no any issue arise

        try {
            //finding a user that exist or not
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: "Sorry, the user with this email is already exists" });
            }
            // to secure our password using hash bcrypt fucntion 
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            //if user is not exist then create it
            user = User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })

            //using jwt token
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            // console.log(authtoken);
            success = true;
            res.json({ success, authtoken })
        } catch (error) {
            console.error(error.message);

            res.status(500).send("some error arise");
        }
    })

//Route 2: authenticate a user for login /api/auth/login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists(),
], async(req, res) => {
    // if there is any error 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //If now werror arise by basic check Check the credentialse from DB
    const { email, password } = req.body;
    try {
        //finding user with same email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Sorry, No user with this email exist" });
        }
        //if email is rigth now cgeck the password, It automtically check for hash 
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            const success = false;
            return res.status(400).json({ success, error: "Sorry, please login with correct password" });

        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        const success = true;
        res.json({ success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})

//Route 3: get user dtails of login user /api/auth/getuser
// below is middle ware
router.post('/getuser', fetchuser,
    async(req, res) => {

        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password")
            res.send({ user });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error");
        }
    })


module.exports = router;