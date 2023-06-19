const models = require("../../database/models");
const express = require('express');
const User = require("../../database/models/user");
const router = express.Router();
const { randomUUID } = require('crypto');
const { param } = require("../routes");
const multer = require('multer');
const env = process.env.NODE_ENV


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
router.post('/addVehicle', uploadOptions.any(), async (req, res) => {
    console.log(req.body , "image", req.files)
    try {
        // manage image upload
        let file = null;
        let files = [];
        let imagesPaths = [];
        let imagePath = '';
        if(env === 'production'){
            const path = env.PATH
            const basePath = `${req.protocol}://${req.get('host')}/${PATH}/public/uploads/`;
        }else {
            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        }
        files = req.files
        file = files[0] || null;
        files.map((el) => {
            console.log("Data", el)
            imagesPaths.push(`${basePath}${el.filename}`);
        });
        if (!file) return res.status(400).send({message:'No image in the request'});
        imagePath = `${basePath}${file.filename}`;
        console.log(req.body)

        // get and check user
        const user = await models.user.findByPk(req.body.userId);
        console.log("Got here!!")   
        if(!user){
            return res.status(500).json({success: false, message: 'valid user required'})
        }
        const vehicle = await models.vehicle.create({
            id: randomUUID(),
            userId: req.body.userId,
            model: req.body.model,
            image: imagePath,
            images: imagesPaths, 
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
        return res.status(201).json({ vehicle });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
});


// Retrieve all Vehicles from the database.
router.get('/getVehicles', async (req, res) => {
    try {
        const vehicles = await models.vehicle.findAll({
            include: models.user
            });
        return res.status(201).json({
            vehicles,
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
});

router.get(`/getVehicle/:id`, async (req, res) =>{
    const id = req.params.id;
    try{
        const vehicle = await models.vehicle.findByPk(id);
        if(!vehicle) {
            return res.status(500).json({
                error: `Vehicle can not be found`,
                success: false})
        } 
        res.status(200).json(vehicle);
    } catch(err){
        res.status(400).json({
            error: err.message,
            success: false 
        });
    }
});

module.exports = router;