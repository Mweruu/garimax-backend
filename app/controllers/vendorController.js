const models = require("../../database/models");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Create and Save a new User
const registerSingleUser = async (req, res) => {
    try {
        let singleVendor = null;
        const userExists = await models.user.findOne({ where: { email: req.body.email } });
        if(userExists){
            return res.status(404).json({message: 'Email entered already exists'});
        }
        const user = await models.user.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            isVendor: true,
            phoneNumber: req.body.phoneNumber,

            passwordHash: bycrypt.hashSync(req.body.password, 10)
        });
        if(user){
            singleVendor = await models.singleVendor.create({
                userId: user.id,
                passportNo: req.body.passportNo,
                gender: req.body.gender
            });
        }
        return res.status(201).json({
            ...user, ...singleVendor
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const registerCoUser = async (req, res) => {
    try {
        let coVendor = null;
        const userExists = await models.user.findOne({ where: { email: req.body.email } });
        if(userExists){
            return res.status(404).json({message: 'Email entered already exists'});
        }
        const user = await models.user.create({
            firstName: req.body.companyName,
            lastName: req.body.companyName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            isVendor: true,
            passwordHash: bycrypt.hashSync(req.body.password, 10)
        });
        if(user){
            coVendor = await models.copVendor.create({
                userId: user.id,
                companyName: req.body.companyName,
                kraPin: req.body.kraPin,
                dealerLicense: req.body.dealerLicense,
                address: req.body.address,
                location: req.body.location
            });
        }
        console.log(user, coVendor)
        return res.status(201).json({
            ...user, ...coVendor
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const getAllCoVendor = async (req, res) => {
    try {
        const users = await models.copVendor.findAll({});
        return res.status(201).json({
            users,
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
};

const getAllSingleUser = async (req, res) => {
    try {
        const users = await models.singleVendor.findAll({});
        return res.status(201).json({
            users,
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
};

const getSingleIndividualVendor = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await models.singleVendor.findByPk(id);
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

const getSingleCompanyVendor = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await models.copVendor.findByPk(id);
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
module.exports = {
    registerSingleUser,
    registerCoUser,
    getAllCoVendor,
    getAllSingleUser,
    getSingleCompanyVendor,
    getSingleIndividualVendor
}