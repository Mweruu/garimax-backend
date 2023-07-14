const models = require("../../database/models");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router();
const multer = require('multer');
const env = process.env.NODE_ENV

// upload profile image
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

const uploadOptions = multer({ storage: storage });

// Create and Save a new User
const registerUser = async (req, res) => {
    try {
        const userExists = await models.user.findOne({ where: { email: req.body.email } });
        if(userExists){
            return res.status(404).json({message: 'Email entered already exists'});
        }
        const user = await models.user.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            passwordHash: bycrypt.hashSync(req.body.password, 10)
        });
        return res.status(201).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
  }

const registerAdmin = async (req, res) => {
    try {
        const userExists = await models.user.findOne({ where: { email: req.body.email } });
        if(userExists){
            return res.status(404).json({message: 'Email entered already exists'});
        }
        const user = await models.user.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            isAdmin: true,
            passwordHash: bycrypt.hashSync(req.body.password, 10)
        });
        console.log(user)
        return res.status(201).json({
            user
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
        if(user && bycrypt.compareSync(req.body.password, user.passwordHash)){
            const secret = process.env.SECRET
            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                secret,
                {expiresIn: '1d'}
            )
            res.send({  message: 'User Authenticated',
                        user,
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
        const users = await models.user.findAll({});
        return res.status(201).json({
            users,
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
};

const adminGetAllUsers = async (req, res) => {
    try {
        const users = await models.user.findAll({});
        return res.status(201).json({
            users,
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
};

const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await models.user.findByPk(id);
        if(!user) {
            return res.status(500).json({
                error: `User does not exist`,
                success: false})
        } 
        res.status(200).json(user);
    } catch(err){
        res.status(500).json({
            error: err.message,
            success: false 
        });
    }
};

router.put('/user/updateProfile/:userId', uploadOptions.single('profileImage'), async (req, res) => {
    const userId = req.params.userId;
    try{
        const userExists = await models.user.findByPk(userId);
        if(!userExists) {
            return res.status(500).json({
                error: `User does not exist`,
                success: false})
        }
        const file = req.file;
        let profileUrl='';
        let basePath
        if (file){
            const fileName = file.filename;
            if(env === 'production'){
                basePath = `${req.protocol}://${req.get('host')}/garimax-backend/public/uploads/`;
            }else {
                basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
            }
            profileUrl = `${basePath}${fileName}`
        }

        console.log("profileUrl",profileUrl);
        const user = await models.user.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            profileImage: profileUrl,
            companyUrl: req.body.companyUrl,
            // passwordHash: bycrypt.hashSync(req.body.password, 10)
        }, {
            where: { id: userId}
        });
        res.status(201).json(user);
    } catch(err){
        res.status(500).json({
            error: err.message,
            success: false 
        });
    }
});


module.exports = {
    registerUser,
    registerAdmin,
    loginUser,
    getAllUsers,
    getSingleUser,
    adminGetAllUsers,
    router
}
