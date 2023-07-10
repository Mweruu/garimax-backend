const models = require("../../database/models");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router();
const multer = require('multer');
const env = process.env.NODE_ENV

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

// Retrieve all Vehicles from the database.
router.get('/admin/getVehicles', async (req, res) => {
    try {
        const vehicles = await models.vehicle.findAll({
            include: models.user,
            order: [['createdAt', 'DESC']]
            });
        return res.status(201).json({
            vehicles,
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
});

module.exports = {
    getAllUsers,
    router
}
