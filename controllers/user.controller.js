const db = require("../models");
const User = db.users;
const logger = require('../logger')

// Create a new User
exports.create = async (req, res) => {

    let user_payload = req.body;
    if(!req.body){
        return res.status(500).send({
            message: "Body is empty",
        });
    }

    logger.info(
        `********create user********, ${user_payload}`
    );

    //check if the user exists
    const data = await User.findOne({ email: user_payload.email });
    
    if (!data) {
        // create user
        User.create(user_payload, (err)=>{
            if(!err)
                return res.status(200).json({
                    success: "true",
                    message: "User successfully created!"
                });      
            else{
                logger.error(`Error creating a new user: ${JSON.stringify(err)}`);
                return res.status(500).send(`User couldn't be created: ${JSON.stringify(err.message)}`)
            }
        })
    } else {
        return res.json({
            success: "false",
            errorCode: "401",
            message: "User already exists",
        });
    }
};


// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users.",
            });
        });
};

