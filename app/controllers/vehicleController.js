const models = require("../../database/models");
const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto');
const { param } = require("../routes");
const multer = require('multer');


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
router.post('/', uploadOptions.single('image'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).send({message:'No image in the request'});

        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        console.log(req.body.userId)
        const user = await models.user.findByPk(req.body.userId);
            
        if(!user){
            return res.status(500).json({success: false, message: 'valid user required'})
        }
        const vehicle = await models.vehicle.create({
            id: randomUUID(),
            userId: req.body.userId,
            model: req.body.model,
            image: `${basePath}${fileName}`,
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
});

// Retrieve all Vehicles from the database.
router.get('/', async (req, res) => {
    try {
        const vehicles = await models.vehicle.findAll({});
        return res.status(201).json({
            vehicles,
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
});

module.exports = router;