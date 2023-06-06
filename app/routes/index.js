const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.post('/users/register', controllers.userController.registerUser);
router.post('/users/login', controllers.userController.loginUser);
router.get('/users', controllers.userController.getAllUsers);
router.post('/singleVendor/register', controllers.vendorController.registerSingleUser);
router.post('/coVendor/register', controllers.vendorController.registerCoUser);
// router.get('/getVehicles', controllers.vehicleControler.getAllVehicles);
// router.post('/addVehicle', uploadOptions.single('image'), controllers.vehicleControler.addVehicle);

module.exports = router;