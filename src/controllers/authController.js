const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.register = async (req,res) => {
    const {email, password} = req.body;
    console.log(req.body);
    try {
        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create(
            {
                data: {
                    email,
                    password : hashedPass
                }
            }
        );

        res.status(201).json({ message: 'User registered successfully', user: newUser });

    } catch(err) {
        res.status(400).json({message: "Bad Request"});
    }
};

exports.login = (req,res) => {
    res.status(200).json({message: "succesfully logged in", user: req.user});
}

exports.logout = (req,res) =>{
    if(req.isAuthenticated()) {
        req.logout(function(err){
            if(err) {
                return next(err);
            }
            else 
            res.status(200).json({message: "successfully logged out"});
        });
    }
    else {
        res.status(400).json({message: "You are not even logged in!"});
    }
}

exports.loggedStatus = (req, res) => {
    if(req.isAuthenticated()) {
        res.status(200).json(true);
    }
    else {
        res.status(200).json(false);
    }
}