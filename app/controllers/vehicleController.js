const models = require("../../database/models");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomUUID } = require('crypto');
const { param } = require("../routes");
// Create and Save a new User
const addVehicle = async (req, res) => {
    try {
        const vehicle = await models.vehicle.create({
            id: randomUUID(),
            userId: req.body.userId,
            model: req.body.model,
            make: req.body.make,
            location: req.body.location,
            price: req.body.price,
            yearOfManufactor: req.body.yearOfManufactor,
            color: req.body.color,
            vehicleType: req.body.vehicleType,
            condition: req.body.condition,
            transmission: req.body.transmission,
            engineSize: req.body.engineSize,
            mileage: req.body.mileage,
            foreignUsed: req.body.foreignUsed,
            localUsed: req.body.localUsed,
            additionalFeatures: req.body.additionalFeatures
        });
        return res.status(201).json({ vehicle});
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

// Retrieve all Vehicles from the database.
const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await models.vehicle.findAll({});
        return res.status(201).json({
            vehicles,
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
};

module.exports = {
    addVehicle,
    getAllVehicles,
}