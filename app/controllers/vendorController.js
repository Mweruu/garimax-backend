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
            phoneNumber: req.body.phoneNumber,
            passwordHash: bycrypt.hashSync(req.body.password, 10)
        });
        if(user){
            singleVendor = await models.singleVendor.create({
                userId: user.id,
                passportNo: req.body.passportNo,
                isVendor: true,
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
            passwordHash: bycrypt.hashSync(req.body.password, 10)
        });
        if(user){
            coVendor = await models.copVendor.create({
                userId: user.id,
                companyName: req.body.companyName,
                kraPin: req.body.kraPin,
                isVendor: true,
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


module.exports = {
    registerSingleUser,
    registerCoUser,
}