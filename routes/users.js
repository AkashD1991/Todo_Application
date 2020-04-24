const express = require('express');
const router = require('express-promise-router')();
// const router = express.Router;
const { validateBody, schemas } = require('../helpers/routeHelpers')
const UsersController = require('../controllers/users.js');

router.route('/signup')
    .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/getusers')
    .get(UsersController.getusers);

// router.route('/getuser')
//     .post(UsersController.getuser);

router.route('/verify')
    .post(UsersController.verify);


router.route('/signin')
    .post(UsersController.signIn);

router.route('/updateUser')
    .post(UsersController.updateUser)

router.route('/updateProfile')
    .post(UsersController.updateProfile)


module.exports = router;