const models = require("../../database/models");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Create and Save a new User
const registerSingleUser = async (req, res) => {
    try {
        let singleVendor = null;
        const user = await models.user.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobile: req.body.mobile,
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
        const user = await models.user.create({
            firstName: req.body.companyName,
            lastName: req.body.companyName,
            email: req.body.email,
            mobile: req.body.mobile,
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


module.exports = {
    registerSingleUser,
    registerCoUser,
}