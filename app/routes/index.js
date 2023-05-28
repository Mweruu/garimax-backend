const { Router } = require('express');
const controllers = require('../controllers')

const router = Router();

router.post('/users/register', controllers.registerUser);
router.post('/users/login', controllers.loginUser);
router.get('/users', controllers.getAllUsers);

module.exports = router;