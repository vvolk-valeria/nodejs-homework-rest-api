const express = require('express')

const router = express.Router()

const {authCtrl} = require('../../controllers');
const authorization = require('../../middlewares/auth');


router.post('/signup', authCtrl.signup);

router.post('/login', authCtrl.login);

router.post('/logout', authorization, authCtrl.logout);


module.exports = router;
