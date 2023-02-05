const {Contact} = require('../../models/contact');

const deleteContact = async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const contact = await Contact.findByIdAndDelete(contactId);
    if (!contact) {
        const error =  new Error(`Not found`);
        error.status = 404;
        throw error;
    }
    res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
        data: {
            result: contact
            }
        });
    } catch (error) {
        next(error);
    }
  }

module.exports = deleteContact;
