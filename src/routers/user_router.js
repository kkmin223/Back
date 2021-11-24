const express = require('express');
const controller = require('../controllers/user_controller');
const router = express.Router();
const { profile_upload }= require('../models/multer');


router.post('/user',profile_upload.single('profile_image'),controller.signup_user);
//router.post('/user',controller.signup_user);
router.get('/user', controller.get_user);
router.get('/user/login',controller.login);
router.get('/user/profile_image', controller.get_profile_image);
router.post('/user/profile_image', profile_upload.single('profile_image'),controller.set_profile_image);
router.delete('/user', controller.delete_user);
router.patch('/user', controller.modify_user);
router.get('/user/check_id', controller.check_id);


module.exports = router;


