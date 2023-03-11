const express = require('express')

const router = express.Router()

const {usersCtrl} = require('../../controllers');
const authorization = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');


router.get('/current', authorization, usersCtrl.getCurrent);

router.patch('/', authorization, usersCtrl.updateUserSubscription);

router.patch('/avatars', authorization, upload.single('avatar'), usersCtrl.updateAvatar);


module.exports = router;
