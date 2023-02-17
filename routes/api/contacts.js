const express = require('express')

const router = express.Router()

const {contactsCtrl} = require('../../controllers');
const authorization = require('../../middlewares/auth');

router.get('/', authorization, contactsCtrl.getAllContacts);

router.get('/:contactId', authorization, contactsCtrl.getOneContactById);

router.post('/', authorization, contactsCtrl.addNewContact);

router.delete('/:contactId', authorization, contactsCtrl.deleteContact);

router.put('/:contactId', authorization, contactsCtrl.changeContactById);

router.patch('/:contactId/favorite', authorization, contactsCtrl.updateStatusContact);

module.exports = router;
