const {Contact, joiSchemes} = require('../../models/contact');

const updateStatusContact = async (req, res, next) => {
    try {
        const {error} = joiSchemes.joiContactFavoriteSchema.validate(req.body);
 
            if(error) {
                return res.status(400).json({message:"missing field favorite"})
            }

        const {contactId} = req.params;
        const contact = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if (!contact) {
        const error =  new Error(`Contact with id=${id} not found`);
        error.status = 404;
        throw error;
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result: contact
            }
        });
    } catch (error) {
        next(error);
    }
  }

module.exports = updateStatusContact;