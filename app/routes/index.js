const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.post('/users/register', controllers.userController.registerUser);
router.post('/admin/register', controllers.userController.registerAdmin);
router.post('/users/login', controllers.userController.loginUser);
router.get('/users', controllers.userController.getAllUsers);
router.get('/admin/users', controllers.userController.adminGetAllUsers);
router.get('/user/:id', controllers.userController.getSingleUser);
router.post('/singleVendor/register', controllers.vendorController.registerSingleUser); //uploadOptions.single('image'),
router.post('/coVendor/register', controllers.vendorController.registerCoUser);
router.get('/coVendors', controllers.vendorController.getAllCoVendor);
router.get('/singleVendors', controllers.vendorController.getAllSingleUser);
router.get('/singleVendor', controllers.vendorController.getSingleIndividualVendor);
router.get('/coVendor', controllers.vendorController.getSingleCompanyVendor);

// router.post('/addVehicle', uploadOptions.single('image'), controllers.vehicleController.addVehicle);

module.exports = router;