const models = require("../../database/models");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Create and Save a new User
const registerUser = async (req, res) => {
    try {
        const user = await models.user.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobile: req.body.mobile,
            passwordHash: bycrypt.hashSync(req.body.password, 10)
        });
        return res.status(201).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
  }

// Login User
const loginUser = async (req, res) => {
    try{
        const user = await models.user.findOne({ where: { email: req.body.email }});
        if(!user){
            return res.status(400).json({
                error: `User not found`,
                success: false})
        }
        if(user && bycrypt.compareSync(req.body.passwordHash, user.passwordHash)){
            const secret = process.env.SECRET
            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                secret,
                {expiresIn: '1d'}
            )
            res.send({ message: 'User Authenticated',
                        token,
                        success: true });
        }else {
            res.send({ message: 'Wrong credentials, confirm password/email',
                        success: false });
        }
    }catch(err){
        res.status(400).json({
            error: err.message,
            success: false 
        });
    }
  }

// Retrieve all User from the database.
const getAllUsers = async (req, res) => {
    try {
        const user = await models.user.findAll({});
        return res.status(201).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
}
