const express = require('express')

const router = express.Router()

const {contactsCtrl} = require('../../controllers');


router.get('/', contactsCtrl.getAllContacts);

router.get('/:contactId', contactsCtrl.getOneContactById);

router.post('/', contactsCtrl.addNewContact);

router.delete('/:contactId', contactsCtrl.deleteContact);

router.put('/:contactId', contactsCtrl.changeContactById);

router.patch('/:contactId/favorite', contactsCtrl.updateStatusContact);

module.exports = router;
