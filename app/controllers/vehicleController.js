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

// Create and Save a new vehicle
router.post('/addVehicle', uploadOptions.any(), async (req, res) => {
    console.log(req.body , "image", req.files)
    try {
        // manage image upload
        let file = null;
        let files = [];
        let imagesPaths = [];
        let imagePath = '';
        let allAccessories = [];
        const accessories = req.body.accessories.split(',').map((item) => item.trim());
        let basePath;
        if(env === 'production'){
            basePath = `${req.protocol}://${req.get('host')}/garimax-backend/public/uploads/`;
        }else {
            basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        }
        files = req.files
        file = files[0] || null;
        files.map((el) => {
            console.log("Data", el)
            imagesPaths.push(`${basePath}${el.filename}`);
            allAccessories.push(accessories); // Push the value directly

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
            make: req.body.make,
            image: imagePath,
            images: imagesPaths,  
            location: req.body.location,
            description: req.body.description,
            price: req.body.price,
            yearOfManufacture: req.body.yearOfManufacture,
            color: req.body.color,
            bodyType: req.body.bodyType,
            driveTrain: req.body.driveTrain,
            inspectionCert: req.body.inspectionCert,
            usage: req.body.usage,
            transmission: req.body.transmission,
            engineSize: req.body.engineSize,
            enginePower: req.body.enginePower,
            fuelType: req.body.fuelType,
            steering: req.body.steering,
            vinNumber: req.body.vinNumber,
            mileage: req.body.mileage,
            isVerified: req.body.isVerified,
            iaDutyPaid: req.body.iaDutyPaid,
            isSold: req.body.isSold,
            condition: req.body.condition,
            accessories: allAccessories,
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

router.get('/getVehicle/:id', async (req, res) =>{
    const id = req.params.id;
    try{
        const vehicle = await models.vehicle.findByPk(id, {
            include: models.user
        });
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

router.get('/getVendorVehicles/:userId', async (req, res) =>{
    const userId = req.params.userId;
    try{
        // get and check user
        const user = await models.user.findByPk(userId);   
        if(!user){
            return res.status(500).json({success: false, message: 'valid user required'})
        }
        const vehicles = await models.vehicle.findAll({
                            where: { userId }
                        });
        res.status(200).json(vehicles);
    } catch(err){
        res.status(400).json({
            error: err.message,
            success: false 
        });
    }
});

router.put('/user/updateVehicle/:id', uploadOptions.any(), async (req, res) => {
        const id = req.params.id;
        console.log(req.body , "image", req.files)
        try {
            const vehicleExists = await models.vehicle.findByPk(id);
            if(!vehicleExists) {
                return res.status(500).json({
                    error: `Vehicle does not exist`,
                    success: false})
            }
            // manage image upload
            let file = null;
            let files = [];
            let imagesPaths = [];
            let imagePath = '';
            let allAccessories = [];
            const accessories = req.body.accessories.split(',').map((item) => item.trim());
            let basePath;
            if(env === 'production'){
                basePath = `${req.protocol}://${req.get('host')}/garimax-backend/public/uploads/`;
            }else {
                basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
            }
            files = req.files
            file = files[0] || null;
            files.map((el) => {
                console.log("Data", el)
                imagesPaths.push(`${basePath}${el.filename}`);
                allAccessories.push(accessories); // Push the value directly
            });
            if (!file) return res.status(400).send({message:'No image in the request'});
            imagePath = `${basePath}${file.filename}`;
            console.log(req.body)
    
            // get and check user
            const user = await models.user.findByPk(req.body.userId);
            console.log("Got here!!123")   
            if(!user){
                return res.status(500).json({success: false, message: 'valid user required'})
            }
            const vehicle = await models.vehicle.update({
                id: randomUUID(),
                userId: req.body.userId,
                model: req.body.model,
                make: req.body.make,
                // image: imagePath,
                // images: imagesPaths,  
                location: req.body.location,
                description: req.body.description,
                price: req.body.price,
                yearOfManufacture: req.body.yearOfManufacture,
                color: req.body.color,
                bodyType: req.body.bodyType,
                driveTrain: req.body.driveTrain,
                inspectionCert: req.body.inspectionCert,
                usage: req.body.usage,
                transmission: req.body.transmission,
                engineSize: req.body.engineSize,
                enginePower: req.body.enginePower,
                fuelType: req.body.fuelType,
                steering: req.body.steering,
                vinNumber: req.body.vinNumber,
                mileage: req.body.mileage,
                isVerified: req.body.isVerified,
                iaDutyPaid: req.body.iaDutyPaid,
                isSold: req.body.isSold,
                condition: req.body.condition,
                accessories: allAccessories,
                additionalFeatures: req.body.additionalFeatures
            },{
                where: { id: id}
            });
            return res.status(201).json({ vehicle });
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
});

module.exports = router;