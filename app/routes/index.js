const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.post('/users/register', controllers.userController.registerUser);
router.post('/users/login', controllers.userController.loginUser);
router.get('/users', controllers.userController.getAllUsers);
router.get('/user/:id', controllers.userController.getSingleUser);
router.put('/user/updateProfile/:id', controllers.userController.updateUserDetails);
router.post('/singleVendor/register', controllers.vendorController.registerSingleUser); //uploadOptions.single('image'),
router.post('/coVendor/register', controllers.vendorController.registerCoUser);
// router.post('/addVehicle', uploadOptions.single('image'), controllers.vehicleControler.addVehicle);

module.exports = router;