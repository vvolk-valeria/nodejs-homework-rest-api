const express = require('express')

const router = express.Router()

const {usersCtrl} = require('../../controllers');
const authorization = require('../../middlewares/auth');


router.post('/signup', usersCtrl.signup);

router.post('/login', usersCtrl.login);

router.post('/logout', authorization, usersCtrl.logout);

router.get('/current', authorization, usersCtrl.getCurrent);

router.patch('/', authorization, usersCtrl.updateUserSubscription);


module.exports = router;
